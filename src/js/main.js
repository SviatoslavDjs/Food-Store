import tabs from "./modules/tabs.js";
import timer from "./modules/timer.js";
import cards from "./modules/cards.js";
import slider from "./modules/slider.js";
import modal, { openModal } from "./modules/modal.js";
import forms from "./modules/forms.js";
import calculator from "./modules/calculator.js";

(function () {
  window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(
      openModal(() => openModal(".modal", modalTimerId)),
      50000
    );
    tabs(
      ".tabheader__item",
      ".tabcontent",
      ".tabheader__items",
      "tabheader__item_active"
    );
    timer(".timer", "2026-01-20");
    cards();
    slider({
      container: ".offer__slider",
      nextArroww: "[data-next]",
      prevArroww: "[data-prev]",
      slide: "[data-slide]",
      totalCounter: "[data-total]",
      wrapper: "[data-slides]",
      field: "[data-inner]",
      currentCounter: "[data-current]",
    });
    modal("[data-modal]", ".modal");
    forms("form", modalTimerId);
    calculator();
  });
})();
