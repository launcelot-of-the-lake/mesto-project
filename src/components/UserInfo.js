class UserInfo {
  constructor({
    nameSelector,
    aboutSelector,
    api,
   }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._api = api;

    this._initialInfo();
  }

  getUserInfo() {
    return this._api.getUser();
  }

  async setUserInfo({ name, about }) {
    const userInfo = await this._api.patchUser(name, about);

    this._updateInfo(userInfo);
  }

  _updateInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  async _initialInfo() {
    const userInfo = await this.getUserInfo();

    this._updateInfo(userInfo);
  }
}

export default UserInfo;
