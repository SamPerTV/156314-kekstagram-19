'use strict';
//  Константы
var COUNT_PHOTO = 26;
var DESCRIPTIONS_PHOTOS = ['Новый день', 'Игра воображения', 'Песня осеннего пламени'];
var MESSAGES_PHOTOS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var photoList = document.querySelector('.pictures');
//  =========
//  Создание случайного числа
var generateRandomNumber = function (userNumber) {
  var randomNumber = Math.floor(Math.random() * userNumber);
  if (randomNumber === 0) {
    randomNumber++;
  }
  return randomNumber;
};
//  =========
//  Создание случайного числа с диапозоном
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//  =========
//  Дает случайный элемент массива
var getRandomArrayElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};
//  =========
var collectionsPhoto = [];
// Генерация фото на главную страницу
for (var i = 0; i < COUNT_PHOTO; i++) {
  var photoBar = {
    url: 'photos/' + generateRandomNumber(COUNT_PHOTO) + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
    likes: getRandomInRange(15, 1000),
    comments: [
      {
        avatar: 'img/avatar-' + generateRandomNumber(6) + '.svg',
        message: getRandomArrayElement(MESSAGES_PHOTOS),
        name: getRandomArrayElement(USERS_NAMES)
      }
    ]
  };
  collectionsPhoto.push(photoBar);
}
//  =========
//  Копируем Template
var photoTemplateElement = document.querySelector('#picture')
.content
.querySelector('.picture');
//  =========
// Вырисовка фото на экран
var generatingPhotos = function (photo) {
  var photoElement = photoTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = generateRandomNumber(100);
  return photoElement;
};
//  =========
// Создание фрагмента и его вставка
var fragmentPhoto = document.createDocumentFragment();
for (var q = 0; q < collectionsPhoto.length; q++) {
  fragmentPhoto.appendChild(generatingPhotos(collectionsPhoto[q]));
}
photoList.appendChild(fragmentPhoto);
//  =========
