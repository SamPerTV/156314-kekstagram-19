'use strict';
//  Константы
var COUNT_PHOTO = 25;
var DESCRIPTIONS = ['Новый день', 'Игра воображения', 'Песня осеннего пламени'];
var MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var photoList = document.querySelector('.pictures');
var textHashtagsInput = document.querySelector('.text__hashtags');
var uploadImages = document.querySelector('.img-upload__overlay');
var cancelButton = document.querySelector('.img-upload__cancel');
var cancelButtonBigPicture = document.querySelector('.big-picture__cancel');
var effectList = document.querySelector('.effects__list');
var getEffectElement = document.querySelector('.img-upload__preview');
var effectLevelElement = document.querySelector('.effect-level');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleСontrolValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var bigpictureListElement = document.querySelector('.big-picture');
var ESC_KEYCODE = 27;
var countValueImg = {
  ZERO: 0,
  TWENTY_FIVE: 25,
  FIFTY: 50,
  SEVENTY_FIVE: 75,
  ONE_HUNDRED: 100
};
var PERCENT_SIGN = '%';
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
 * @return {any} -  случайный элемент массива
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
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(USER_NAMES)
  };
};
/**
 * Дает случайный набор комменатриев к photo
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
    description: getRandomArrayElement(DESCRIPTIONS),
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
  photoTemplate.querySelector('.picture__img').src = photoElement.url;
  photoTemplate.querySelector('.picture__likes').textContent = photoElement.likes;
  photoTemplate.querySelector('.picture__comments').textContent = photoElement.comments.length;
  return photoTemplate;
};


var fragment = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(createPhotoTemplate(photos[j]));
}
photoList.appendChild(fragment);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

textHashtagsInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

document.querySelector('.text__description').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});


var openPopup = function () {
  uploadImages.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadImages.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

document.querySelector('#upload-file').addEventListener('change', function () {
  openPopup();
});
cancelButton.addEventListener('click', function () {
  closePopup();
});
cancelButtonBigPicture.addEventListener('click', function () {
  bigpictureListElement.classList.add('hidden');
});

effectList.addEventListener('click', function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'chrome':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'grayscale(1)';
      break;
    case 'none':
      effectLevelElement.classList.add('hidden');
      getEffectElement.style.filter = '';
      break;
    case 'sepia':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'sepia(1)';
      break;
    case 'marvin':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'invert(100%)';
      break;
    case 'phobos':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'blur(3px)';
      break;
    case 'heat':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'brightness(3)';
      break;
  }
});
var textHashtagsValueSplit;
textHashtagsInput.addEventListener('input', function () {
  var textHashtagsValue = [textHashtagsInput.value];
  textHashtagsValueSplit = renderSplitArray(textHashtagsValue);
});

var cloneArray = function (A) {
  var n = A.length;
  for (var a = 0; a < n - 1; a++) {
    for (var e = a + 1; e < n; e++) {
      if (A[a] === A[e]) {
        return true;
      }
    }
  }
  return false;
};

var renderSplitArray = function (spklitArray) {
  var splitArrayStrin = spklitArray.toString();
  return splitArrayStrin.split(' ');
};

var arrayCheck = function (target) {
  for (var s = 0; s < textHashtagsValueSplit.length; s++) {
    if (textHashtagsValueSplit[s].length < 2) {
      target.setCustomValidity('Хэштэг должен состоять из двух символов');
    } else if (textHashtagsValueSplit[s].includes('#') - 1) {
      target.setCustomValidity('Пропущен символ #');
    } else if (cloneArray(textHashtagsValueSplit)) {
      target.setCustomValidity('Одинаковый хэш');
    } else if (textHashtagsValueSplit[s].length >= 20) {
      target.setCustomValidity('Хэштэг не может состоять больше 20-ти символов');
    } else if (textHashtagsValueSplit.length > 5) {
      target.setCustomValidity('Хэштэгов не может быть больше 5');
    } else {
      target.setCustomValidity('');

    }

  }
};

textHashtagsInput.addEventListener('input', function (evt) {
  var target = evt.target;
  arrayCheck(target);

});
scaleControlBigger.addEventListener('click', function () {
  var scaleValue = scaleСontrolValue.value;
  switch (scaleValue) {
    case countValueImg.ZERO + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.TWENTY_FIVE + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.25)';
      break;
    }
    case countValueImg.TWENTY_FIVE + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.FIFTY + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.50)';
      break;
    }
    case countValueImg.FIFTY + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.SEVENTY_FIVE + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.75)';
      break;
    }
    case countValueImg.SEVENTY_FIVE + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.ONE_HUNDRED + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(1)';
      break;
    }
    case countValueImg.ONE_HUNDRED + PERCENT_SIGN: {
      break;
    }
  }
});
scaleControlSmaller.addEventListener('click', function () {
  var scaleValue = scaleСontrolValue.value;
  switch (scaleValue) {
    case countValueImg.ZERO + PERCENT_SIGN: {
      break;
    }
    case countValueImg.TWENTY_FIVE + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.ZERO + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0)';
      break;
    }
    case countValueImg.FIFTY + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.TWENTY_FIVE + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.25)';
      break;
    }
    case countValueImg.SEVENTY_FIVE + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.FIFTY + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.50)';
      break;
    }
    case countValueImg.ONE_HUNDRED + PERCENT_SIGN: {
      scaleСontrolValue.value = countValueImg.SEVENTY_FIVE + PERCENT_SIGN;
      imgUploadPreview.style.transform = 'scale(0.75)';
      break;
    }
  }
});

