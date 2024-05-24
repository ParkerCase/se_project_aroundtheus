export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const profileConfig = {
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileTitleInput: "#profile-title-input",
  profileDescriptionInput: "#profile-description-input",
  profileEditButton: "#profile-edit-button",
  profileAddNewCardButton: "#profile-add-button",
};

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_submit",
  inactiveButtonClass: "modal__button_submit_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

export const cardsConfig = {
  cardTemplate: "#card-template",
  cardList: ".cards__list",
  cardLikeButton: ".card__like-button",
};

export const popupConfig = {
  previewImagePopup: "#preview-card-image-modal",
  addCardPopup: "#add-card-modal",
  profileEditPopup: "#profile-edit-button-modal",
};

export const defaultFormConfig = {
  editFormElement: "#form-edit-profile",
  addFormElement: "#form-add-card",
};

// Saving as precautionary
// cardTemplate: document.querySelector("#card-template").content.firstElementChild;
