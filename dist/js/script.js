/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js"
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    sex = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }
  function initLocalSetting(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.getAttribute("id") === localStorage.getItem("sex")) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        element.classList.add(activeClass);
      }
    });
  }
  initLocalSetting("#gender div", "calculating__choose-item_active");
  initLocalSetting(".calculating__choose_big div", "calculating__choose-item_active");
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round((10 * weight + 6.25 * height - 5 * age - 161) * ratio);
    } else {
      result.textContent = Math.round((10 * weight + 6.25 * height - 5 * age + 5) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener("click", e => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ },

/***/ "./src/js/modules/cards.js"
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./src/js/modules/services/services.js");

function cards() {
  class MenuCard {
    constructor(image, alt, subtitle, description, total, parentSelector, ...classes) {
      this.image = image;
      this.subtitle = subtitle;
      this.description = description;
      this.alt = alt;
      this.total = total;
      this.transfer = 41;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector).firstElementChild;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.total * this.transfer;
    }
    addContentCard() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
 <img src="${this.image}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Ціна:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>

`;
      this.parentSelector.append(element);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu__field", "menu__item").addContentCard();
    });
  });
  // axios.get("http://localhost:3000/menu").then(data => {
  //    data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu__field",
  //       "menu__item"
  //     ).addContentCard();
  //   });
  // })
  //     getResource("http://localhost:3000/menu").then((data) => createCard(data));
  //     function createCard(data) {
  //       data.forEach(({ img, altimg, title, descr, price }) => {
  //         let element = document.createElement("div");
  //         element.classList.add("menu__item");
  //         element.innerHTML = `
  //  <img src="${img}" alt="${altimg}">
  //                     <h3 class="menu__item-subtitle">${title}</h3>
  //                     <div class="menu__item-descr">${descr}</div>
  //                     <div class="menu__item-divider"></div>
  //                     <div class="menu__item-price">
  //                         <div class="menu__item-cost">Ціна:</div>
  //                         <div class="menu__item-total"><span>${
  //                           price * 41
  //                         }</span> грн/день</div>
  //                     </div>

  // `;
  //         document.querySelector(".menu .container").append(element);
  //       });
  //     }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ },

/***/ "./src/js/modules/forms.js"
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./src/js/modules/services/services.js");


function forms(modalSelector, modalTimerId) {
  const forms = document.querySelectorAll(modalSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Дякую, скоро ми зв'яжемось з вами!",
    failure: "Щось пішло не так..."
  };
  forms.forEach(item => {
    bindpostData(item);
  });
  function bindpostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto; height: 40px; z-index: 100`;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
  <div class = "modal__content">
  <div class="modal__close" data-close>&times;</div>
  <div class="modal__title">${message}</div>
  </div>
  `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModel)(".modal");
    }, 4000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./src/js/modules/modal.js"
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModel: () => (/* binding */ closeModel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelectorAll(modalSelector);
  modal.classList.add("show");
  modal.classList.add("fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModel(modalSelector) {
  const modal = document.querySelectorAll(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const btn = document.querySelectorAll(triggerSelector);
  btn.forEach(button => {
    button.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.getAttribute("data-close") == "") {
      closeModel(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModel(modalSelector);
    }
  });
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ },

/***/ "./src/js/modules/services/services.js"
/*!*********************************************!*\
  !*** ./src/js/modules/services/services.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
};
const getResource = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};



/***/ },

/***/ "./src/js/modules/slider.js"
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./src/js/modules/services/services.js");

function slider({
  container,
  slid,
  nextArroww,
  prevArroww,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  class Slides {
    constructor(src, alt, parent) {
      this.src = src;
      this.alt = alt;
      this.parent = document.querySelector(parent);
    }
    addSlides() {
      const element = document.createElement("div");
      element.classList.add("offer__slide");
      element.setAttribute("data-slide", "");
      element.innerHTML = `
 <img src="${this.src}" alt="${this.alt}">
`;
      this.parent.append(element);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/slides").then(data => {
    data.forEach(({
      img,
      alt
    }) => {
      new Slides(img, alt, ".offer__slider-inner").addSlides();
    });
    const prevArrow = document.querySelector(prevArroww);
    const nextArrow = document.querySelector(nextArroww);
    const currentSlide = document.querySelector(currentCounter);
    const slide = document.querySelectorAll(slid);
    const total = document.querySelector(totalCounter);
    const slideWrapper = document.querySelector(wrapper);
    const slideField = document.querySelector(field);
    const width = window.getComputedStyle(slideWrapper).width;
    const slider = document.querySelector(container);
    slider.style.position = "relative";
    const indicator = document.createElement("ol");
    const dots = [];
    indicator.classList.add("caraousel-indicators");
    indicator.style.cssText = `  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;`;
    slider.append(indicator);
    for (let i = 0; i < slide.length; i++) {
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.style.cssText = `
     box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;`;
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicator.append(dot);
      dots.push(dot);
    }
    let slideIndex = 1;
    let offset = 0;
    if (slide.length < 10) {
      total.textContent = `0${slide.length}`;
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slide.length;
      currentSlide.textContent = `${slideIndex}`;
    }
    slideField.style.width = 100 * slide.length + "%";
    slideField.style.display = "flex";
    slideField.style.transition = "0.5s all";
    slideWrapper.style.overflow = "hidden";
    slide.forEach(slide => {
      slide.style.width = width;
    });
    function deleteNotDigits(str) {
      return +str.replace(/\D/g, "");
    }
    nextArrow.addEventListener("click", () => {
      if (offset == deleteNotDigits(width) * (slide.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      slideField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex == slide.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      if (slide.length < 10) {
        currentSlide.textContent = `0${slideIndex}`;
      } else {
        currentSlide.textContent = slideIndex;
      }
      dots.forEach(dot => dot.style.opacity = "0.5");
      dots[slideIndex - 1].style.opacity = 1;
    });
    prevArrow.addEventListener("click", () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slide.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }
      slideField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex == 1) {
        slideIndex = slide.length;
      } else {
        slideIndex--;
      }
      if (slide.length < 10) {
        currentSlide.textContent = `0${slideIndex}`;
      } else {
        currentSlide.textContent = slideIndex;
      }
      dots.forEach(dot => dot.style.opacity = "0.5");
      dots[slideIndex - 1].style.opacity = 1;
    });
    dots.forEach(dot => {
      dot.addEventListener("click", e => {
        const slideTo = e.target.getAttribute("data-slide-to");
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        slideField.style.transform = `translateX(-${offset}px)`;
        if (slide.length < 10) {
          currentSlide.textContent = `0${slideIndex}`;
        } else {
          currentSlide.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex - 1].style.opacity = 1;
      });
    });

    //   showSlides(slideIndex);
    //   if (slide.length < 10) {
    //     total.textContent = `0${slide.length}`;
    //   } else {
    //     total.textContent = slide.length;
    //   }

    //   function showSlides(n) {
    //     if (n > slide.length) {
    //       slideIndex = 1;
    //     }
    //     if (n < 1) {
    //       slideIndex = slide.length;
    //     }
    //     slide.forEach((item) => {
    //       item.classList.add("hide");
    //       item.classList.remove("show");
    //     });

    //     slide[slideIndex - 1].classList.add("show");
    //     slide[slideIndex - 1].classList.remove("hide");

    //     if (slide.length < 10) {
    //       currentSlide.textContent = `0${slideIndex}`;
    //     } else {
    //       currentSlide.textContent = slideIndex;
    //     }
    //   }
    //   function plusSlides(n) {
    //     showSlides((slideIndex += n));
    //   }
    //   prevArrow.addEventListener("click", () => {
    //     plusSlides(-1);
    //   });
    //   nextArrow.addEventListener("click", () => {
    //     plusSlides(1);
    //   });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./src/js/modules/tabs.js"
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSel, tabsParentSel, tabsActive) {
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSel),
    tabsParent = document.querySelector(tabsParentSel);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = "none";
      item.classList.remove("fade");
    });
    tabs.forEach(tab => {
      tab.classList.remove(tabsActive);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabsContent[i].classList.add("fade");
    tabs[i].classList.add(tabsActive);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", event => {
    const target = event.target;
    if (target && target.classList.contains(tabsActive.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./src/js/modules/timer.js"
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadLine) {
  function getTameRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      second: seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTameRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.second);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(timerSelector, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards.js */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider.js */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms.js */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator.js */ "./src/js/modules/calculator.js");







(function () {
  window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout((0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(() => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(".modal", modalTimerId)), 50000);
    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(".timer", "2026-01-20");
    (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      container: ".offer__slider",
      nextArroww: "[data-next]",
      prevArroww: "[data-prev]",
      slide: "[data-slide]",
      totalCounter: "[data-total]",
      wrapper: "[data-slides]",
      field: "[data-inner]",
      currentCounter: "[data-current]"
    });
    (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_4__["default"])("[data-modal]", ".modal");
    (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
    (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=script.js.map