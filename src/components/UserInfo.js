export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const usersCurrentInfo = {};
    usersCurrentInfo.name = this._name.textContent;
    usersCurrentInfo.description = this._job.textContent;
    return usersCurrentInfo;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.title;
    this._job.textContent = userData.description;
  }

  setAvatarInfo(userData) {
    this._avatar.src = userData.avatar;
  }
}
