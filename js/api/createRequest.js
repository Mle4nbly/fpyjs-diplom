/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const params = new URLSearchParams(options.data);
    const url = new URL(options.url);
    url.search = params.toString();

    fetch(url, {
        method: options.method,
        headers: options.headers,
    })
        .then((responce) => {
            console.log(responce);
        })
        .catch((error) => {
            console.log(error);
        });
};
