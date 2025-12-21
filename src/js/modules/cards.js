import { getResource } from "./services/services";
function cards() {
  class MenuCard {
    constructor(
      image,
      alt,
      subtitle,
      description,
      total,
      parentSelector,
      ...classes
    ) {
      this.image = image;
      this.subtitle = subtitle;
      this.description = description;
      this.alt = alt;
      this.total = total;
      this.transfer = 41;
      this.classes = classes;
      this.parentSelector =
        document.querySelector(parentSelector).firstElementChild;
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
        this.classes.forEach((className) => element.classList.add(className));
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

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu__field",
        "menu__item"
      ).addContentCard();
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
export default cards;
