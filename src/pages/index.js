import "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import {
  validationSettings,
  profileAddNewCardButton,
  profileEditButton,
  addFormElement,
  editFormElement,
  avatarFormElement,
  avatarButton,
  profileDescriptionInput,
  profileTitleInput,
} from "../utils/constants.js";
import ".//index.css";

let section;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "77570098-8218-4305-94d2-93e61885b891",
    "Content-Type": "application/json",
  },
});

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

const deleteImageModal = new PopupConfirmDelete("#confirm-delete-modal");
deleteImageModal.setEventListeners();

const avatarModal = new PopupWithForm(
  {
    popupSelector: "#change-avatar-modal",
  },
  handleChangeAvatar
);
avatarModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .getCurrentUserInfo()
  .then((userData) => {
    userInfo.setAvatarInfo(userData);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function handleProfileEditSubmit(inputValues) {
  profileEditModal.renderLoading(true);
  api
    .updateProfileInfo(inputValues)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileEditModal.close();
      editFormElement.resetValidation();
      editFormValidator.disableSubmit();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditModal.renderLoading(false);
    });
}

function handleAddCardFormSubmit(inputValues) {
  addCardModal.renderLoading(true);
  api
    .createACard(inputValues)
    .then((res) => {
      renderCard(res);
      addCardModal.close();
      addFormElement.resetValidation();
      addFormValidator.disableSubmit();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardModal.renderLoading(false);
    });
}

function handleChangeAvatar(inputValues) {
  avatarModal.renderLoading(true);
  api
    .updateAvatar(inputValues)
    .then((res) => {
      userInfo.setAvatarInfo(res);
      avatarModal.close();
      avatarFormElement.resetValidation();
      avatarFormValidator.disableSubmit();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarModal.renderLoading(false);
    });
  console.log(inputValues);
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

function handleLikeClicks(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then((newCardData) => {
        card.isLiked = newCardData.isLiked;
        card.renderLikes();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!card.isLiked) {
    api
      .likeCard(card._id)
      .then((newCardData) => {
        card.isLiked = newCardData.isLiked;
        card.renderLikes();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteSubmit(card) {
  deleteImageModal.open();
  console.log(card._id);
  deleteImageModal.handleDelete(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.handleDeleteCard();
        deleteImageModal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function createACard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteSubmit,
    handleLikeClicks
  );
  const cardEl = card.getView();
  return cardEl;
}

function renderCard(cardData) {
  const card = createACard(cardData);
  section.addItem(card);
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.about;
  profileEditModal.open();
});

profileAddNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

avatarButton.addEventListener("click", () => {
  avatarModal.open();
});

// Form Validators

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
