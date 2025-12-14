/******/ (() => { // webpackBootstrap
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
  new MenuCard("img/tabs/vegy.jpg", "Vegy", 'Меню "Фітнес"', "Меню «Фітнес» — це новий підхід до приготування страв: більше свіжих овочів і фруктів. Продукт для активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!", 9, ".menu__field", "menu__item").addContentCard();
  new MenuCard("img/tabs/elite.jpg", "elite", "Меню “Преміум”", "У меню «Преміум» ми використовуємо не лише гарний дизайн упаковки, а й високу якість приготування страв. Червона риба, морепродукти, фрукти — ресторанне меню без походу до ресторану за хорошою ціною.", 11, ".menu__field", "menu__item").addContentCard();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Пісне"', "Меню «Пісне» — це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокоса або гречки, правильна кількість білків за рахунок тофу та імпортних вегетаріанських стейків.", 8, ".menu__field", "menu__item").addContentCard();
  //forms
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Дякую, скоро ми зв'яжемось з вами!",
    failure: "Щось пішло не так..."
  };
  forms.forEach(item => {
    postData(item);
  });
  function postData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto; height: 40px; z-index: 100`;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(object)
      }).then(data => data.text()).then(data => {
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
/******/ })()
;
//# sourceMappingURL=script.js.map