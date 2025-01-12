import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { toCamelCase } from "@library/parameterize";
import { AutoplayOptions, NavigationOptions, SwiperOptions } from "swiper/types";

type CamelToDash<T extends string> = T extends `${infer Head}${infer Tail}`
  ? Head extends Lowercase<Head> // First character is lowercase
  ? `${Head}${CamelToDash<Tail>}` // If it is lowercase, continue as normal
  : `-${Lowercase<Head>}${CamelToDash<Tail>}` // If it's uppercase, add a dash and make it lowercase
  : T;

interface SwiperAttribute {
  name: "swiper-component"
  | "data-swiper-nav"
  | "data-swiper-mode"
  | `data-swiper-${CamelToDash<keyof SwiperOptions>}`
  | `data-swiper-nav-${CamelToDash<keyof NavigationOptions>}`
  | `data-swiper-autoplay-${CamelToDash<keyof AutoplayOptions>}`;
  type: "string" | "boolean" | "float" | "floatOrAuto";
  default?: string | boolean | number;
};

interface CustomSwiperOptions {
  "swiperComponent": string,
  "mode": string,
  "nav": string,
  "autoHeight": boolean,
  "slidesPerView": "auto" | number,
  "space": number,
  "centeredSlides": boolean,
  "loop": boolean,
  "touchMove": boolean,
  "autoplay": boolean,
  "autoplayDelay": number,
  "speed": number,
}

function swiperEmpty(swiperElement: HTMLElement) {
  const slides = swiperElement.querySelectorAll<HTMLElement>(".swiper-slide");
  if (slides.length === 0) {
    console.warn(`Swiper "${swiperElement.getAttribute("swiper-component")}": Skip empty component.`);
    return true;
  }
  return false
}

function hideEmptySwiper(swiperElement: HTMLElement) {
  const swiperId = swiperElement.getAttribute("swiper-component");
  const swiperMode = swiperElement.dataset.swiperMode;
  const navigationPrefix = setNavigationPrefix(swiperId, swiperMode);

  const dataNav = (swiperElement.dataset.swiperNav || ".swiper-button").toString();
  const prevEl = `${navigationPrefix}${dataNav}:not(.next)`;
  const nextEl = `${navigationPrefix}${dataNav}.next`;
}

function setNavigationPrefix(swiperId: string, swiperMode: string) {
  let navigationPrefix = "";
  if (swiperMode && swiperMode === "cms") {
    navigationPrefix = `[swiper-navigation-for="${swiperId}"] ` // This space is mandatory
  }
  return navigationPrefix;
}

function parseSlidesPerView(value: string) {
  return value === "auto" ? "auto" : parseFloat(value) || "auto";
}

function setupAutoplay(enabled: boolean, delay = 4000) {
  if (!enabled) {
    return false;
  }

  return {
    delay: delay,
    pauseOnMouseEnter: true,
    disableOnInteraction: true,
  }
}

function getKeyFromAttributeName(name: string): string {
  if (name.startsWith('data-swiper-')) {
    return toCamelCase(name.replace('data-swiper-', ''));
  } else if (name.startsWith('data-')) {
    return toCamelCase(name.replace('data-', ''));
  } else {
    return toCamelCase(name);
  }
}

function parseSwiperOptions(container: HTMLElement, attributes: SwiperAttribute[]): CustomSwiperOptions {
  const settings: Partial<CustomSwiperOptions> = {};
  attributes.forEach((attribute, index) => {
    const key = getKeyFromAttributeName(attribute.name);
    const value = container.getAttribute(attribute.name);

    switch (attribute.type) {
      case "string":
        settings[key] = value || attribute.default || "";
        break;
      case "boolean":
        if (value !== "false" && value !== "true" && attribute.default === undefined) {
          throw new Error(`Attribute "${attribute.name}" is not a boolean.`);
        }
        settings[key] = JSON.parse(value || attribute.default.toString()) ?? undefined;
        break;
      case "float":
        settings[key] = parseFloat(value || attribute.default.toString());
        break;
      case "floatOrAuto":
        settings[key] = value === "auto" ? "auto" : parseFloat(value) || "auto";
        break;
      default:
        settings[key] = value || attribute.default || "";
        break;
    }

  })
  return settings as CustomSwiperOptions;
}

function initWebflowSwipers() {
  // Remove all empty slides
  document.querySelectorAll(".w-slide:empty").forEach((e) => e.remove());

  const webflowSwipers = document.querySelectorAll(
    '[swiper-component]:not([swiper-component="default"])'
  );

  webflowSwipers.forEach((swiperElement: HTMLElement) => {
    if (swiperEmpty(swiperElement)) {
      hideEmptySwiper(swiperElement);
      return;
    }
    swiperElement.classList.remove("initial-hide");

    const swiperAttributes: SwiperAttribute[] = [
      { name: "swiper-component", type: "string" },
      { name: "data-swiper-mode", type: "string" },
      { name: "data-swiper-nav", type: "string", default: ".swiper-button" },
      { name: "data-swiper-auto-height", type: "boolean", default: false },
      { name: "data-swiper-slides-per-view", type: "floatOrAuto", },
      { name: "data-swiper-space-between", type: "float", default: 8 },
      { name: "data-swiper-centered-slides", type: "boolean", default: false },
      { name: "data-swiper-loop", type: "boolean", default: true },
      { name: "data-swiper-allow-touch-move", type: "boolean", default: true },
      { name: "data-swiper-autoplay", type: "boolean", default: true },
      { name: "data-swiper-autoplay-delay", type: "float", default: 4000 },
      { name: "data-swiper-speed", type: "float", default: 400 },
    ]

    const settings = parseSwiperOptions(swiperElement, swiperAttributes);

    const navigationPrefix = setNavigationPrefix(settings.swiperComponent, settings.mode);
    const prevEl = `${navigationPrefix}${settings.nav}:not(.next)`;
    const nextEl = `${navigationPrefix}${settings.nav}.next`;
    const autoplayOptions = setupAutoplay(settings.autoplay, settings.autoplayDelay);

    const swiper = new Swiper(swiperElement, {
      navigation: {
        prevEl: prevEl,
        nextEl: nextEl,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: autoplayOptions,
      allowTouchMove: settings.touchMove,
      centeredSlides: settings.centeredSlides,
      effect: "slide",
      speed: settings.speed,
      autoHeight: settings.autoHeight,
      spaceBetween: settings.space,
      loop: settings.loop,
      slidesPerView: settings.slidesPerView,
      modules: [Autoplay, Navigation, Pagination]
    });

    swiper.autoplay.stop();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      })
    }, {
      threshold: 0.2
    });

    observer.observe(swiperElement);
  });
}

function initDefaultSwipers() {
  const defaultSwipers = document.querySelectorAll<HTMLElement>(`[default-swiper-component]`);

  defaultSwipers.forEach((swiperElement) => {
    if (swiperEmpty(swiperElement)) return;
    swiperElement.classList.remove("initial-hide");

    const swiperId = swiperElement.getAttribute("default-swiper-component");
    const swiperMode = swiperElement.dataset.swiperMode;
    const navigationPrefix = setNavigationPrefix(swiperId, swiperMode);

    const swiper = new Swiper(swiperElement, {
      navigation: {
        prevEl: `${navigationPrefix}.swiper-button-static:not(.next)`,
        nextEl: `${navigationPrefix}.swiper-button-static.next`,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      allowTouchMove: true,
      spaceBetween: 24,
      speed: 400,
      loop: true,
      slidesPerView: "auto",
      modules: [Autoplay, Navigation, Pagination]
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWebflowSwipers();
  initDefaultSwipers();
});
