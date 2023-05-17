const BASE_URL = "https://api.newsexplorer-r.chickenkiller.com";
const token = localStorage.getItem("token");
// const BASE_URL = "http://localhost:3000";
const customFetch = async(url, headers) => {
    try {
        const res = await fetch(url, headers);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getSavedArticles = (token) => {

    return customFetch(`${BASE_URL}/articles`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }

    })
};
export const saveArticle = (article) => {
    console.log(article)
    return customFetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article)
    });
};
// return fetch(url, headers).then(res => res.ok ? res.json() : Promise.reject(res.statusText));

export const signUp = (email, password, name) => {
    return customFetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, name })
    });
};

export const signIn = (email, password) => {
    return customFetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
};

export const checkTocken = () => {
    return customFetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};