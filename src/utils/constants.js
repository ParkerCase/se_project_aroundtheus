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

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_submit",
  inactiveButtonClass: "modal__button_submit_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

export const editFormElement = document.querySelector("#form-edit-profile");
export const addFormElement = document.querySelector("#form-add-card");
export const avatarFormElement = document.querySelector("#form-avatar");

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileAddNewCardButton = document.querySelector(
  "#profile-add-button"
);
export const avatarButton = document.querySelector("#avatar-button");

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardTitleInput = document.querySelector("#modal-input-type-title");
export const cardLinkInput = document.querySelector("#modal-input-type-url");
export const avatarInput = document.querySelector("#modal-input-type-avatar");
export const deleteCardButton = document.querySelector("#delete-card-button");
