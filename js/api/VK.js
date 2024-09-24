/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    let script = document.createElement('script');
    script.id = 'delete'
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&extended=1&photo_sizes=1&count=5&callback=VK.processData&access_token=${this.ACCESS_TOKEN}&v=5.154`;
    document.body.append(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.getElementById('delete').remove();

    if (result.response) {
      const resultList = [];
      const photos = result.response.items;

      photos.forEach(photo => {
        resultList.push(photo.sizes.at(-1).url)
      });

      this.lastCallback(resultList);
      this.lastCallback = () => {};

    } else if (result.error) {
      alert(result.error.error_msg);
    }
  }
}
