/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.uploadModal = document.querySelector('.file-uploader-modal');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.uploadModal.addEventListener(('click'), (event) => {
      if (event.target.classList.contains('x') || event.target.classList.contains('close')) {
        this.close();
      }

      if (event.target.classList.contains('send-all')) {
        this.sendAllImages();
      }
    })

    this.uploadModal.querySelector('.content').addEventListener(('click'), (event) => {
      if (event.target.classList.contains('input')) {
        event.target.classList.remove('error');
      }
      
      if (event.target.classList.contains('button')) {
        this.sendImage(event.target.closest('.image-preview-container'));
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const finallyHTML = [];
    const imagesList = images.reverse();

    for (const image of imagesList) {
      finallyHTML.push(this.getImageHTML(image));
    }

    this.uploadModal.querySelector('.content').innerHTML = finallyHTML.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
    <img src='${item.src}' />
    <div class="ui action input">
      <input type="text" placeholder="Путь к файлу">
      <button class="ui button"><i class="upload icon"></i></button>
    </div>
  </div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    const images = Array.from(this.uploadModal.querySelectorAll('.image-preview-container'));

    images.forEach((image) => {
      this.sendImage(image);
    })
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const inputValue = imageContainer.querySelector('input').value;

    if (inputValue === '') {
      imageContainer.querySelector('.input').classList.add('error');

      return 0;
    }

    imageContainer.querySelector('.input').classList.add('disabled')
    const imageURL = imageContainer.querySelector('img').src;

    Yandex.uploadFile(inputValue, imageURL, () => {
      imageContainer.closest('.image-preview-container').remove();


      if (this.uploadModal.querySelector('.image-preview-container') === null) {
        this.close();
      }
    })


  }
}