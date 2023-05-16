class NewsApi {
    constructor({ baseUrl, apiKey }) {
        this._baseUrl = baseUrl;
        this._apiKey = apiKey = `8fb290e02737483abe2227e4476de7d4`;

    }
    _customFetch(url, headers) {
        return fetch(url, headers).then(res => res.ok ? res.json() : Promise.reject(res.statusText));

    }
    getInitalArticles(prompt) {
        return this._customFetch(`${this._baseUrl}${prompt}&apiKey=${this._apiKey}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        })
    }

}
export const api = new NewsApi({
    baseUrl: 'https://nomoreparties.co/news/v2/everything?q=',
    headers: {
        "Content-Type": "application/json"
    }
});