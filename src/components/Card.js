export default class Card {
  constructor(
    { title, url, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDelete,
    handleLikeClicks
  ) {
    this._name = title;
    this._link = url;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._handleLikeClicks = handleLikeClicks;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClicks(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        title: this._name,
        url: this._link,
      });
    });
  }

  renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");

    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.title = this._name;

    this._setEventListeners();
    this.renderLikes();

    return this._cardElement;
  }
}
