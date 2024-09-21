/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.imagesBlock = this.element.querySelector('.images-list');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imagesBlock.addEventListener(('dblclick'), (event) => {
      if (event.target.tagName === 'IMG') {
        this.element.querySelector('.image').setAttribute('src', event.target.src);
      };
    });

    this.imagesBlock.addEventListener(('click'), (event) => {
      if (event.target.tagName === 'IMG') {
        event.target.classList.toggle('selected');
        console.log(event.target)
        this.checkButtonText();
      }
    });

    this.imagesBlock.querySelector('.select-all').addEventListener(('click'), () => {
      const imagesList = Array.from(this.imagesBlock.querySelectorAll('.four img'));
      if (imagesList.every(image => image.classList.contains('selected'))) {
        imagesList.forEach(image => image.classList.remove('selected'));
        this.checkButtonText();
      } else {
        imagesList.forEach(image => image.classList.add('selected'));
        this.checkButtonText();
      }
    })

    this.imagesBlock.querySelector('.send').addEventListener(('click'), () => {
      const imagesList = Array.from(this.imagesBlock.querySelectorAll('.four img'));
      let counter = 0;
      imagesList.forEach((image) => {
        if (image.classList.contains('selected')) {
          Yandex.uploadFile(counter.toString() + '.png', image.src, () => {console.log('Успех!')})
          counter += 1;
        }
      })
    })


  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    const imagesList = this.imagesBlock.querySelectorAll('.four');
    imagesList.forEach(image => image.remove());
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled');

      images.forEach(image => {
        let imageField = document.createElement('div');
        imageField.className = 'four wide column ui medium image-wrapper';
        imageField.innerHTML = `<img src='${image}'/>`;
        document.querySelector('.images-list .row').append(imageField);
      });

    } else if (images.length < 1) { 
      document.querySelector('.select-all').classList.add('disabled');
    };
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const imagesList = Array.from(this.imagesBlock.querySelectorAll('.four img'));
    let btnSend = this.imagesBlock.querySelector('.send');
    let btnSelectAll = this.imagesBlock.querySelector('.select-all');

    if (imagesList.every(image => image.classList.contains('selected'))) {
      btnSelectAll.textContent = 'Cнять выделение';
    } else {
      btnSelectAll.textContent = 'Выбрать всё';
    }

    if (imagesList.some(image => image.classList.contains('selected'))) {
      btnSend.classList.remove('disabled');
    } else {
      btnSend.classList.add('disabled');
    }
  }

}