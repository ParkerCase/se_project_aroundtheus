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
// import Popup from "../components/Popup.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

const editFormElement = document.querySelector("#form-edit-profile");
const addFormElement = document.querySelector("#form-add-card");

// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );

// const modalImageInput = document.querySelector("#modal-input-type-title");
// const modalLinkInput = document.querySelector("#modal-input-type-url");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddNewCardButton = document.querySelector("#profile-add-button");
// const deleteCardButton = document.querySelector("#delete-button");

const inputValue = {
  name: document.querySelector("#profile-title-input"),
  description: document.querySelector("#profile-description-input"),
  title: document.querySelector("#modal-input-type-title"),
  about: document.querySelector("#modal-input-type-url"),
};

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
    ([inputValue, data]) => {
      userInfo = new UserInfo({
        nameSelector: ".profile__title",
        jobSelector: ".profile__description",
        avatarSelector: ".profile__image",
      });
      userInfo.setUserInfo(inputValue.name, inputValue.description);
      userInfo.setUserInfo(inputValue.avatar);

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
  const card = new Card(data, "#card-template", handleImageClick, handleDelete);
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

function handleProfileEditSubmit(inputValue) {
  console.log("Input Values:", inputValue);
  api
    .updateProfileInfo({
      title: inputValue.name,
      description: inputValue.description,
    })
    .then(() => {
      console.log(inputValue);
      userInfo.setUserInfo(inputValue);
      editFormValidator.resetValidation(inputValue);
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAddCardFormSubmit(inputValue) {
  api
    .createACard({ title: inputValue.title, url: inputValue.about })
    .then(() => {
      renderCard(inputValue);
      addFormValidator.resetValidation(inputValue);
      addCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

const deleteImageModal = new PopupConfirmDelete("#confirm-popup", (card) =>
  handleDelete(card)
);
deleteImageModal.setEventListeners();

function handleDelete(card) {
  deleteImageModal.open();
  api
    .deleteCard(card.Id)
    .then(() => {
      card._handleDeleteCard();
      deleteImageModal.close();
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
  inputValue.name.value = currentUserInfo.name;
  inputValue.description.value = currentUserInfo.description;
  profileEditModal.open();
});

profileAddNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});
