// Imports
import EditableCanvas from '@library/canvas';
import Pdf from '@library/pdf';
import { FilterCollection } from '@library/wfcollection';
import { RenderData, RenderField } from '@library/renderer';
import { CalendarweekComponent, FilterForm, filterFormSelector } from '@library/form';

// Utility functions
import createAttribute from '@library/attributeselector';
import { addDays, startOfWeek, format, getWeek, addWeeks, getYear, WeekOptions, startOfISOWeek, StartOfWeekOptions, parse, addMinutes, getISOWeekYear, getISOWeek } from 'date-fns';
import { de } from 'date-fns/locale';

// Types
type ActionElement = 'download' | 'save';
type FieldIds = 'startDate' | 'endDate' | 'dayRange' | 'design' | 'scale' | 'calendarweek' | 'calendaryear' | ActionElement;

/**
 * Metadata representing a `Pdf` instance.
 */
interface LocalStoragePdfInstance {
  design: string;
}

/**
 * LocalStorage object representing the list of existing pdf metadata.
 */
interface LocalStoragePdf {
  activity?: LocalStoragePdfInstance;
  menuplan?: LocalStoragePdfInstance;
}

const formatDE = (date: Date, formatStr: string) => format(date, formatStr, { locale: de });

// Selector functions
const wfCollectionSelector = createAttribute<string>('wf-collection');
const actionSelector = createAttribute<ActionElement>('data-action');

const weekOptions: WeekOptions = {
  weekStartsOn: 1,
}

const sowOptions: StartOfWeekOptions = {
  ...weekOptions,
  locale: de,
}

function setMinMaxDate(form: FilterForm<FieldIds>, data: RenderData): Date[] {
  const dates = data.map(weekday => weekday.date.getTime());
  let minDate = new Date(Math.min(...dates));
  let maxDate = new Date(Math.max(...dates));
  if (startOfWeek(minDate, sowOptions).getTime() !== minDate.getTime()) {
    minDate = startOfWeek(addDays(minDate, 7), sowOptions);
  }
  const minDateStr = formatDE(minDate, 'yyyy-MM-dd');
  const maxDateStr = formatDE(maxDate, 'yyyy-MM-dd');

  form.getFilterInput('startDate').setAttribute('min', minDateStr)
  form.getFilterInput('startDate').setAttribute('max', maxDateStr)
  form.getFilterInput('endDate').setAttribute('min', minDateStr)
  form.getFilterInput('endDate').setAttribute('max', maxDateStr)

  return [minDate, maxDate];
}

function setDefaultFilters(form: FilterForm<FieldIds>, minDate: Date, maxDate: Date): void {
  let currentMonday: Date = startOfWeek(new Date(), sowOptions);
  let nextMonday: Date = addWeeks(currentMonday, 1);
  if (nextMonday >= maxDate) {
    nextMonday = currentMonday;
  }

  form.getFilterInput('calendaryear').value = getYear(nextMonday).toString();
  form.getFilterInput('calendarweek').value = getWeek(nextMonday, weekOptions).toString();
  form.getFilterInput('startDate').value = formatDE(nextMonday, 'yyyy-MM-dd');
  form.getFilterInput('endDate').value = formatDE(addDays(nextMonday, 6), 'yyyy-MM-dd');
  form.getFilterInput('dayRange').value = form.setDayRange(7).toString();

  const pdfStorage = parsePdfLocalStorage();
  const design = pdfStorage.menuplan.design;
  if (design) {
    form.getFilterInput('design').value = design;
  }
}

/**
 * Tag the weekly hit elements in the cms list with 
 * a different attribute value, so that the render engine 
 * can effectively differentiate them as two different 
 * render elements.
 */
function tagWeeklyHit(list: HTMLElement): void {
  const weeklyHitElements: NodeListOf<HTMLElement> = list.querySelectorAll(`.w-dyn-item:has([weekly-hit-boolean]:not(.w-condition-invisible[weekly-hit-boolean]))`);
  weeklyHitElements.forEach(hit => {
    hit.setAttribute('data-pdf-element', 'weekly-hit');
  });
}

function parsePdfLocalStorage(): LocalStoragePdf {
  const parsed: LocalStoragePdf = JSON.parse(localStorage.getItem('pdf') || '{}');

  const pdfStorage: LocalStoragePdf = {
    menuplan: {
      design: parsed.menuplan?.design || '',
    },
    activity: {
      design: parsed.activity?.design || '',
    }
  };

  return pdfStorage;
}

function initialize(): void {
  const filterCollectionListElement = document.querySelector<HTMLElement>(wfCollectionSelector('daily'));
  const pdfContainer = document.querySelector<HTMLElement>(Pdf.select('container'));
  const filterFormElement = document.querySelector<HTMLElement>(filterFormSelector('component'));
  const calendarweekElement = document.querySelector<HTMLElement>(CalendarweekComponent.select('component'));

  // Before initialization
  tagWeeklyHit(filterCollectionListElement);
  
  /**
   * The `localStorage` object for `Pdf`.
   */
  const pdfStorage = parsePdfLocalStorage();

  // Initialize collection list and pdf
  const filterCollection = new FilterCollection(filterCollectionListElement, 'pdf');
  const pdf = new Pdf(pdfContainer);
  const filterForm = new FilterForm<FieldIds>(filterFormElement);
  const canvas = new EditableCanvas(pdfContainer, '.pdf-h3');

  //filterCollection.debug = true;
  filterCollection.renderer.addFilterAttributes({ 'weekly-hit-boolean': 'boolean' });
  filterCollection.readData();
  const [minDate, maxDate] = setMinMaxDate(filterForm, filterCollection.getData());
  setDefaultFilters(filterForm, minDate, maxDate);

  const cweek = new CalendarweekComponent(calendarweekElement);
  cweek.setMinMaxDates(minDate, maxDate);
  cweek.addOnChange((week, year, date) => {
    filterForm.getFilterInput('startDate').value = format(date, 'yyyy-MM-dd');
    filterForm.invokeOnChange(['startDate']);
  });

  filterForm.addBeforeChange((filters) => {
    const dayRange = parseFloat(filters.getField('dayRange').value);
    filterForm.setDayRange(dayRange);
    filterForm.validateDateRange('startDate', 'endDate');
  });

  filterForm.addOnChange(['design'], (filters) => {
    const designs = pdf.getDesigns();
    const selectedDesign = filters.getField('design').value;
    pdfStorage.menuplan.design = selectedDesign;
    localStorage.setItem('pdf', JSON.stringify(pdfStorage));
    designs.forEach((page) => {
      const design = page.getAttribute('data-pdf-design');
      if (design === selectedDesign) {
        page.classList.remove('hide');
      } else {
        page.classList.add('hide');
      }
    });
  });

  filterForm.addOnChange(['save'], () => {
    filterForm.invokeOnChange(['startDate']);
  });

  filterForm.addOnChange(['startDate', 'endDate', 'dayRange'], (filters, invokedBy) => {
    // Get FilterForm values
    const startDate = parse(filters.getField('startDate').value, 'yyyy-MM-dd', new Date());
    const endDate = parse(filters.getField('endDate').value, 'yyyy-MM-dd', new Date());

    // Use FilterForm values
    cweek.setDate(invokedBy === 'endDate' ? endDate : startDate, true);

    // Static render fields
    const staticRenderFields: RenderField[] = [
      {
        element: 'title',
        value: `${formatDE(startDate, 'd')}. – ${formatDE(endDate, 'd')}. ${formatDE(startDate, 'MMMM yyyy')}`,
        visibility: true,
      },
    ];

    pdf.render([
      ...staticRenderFields,
      ...filterCollection.filterByDate(startDate, endDate),
    ]);
  });

  filterForm.addOnChange(['scale'], (filters) => {
    const scale = parseFloat(filters.getField('scale').value);
    pdf.scale(scale);
  });

  filterForm.addResizeReset('scale', () => {
    const defaultScale = pdf.getDefaultScale();
    pdf.scale(defaultScale);
    return defaultScale;
  });

  filterForm.applyResizeResets();
  filterForm.invokeOnChange('*'); // Initialize the filter with it's default values

  const downloadBtn = document.querySelector(actionSelector('download'));
  downloadBtn.addEventListener('click', () => {
    const startDate = new Date(filterForm.data.getField('startDate').value);
    //const endDate = new Date(filterForm.data.getField('endDate').value);
    //let filename = `Menuplan vom ${formatDE(startDate, 'd.M.yyyy')}-${formatDE(endDate, 'd.M.yyyy')}`;
    let filename = `Menuplan ${getISOWeekYear(startDate)} KW${getISOWeek(startDate)}`;

    pdf.save(filename, 4.17);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    initialize();
  } catch (e) {
    console.error(e);
  }
});
