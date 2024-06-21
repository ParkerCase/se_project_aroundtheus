import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewTitle = this._popupElement.querySelector(".modal__card_title");
  }

  // Figure this out
  open(cardData) {
    this._previewImage.src = cardData.link;
    this._previewImage.alt = cardData.name;
    this._previewTitle.textContent = cardData.name;

    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
