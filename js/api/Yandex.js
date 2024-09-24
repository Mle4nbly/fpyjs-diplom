/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';
  // static headers = {
  //   'Authorization': `${this.getToken()}`,
  //   'Content-Type': 'application/json',
  // }
  static headers = {
    'Authorization': `y0_AgAAAABjpqAQAADLWwAAAAERm9p2AABoKdmJY3VJZafjqClba3RltpMxoA`,
    'Content-Type': 'application/json',
  }
  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let yaToken = localStorage.getItem('YaToken');

    if (!yaToken) {
      yaToken = localStorage.setItem('YaToken', prompt('Введите Yandex токен'))
    };

    return yaToken;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    createRequest({
      url: 'https://cloud-api.yandex.net/v1/disk/resources/upload',
      method: 'POST',
      callback: callback,
      data: {
        path: path,
        url: url,
      },
      headers: this.headers,
    })
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    createRequest({
      url: 'https://cloud-api.yandex.net/v1/disk/resources',
      method: 'DELETE',
      callback: callback,
      data: {
        path: path,
      },
      headers: this.headers,
    })
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest({
      url: 'https://cloud-api.yandex.net/v1/disk/resources/files',
      method: 'GET',
      headers: this.headers,
      callback: callback,
      data: {
        media_type: 'image',
      }
    })
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let a = document.createElement('a');
    a.href = url;
    a.click();
  }
}
