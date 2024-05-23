export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      nameSelector: this._name.textContent,
      jobSelector: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.description;
  }
}
