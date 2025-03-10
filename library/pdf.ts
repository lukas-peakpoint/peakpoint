import Renderer, { RenderData } from "@library/renderer";
import html2canvas from 'html2canvas';
import jsPDF, { Html2CanvasOptions } from 'jspdf';
import createAttribute from "@library/attributeselector";

// Types
export type PdfElement = 'container' | 'scale' | 'page' | 'page-wrapper' | 'weekday' | 'dish';
export type PdfFieldName = string | 'dishName' | 'dishDescription' | 'price' | 'priceSmall';

// Variables

export default class Pdf {
  public canvas: HTMLElement;
  public renderer: Renderer;
  public defaultScale: number;
  public customScale: number;
  private freezeSelector: string;
  private scaleElement: HTMLElement;
  private pages: HTMLElement[];

  constructor(container: HTMLElement | null) {
    if (!container) throw new Error('PDF Element not found.');
    this.canvas = container;
    this.renderer = new Renderer(container, 'pdf');
    this.getPages();
    this.getScaleElement();
  }

  /**
   * Use this method to select the elements for a new `Pdf` instance.
   * @returns CSS selector string
   */
  static select = createAttribute<PdfElement>('data-pdf-element');

  private getScaleElement(): HTMLElement {
    const scale = this.canvas.querySelector<HTMLElement>(Pdf.select('scale'));
    if (!scale) {
      console.warn(`Scale element ${Pdf.select('scale')} is undefined.`)
      return;
    }
    this.scaleElement = scale;

    return this.scaleElement;
  }

  public getDefaultScale(): number {
    this.scaleElement.style.removeProperty('font-size');
    const elements: any = {
      "container": this.canvas,
      "scale": this.scaleElement,
    }
    let scaleValues: any = {};

    for (let key in elements) {
      const scaleStyles = getComputedStyle(elements[key]);
      const scaleValue = parseFloat(scaleStyles.getPropertyValue('font-size'));
      scaleValues[key] = scaleValue;
    }

    this.defaultScale = scaleValues.scale / scaleValues.container;
    return this.defaultScale;
  }

  public getPages(): HTMLElement[] {
    const pages = this.canvas.querySelectorAll<HTMLElement>(Pdf.select('page'));
    this.pages = Array.from(pages);
    return this.pages;
  }

  public getPageWrappers(): HTMLElement[] {
    const pageWrappers = this.canvas.querySelectorAll<HTMLElement>(Pdf.select('page-wrapper'));
    return Array.from(pageWrappers);
  }

  /**
   * Render any data of type `RenderData` on the pdf canvas.
   *
   * @param data Data of type `RenderData`. This data will be given to the Renderer instance to render it.
   */
  public render(data: RenderData): void {
    this.renderer.render(data);
  }

  /**
   * Scales the PDF to the given value.
   *
   * @param scale Scale value in `em`, e.g. `0.3` will scale the canvas to `0.3em`.
   */
  public scale(scale: number, store: boolean = true): void {
    if (store) this.customScale = scale;
    this.scaleElement.style.fontSize = `${scale}em`;
  }

  public resetScale(): void {
    this.scale(this.customScale);
  }

  public resetDefaultScale(): void {
    const defaultScale = this.getDefaultScale();
    return this.scale(defaultScale);
  }

  public freeze(): void {
    this.pages.forEach(page => {
      this.freezeSelector = '*:not([pdf-freeze="exclude"], [pdf-freeze="exclude"] *, svg, svg *)';
      const children: NodeListOf<HTMLElement> = page.querySelectorAll(this.freezeSelector);
      children.forEach(child => {
        this.freezeElement(child);
      });
    });
  }

  private freezeElement(element: HTMLElement): void {
    if (element.tagName === 'svg') return;

    const elementRect = element.getBoundingClientRect();

    element.style.width = `${elementRect.width}px`;
    element.style.height = `${elementRect.height}px`;
  }

  public unFreeze(): void {
    this.pages.forEach(page => {
      const children: NodeListOf<HTMLElement> = page.querySelectorAll(this.freezeSelector);
      children.forEach(child => {
        this.unFreezeElement(child);
      });
    });
  }

  private unFreezeElement(element: HTMLElement): void {
    // Reset the inline styles to allow for dynamic layout adjustments
    element.style.removeProperty('width');
    element.style.removeProperty('height');
    element.style.removeProperty('position');
    element.style.removeProperty('left');
    element.style.removeProperty('top');
    element.style.removeProperty('margin');
  }

  public async create(filename?: string | undefined): Promise<void> {
    this.freeze();
    if (!filename || typeof filename !== 'string') {
      filename = `Menuplan generiert am ${new Date().toLocaleDateString('de-DE')}`;
    }
    filename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    try {
      // Generate the PDF
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // Calculate dimensions to fit the A4 page
      const zoom = 0.1; // crop 0.1mm on each side
      const canvasScale = 2;

      const getHtml2CanvasOptions = (canvas?: HTMLCanvasElement): Html2CanvasOptions => {
        return {
          scale: canvasScale,
          useCORS: true,
          canvas: canvas
        }
      }

      let firstPage = true;

      for (let i = 0; i < this.pages.length; i++) {
        const page = this.pages[i];

        if (
          window.getComputedStyle(page).getPropertyValue('display') === "none" ||
          window.getComputedStyle(page).getPropertyValue('visibility') === 'hidden' ||
          page.classList.contains("hide") ||
          page.offsetWidth === 0 ||
          page.offsetHeight === 0
        ) {
          console.warn(`Hidden page detected, skipping current page. \nPage:`, page);
          continue;
        }

        const customCanvas = document.createElement("canvas");
        customCanvas.width = page.offsetWidth * canvasScale;
        customCanvas.height = page.offsetHeight * canvasScale;

        const ctx = customCanvas.getContext("2d");
        const originalDrawImage = ctx.drawImage;

        // @ts-ignore
        ctx.drawImage = function (image: CanvasImageSource, sx: number, sy: number, sw: number, sh, dx, dy, dw, dh): void {
          if (image instanceof HTMLImageElement) {
            if (sw / dw < sh / dh) {
              const _dh = dh
              dh = sh * (dw / sw)
              dy = dy + (_dh - dh) / 2
            } else {
              const _dw = dw
              dw = sw * (dh / sh)
              dx = dx + (_dw - dw) / 2
            }
          }

          return originalDrawImage.call(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh)
        };

        // Convert HTML element to canvas
        const canvas = await html2canvas(page, getHtml2CanvasOptions(customCanvas));
        const imgData = canvas.toDataURL('image/jpeg');

        const adjustedWidth = pdfWidth + 2 * zoom;
        const adjustedHeight = (canvas.height * adjustedWidth) / canvas.width;

        if (!firstPage) {
          pdf.addPage();
        }

        firstPage = false;

        pdf.addImage(imgData, 'PNG', -zoom, -zoom, adjustedWidth, adjustedHeight, undefined, 'SLOW');
      }

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error creating PDF:', error);
    } finally {
      this.unFreeze();
    }
  }

  public initDownload(button: HTMLElement | null): void {
    if (!button) throw new Error('Download button does not exist');
    button.addEventListener('click', async () => {
      // Scale the pdf from 72 to 300 DPI
      this.scale(4.17, false);
      setTimeout(async () => {
        await this.create();
        this.resetScale();
      }, 0);
    });
  }
}
