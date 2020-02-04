'use strict';
//  Константы
var COUNT_PHOTO = 25;
var DESCRIPTION = ['Новый день', 'Игра воображения', 'Песня осеннего пламени'];
var MESSAGE_PHOTOS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var photoList = document.querySelector('.pictures');
/**
 * Возвращает случайное число
 *
 * @param {number} min - Минимальное число
 * @param {number} max - Максимальное число
 * @return {number} -  случайное число в диапозоне
 */
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Возвращает случайный элемент массива
 *
 * @param {array} array - Массив
 * @return {array} -  случайный элемент массива
 */
var getRandomArrayElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};
/**
 * Дает структуру comment
 *
 * @return {object} - структура comment
 */
var createComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomInRange(0, 6) + '.svg',
    message: getRandomArrayElement(MESSAGE_PHOTOS),
    name: getRandomArrayElement(USER_NAMES)
  };
};
/**
 * Дает случаный набор комменатриев к photo
 *
 * @return {array} - массив
 */
var createComments = function () {
  var lenght = getRandomInRange(0, 6);
  var comments = [];
  for (var i = 0; i < lenght; i++) {
    var comment = createComment();
    comments.push(comment);
  }
  return comments;
};

var photos = [];

for (var i = 1; i <= COUNT_PHOTO; i++) {
  var photo = {
    url: 'photos/' + i + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInRange(15, 200),
    comments: createComments()
  };
  photos.push(photo);
}

var photoTemplateElement = document.querySelector('#picture')
.content
.querySelector('.picture');
/**
 * Дает HTML элементы с данными из photo
 *
 * @param {array} photoElement - Массив
 * @return {object} - HTML элементы
 */
var createPhotoTemplate = function (photoElement) {
  var photoTemplate = photoTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoElement.url;
  photoElement.querySelector('.picture__likes').textContent = photoElement.likes;
  photoElement.querySelector('.picture__comments').textContent = photoElement.comments.length;
  return photoTemplate;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(createPhotoTemplate(photos[j]));
}
photoList.appendChild(fragment);

