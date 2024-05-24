import "../pages/index.css";
import "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  defaultFormConfig,
  popupConfig,
  profileConfig,
  cardsConfig,
  validationSettings,
} from "../utils/constants.js";

function createCard(data) {
  const card = new Card(data, cardsConfig.cardTemplate, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleImageClick(data) {
  previewImageModal.open(data);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  cardsConfig.cardList
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  userJobSelector: profileConfig.profileDescription,
});

const previewImageModal = new PopupWithImage(popupConfig.previewImagePopup);
previewImageModal.setEventListeners();

const addCardModal = new PopupWithForm(
  popupConfig.addCardPopup,
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

const profileEditModal = new PopupWithForm(
  popupConfig.profileEditPopup,
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  e.preventDefault();
  userInfo.setUserInfo(inputValues);
  editFormValidator._inactiveButtonClass();
  profileEditModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  e.preventDefault();
  section._renderer(inputValues);
  addFormValidator._inactiveButtonClass();
  addCardModal.close();
}

const editFormValidator = new FormValidator(
  validationSettings,
  defaultFormConfig.editFormElement
);
const addFormValidator = new FormValidator(
  validationSettings,
  defaultFormConfig.addFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

profileConfig.profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  profileConfig.profileTitleInput.value = currentUserInfo.name;
  profileConfig.profileDescriptionInput.value = currentUserInfo.description;
  profileEditModal.open();
});

profileConfig.profileAddNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// PopupwithImage
// const previewImageTitleEl = cardImageModal.querySelector(".modal__card_title");

// Form Data
// const cardTitleInput = addCardModal.querySelector("#modal-input-type-title");
// const cardURLInput = addCardModal.querySelector("#modal-input-type-url");

// Open and Close Functions

// function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.currentTarget);
//   }
// }

// function initializeModalEventListeners() {
//   profileEditCloseButton.addEventListener("click", () =>
//     closeModal(profileEditModal)
//   );
//   addCardModalCloseButton.addEventListener("click", () =>
//     closeModal(addCardModal)
//   );
//   cardImageModalCloseButton.addEventListener("click", () =>
//     closeModal(cardImageModal)
//   );
// }

// initializeModalEventListeners.call();
