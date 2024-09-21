/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'vk1.a.s11RrLa5zINiqWSJyH1qg3pDJBrdPhH8JAYI4PPC7R6zT_GVTVVZ7piTjX7yrLCO5f-y6FEh6L1Fk0aV6u06a_hvor4ybSY6SwB4SfoFqkz3Dczdp-oZMYIbZKnlxlGL_N2MQztFrzV_EY8R9YoEW8JG6MPANHzDG1w5nE7NfIAn9x5gQulcQUn1STx6D8uB';
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
    console.log(result);

    if (result.response) {
      const resultList = [];
      const photos = result.response.items;

      photos.forEach(photo => {
        console.log(photo);
        resultList.push(photo.sizes.at(-1).url)
      });

      this.lastCallback(resultList);
      this.lastCallback = () => {};

    } else if (result.error) {
      alert(result.error.error_msg);
    }
  }
}
