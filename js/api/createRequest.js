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
            if (responce.status < 204) {
                return responce.json()
            } else if (responce.status === 204) {
                return null;
            }
        })
        .then (data => {
            return options.callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
