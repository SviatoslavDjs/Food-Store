import { closeModel, openModal } from "./modal";
import { postData } from "./services/services";
function forms(modalSelector, modalTimerId) {
  const forms = document.querySelectorAll(modalSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Дякую, скоро ми зв'яжемось з вами!",
    failure: "Щось пішло не так...",
  };
  forms.forEach((item) => {
    bindpostData(item);
  });

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto; height: 40px; z-index: 100`;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
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
    openModal(".modal", modalTimerId);
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
      closeModel(".modal");
    }, 4000);
  }
}
export default forms;
