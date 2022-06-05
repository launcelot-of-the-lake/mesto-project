const galleryImageElement = document.querySelector('.gallery__image');
const galleryCaptionElement = document.querySelector('.gallery__caption');

export function setGallery(data) {
  const { name, link } = data;

  if (galleryImageElement.src !== link) galleryImageElement.src = '';
  galleryImageElement.src = link;
  galleryImageElement.alt = name;
  galleryCaptionElement.textContent = name;
}
