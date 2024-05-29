import "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import ".//index.css";

const editFormElement = document.querySelector("#form-edit-profile");
const addFormElement = document.querySelector("#form-add-card");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddNewCardButton = document.querySelector("#profile-add-button");

const renderCard = (data) => {
  const cardElement = createCard(data);
  section.addItem(cardElement);
};

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardEl = card.getView(data);
  return cardEl;
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleImageClick(data) {
  previewImageModal.open(data);
}

const previewImageModal = new PopupWithImage({
  popupSelector: "#preview-card-image-modal",
});
previewImageModal.setEventListeners();

const addCardModal = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardFormSubmit
);
addCardModal.setEventListeners();

const profileEditModal = new PopupWithForm(
  {
    popupSelector: "#profile-edit-button-modal",
  },
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  editFormValidator.resetValidation(inputValues);
  profileEditModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  renderCard(inputValues);
  addFormValidator.resetValidation(inputValues);

  addCardModal.close();
}

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileEditModal.open();
});

profileAddNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});
