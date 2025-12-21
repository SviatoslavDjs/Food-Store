import { getResource } from "./services/services";
function slider({
  container,
  slid,
  nextArroww,
  prevArroww,
  totalCounter,
  currentCounter,
  wrapper,
  field,
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

  getResource("http://localhost:3000/slides").then((data) => {
    data.forEach(({ img, alt }) => {
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
    slide.forEach((slide) => {
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
      dots.forEach((dot) => (dot.style.opacity = "0.5"));
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
      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideTo = e.target.getAttribute("data-slide-to");
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        slideField.style.transform = `translateX(-${offset}px)`;

        if (slide.length < 10) {
          currentSlide.textContent = `0${slideIndex}`;
        } else {
          currentSlide.textContent = slideIndex;
        }
        dots.forEach((dot) => (dot.style.opacity = "0.5"));
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
export default slider;
