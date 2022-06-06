import { getUser, patchUser, patchAvatar } from './api.js';

const avatarElement = document.querySelector('.profile__avatar-image');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

let id;

export function initProfile() {
  return new Promise((resolve, reject) => {
    getUser()
      .then(({ _id, name, about, avatar }) => {
        nameElement.textContent = name;
        jobElement.textContent = about;
        avatarElement.src = avatar;
        avatarElement.alt = name;
        id = _id;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateProfile(name, about) {
  return new Promise((resolve, reject) => {
    patchUser(name, about)
      .then(({ name, about }) => {
        nameElement.textContent = name;
        jobElement.textContent = about;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateAvatar(avatar) {
  return new Promise((resolve, reject) => {
    patchAvatar(avatar)
    .then(({ avatar, name }) => {
      avatarElement.src = avatar;
      avatarElement.alt = name;
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function getId() {
  return id;
}

export function getName() {
  return nameElement.textContent;
}

export function getAbout() {
  return jobElement.textContent;
}

export function getAvatar() {
  return avatarElement.src;
}
