export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  _requestFetch(url, options) {
    return fetch(url, options).then(this._handleRes);
  }

  // Get current users info
  getCurrentUserInfo() {
    return this._requestFetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }
  // Patch or update profile info (Doctor this up too)
  updateProfileInfo({ title, description }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ title, description }),
    });
  }
  // Patch and update avatar
  updateAvatar(avatar) {
    return this._requestFetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
  // GET Cards
  getInitialCards() {
    return this._requestFetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }
  // Post cards
  createACard({ name, link }) {
    return this._requestFetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  // DELETE card
  deleteCard(cardId) {
    return this._requestFetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
  // PUT or like a card
  likeCard(cardId) {
    return this._requestFetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }
  // Dislike and Delete
  dislikeCard() {
    return this._requestFetch(`${this.baseUrl}/cards`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
