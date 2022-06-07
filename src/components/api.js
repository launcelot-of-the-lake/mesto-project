const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '60b3afb0-0e60-4248-a05f-bc2ccdba9d9a',
    'Content-Type': 'application/json'
  }
}

function fetchData(url, options) {
  return fetch(`${config.baseUrl}/${url}`, {
    headers: config.headers,
    ...options
  })
    .then(res => {
      if (res.ok) return res.json();

      return Promise.reject(`Ошибка: ${res.status}.`);
    });
}

export function getUser() {
  return fetchData('users/me');
}

export function patchUser(name, about) {
  return fetchData('users/me', {
    method: 'PATCH',
    body: JSON.stringify({ name, about })
  });
}

export function patchAvatar(avatar) {
  return fetchData('users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar })
  });
}

export function getCards() {
  return fetchData('cards');
}

export function postCard(name, link) {
  return fetchData('cards', {
    method: 'POST',
    body: JSON.stringify({ name, link })
  });
}

export function deleteCard(id) {
  return fetchData(`cards/${id}`, {
    method: 'DELETE',
  });
}

export function putLike(id) {
  return fetchData(`cards/likes/${id}`, {
    method: 'PUT',
  });
}

export function deleteLike(id) {
  return fetchData(`cards/likes/${id}`, {
    method: 'DELETE',
  });
}
