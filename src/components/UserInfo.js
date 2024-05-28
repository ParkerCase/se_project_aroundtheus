export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
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
}
