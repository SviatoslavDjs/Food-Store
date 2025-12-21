/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/******/(() => {
  // webpackBootstrap
  /*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
  window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      tabsParent = document.querySelector(".tabheader__items");
    function hideTabContent() {
      tabsContent.forEach(item => {
        item.style.display = "none";
        item.classList.remove("fade");
      });
      tabs.forEach(tab => {
        tab.classList.remove("tabheader__item_active");
      });
    }
    function showTabContent(i = 0) {
      tabsContent[i].style.display = "block";
      tabsContent[i].classList.add("fade");
      tabs[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener("click", event => {
      const target = event.target;
      if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
    // timer
    const deadLine = "2025-12-20";
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
    setClock(".timer", deadLine);

    //modal
    const modal = document.querySelector(".modal");
    const btn = document.querySelectorAll("[data-modal]");
    btn.forEach(button => {
      button.addEventListener("click", openModal);
    });
    function openModal() {
      modal.classList.add("show");
      modal.classList.add("fade");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      clearInterval(modalTimerId);
    }
    function closeModel() {
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
    modal.addEventListener("click", event => {
      if (event.target === modal || event.target.getAttribute("data-close") == "") {
        closeModel();
      }
    });
    document.addEventListener("keydown", e => {
      if (e.code === "Escape" && modal.classList.contains("show")) {
        closeModel();
      }
    });
    const modalTimerId = setTimeout(openModal, 50000);
    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
    window.addEventListener("scroll", showModalByScroll);
    //template card
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
    const getResource = async url => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
    };
    getResource("http://localhost:3000/menu").then(data => {
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

    //forms
    const forms = document.querySelectorAll("form");
    const message = {
      loading: "img/form/spinner.svg",
      success: "Дякую, скоро ми зв'яжемось з вами!",
      failure: "Щось пішло не так..."
    };
    forms.forEach(item => {
      bindpostData(item);
    });
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
    function bindpostData(form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const statusMessage = document.createElement("img");
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `display: block; margin: 0 auto; height: 40px; z-index: 100`;
        form.insertAdjacentElement("afterend", statusMessage);
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        postData("http://localhost:3000/requests", json).then(data => {
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
      openModal();
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
        closeModel();
      }, 4000);
    }
  });

  //slider
  class Slides {
    constructor(src, alt, parent) {
      this.src = src;
      this.alt = alt;
      this.parent = document.querySelector(parent);
    }
    addSlides() {
      const element = document.createElement("div");
      element.classList.add("offer__slide");
      element.tagName.add("data-slide");
      element.innerHTML = `
 <img src="${this.src}" alt="${this.alt}"></div>
`;
      this.parent.append(element);
    }
  }
  getResource("http://localhost:3000/slides").then(data => {
    data.forEach(({
      img,
      alt
    }) => {
      new Slides(img, alt, "offer__slider-wrapper").addSlides();
    });
  });
  /******/
})();
/******/ })()
;
//# sourceMappingURL=script.js.map