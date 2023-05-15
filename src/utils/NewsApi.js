class NewsApi {
    constructor({ baseUrl, apiKey }) {
        this._baseUrl = baseUrl;
        this._apiKey = apiKey=`3f52a4ee5d6842ec9acdf732d0c93e6a`;
       
    }
    // apiKey: '3f52a4ee5d6842ec9acdf732d0c93e6a',
    _customFetch(url, headers) {
        return fetch(url, headers).then(res => res.ok ? res.json() : Promise.reject(res.statusText));

    }
         getInitalArticles(prompt) {
             return this._customFetch(`${this._baseUrl}${prompt}&apiKey=${this._apiKey}`,{
                headers:{
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