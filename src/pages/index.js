import "../pages/index.css";
import "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import UserInfo from "../components/user-info.js";
import {
  initialCards,
  defaultFormConfig,
  popupConfig,
  profileConfig,
  cardsConfig,
} from "../utils/constants.js";

function createCard(data) {
  const card = new Card(data, cardSelector, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewImageTitleEl.textContent = data.name;
  openModal(cardImageModal);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle.textContent,
  userJobSelector: profileConfig.profileDescription.textContent,
});

// might need different class after the popup config
const imagePopup = new PopupWithImage(popupConfig.cardImageModal);

// function renderCard(data, wrapper) {
//   const cardElement = createCard(data);
//   wrapper.prepend(cardElement);
// }

// Elements
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const profileEditModal = document.querySelector("#profile-edit-button-modal");
const addCardModal = document.querySelector("#add-card-modal");
const cardImageModal = document.querySelector("#preview-card-image-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");

// PopupwithImage
const previewImageTitleEl = cardImageModal.querySelector(".modal__card_title");
const previewImage = cardImageModal.querySelector(".modal__image");

// Buttons and other Dom nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const cardImageModalCloseButton = cardImageModal.querySelector(".modal__close");
// const closeButtons = document.querySelectorAll(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form Data
const cardTitleInput = addCardModal.querySelector("#modal-input-type-title");
const cardURLInput = addCardModal.querySelector("#modal-input-type-url");

const cardSelector = "#card-template";

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_submit",
  inactiveButtonClass: "modal__button_submit_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Open and Close Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

// Modal Listeners
// function closeModalByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

// function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.currentTarget);
//   }
// }

// Submit Functions
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard(
    {
      name,
      link,
    },
    cardListEl
  );

  e.target.reset();

  closeModal(addCardModal);
}

// Component Card Functions

// function renderCard(data, wrapper) {
//   const cardElement = createCard(data);
//   wrapper.prepend(cardElement);
// }

// Event Handlers

function initializeModalEventListeners() {
  profileEditCloseButton.addEventListener("click", () =>
    closeModal(profileEditModal)
  );
  addCardModalCloseButton.addEventListener("click", () =>
    closeModal(addCardModal)
  );
  cardImageModalCloseButton.addEventListener("click", () =>
    closeModal(cardImageModal)
  );
}

initializeModalEventListeners.call();

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openModal(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
