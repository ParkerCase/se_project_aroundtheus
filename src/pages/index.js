import "../images/jacques-cousteau.jpg";
import API from "../components/API.js";
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

const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "77570098-8218-4305-94d2-93e61885b891",
    "Content-Type": "application/json",
  },
});

let section;
let userInfo;

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([api.getCurrentUserInfo(), api.getInitialCards()]).then(
    ([inputValues, data]) => {
      userInfo = new UserInfo({
        nameSelector: ".profile__title",
        jobSelector: ".profile__description",
        avatarSelector: ".profile__image",
      });
      userInfo.setUserInfo(inputValues);
      userInfo.setUserInfo(inputValues.avatar);

      section = new Section(
        {
          items: initialCards,
          renderer: renderCard,
        },
        ".cards__list"
      );
      section.renderItems(data);
    }
  );
});

const renderCard = (data) => {
  const cardElement = createCard(data);
  section.addItem(cardElement);
};

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardEl = card.getView(data);
  return cardEl;
}

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
  api
    .updateProfileInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then(() => {
      console.log(inputValues);
      userInfo.setUserInfo(inputValues);
      editFormValidator.resetValidation(inputValues);
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAddCardFormSubmit(inputValues) {
  api
    .createACard({ name: inputValues.title, link: inputValues.url })
    .then(() => {
      renderCard(inputValues);
      addFormValidator.resetValidation(inputValues);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
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
