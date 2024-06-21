export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
  }

  setAvatarInfo(userData) {
    this._avatar.src = userData.avatar;
  }
}
