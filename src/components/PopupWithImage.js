import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".modal__card_title").textContent = name;
    const image = this._popupElement.querySelector(".modal__image");
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
