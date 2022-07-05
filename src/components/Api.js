class Api {
  constructor(options) {
    this._options = options;
  }

  getUser() {
    return this._fetchData('users/me');
  }

  patchUser(name, about) {
    return this._fetchData('users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    });
  }

  patchAvatar(avatar) {
    return this._fetchData('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    });
  }

  getCards() {
    return this._fetchData('cards');
  }

  postCard(name, link) {
    return this._fetchData('cards', {
      method: 'POST',
      body: JSON.stringify({ name, link })
    });
  }

  deleteCard(id) {
    return this._fetchData(`cards/${id}`, {
      method: 'DELETE',
    });
  }

  putLike(id) {
    return this._fetchData(`cards/likes/${id}`, {
      method: 'PUT',
    });
  }

  deleteLike(id) {
    return this._fetchData(`cards/likes/${id}`, {
      method: 'DELETE',
    });
  }

  _fetchData(url, options) {
    return fetch(`${this._options.baseUrl}/${url}`, {
      headers: this._options.headers,
      ...options
    })
      .then(res => {
        if (res.ok) return res.json();

        return Promise.reject(`Ошибка: ${res.status}.`);
      });
  }
}

export default Api;
