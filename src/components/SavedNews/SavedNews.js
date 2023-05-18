import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';

import NewsCardList from '../NewsCardList/NewsCardList';


const SavedNews = (props) => {
    const { isHome } = useHome();
    const [userArticles, setUserArticles] = useState([]);
    const { user, token } = useAuth();
    const [articlesLength, setArticlesLength] = useState(0)

    useEffect(() => {
        if (isHome) {
            newLocal().then(response =>{
                setUserArticles(response);
                setArticlesLength(response.data.length || "0");
            }).then(keywordSelect).catch((error) => {
                    console.log(error);
                });
        }

    }, [isHome, userArticles]);

    const newLocal = async () => {
        try {
            const articles = await props.getSavedArticles(token);
            return articles;

        } catch {
            return (err) => { console.log(err) }
        }
    }
    const keywordSelect = () => {
            if (userArticles.data){
                const keyW = userArticles.data.map((card) => card.keyword);
            let uniqKeywords = [];
            for (let i = 0; i < keyW.length; i++) {
                if (keyW[0] === keyW[i] && uniqKeywords.includes(keyW[i])) {
                    continue;
                } else {
                    uniqKeywords.push(keyW[i]);
                }
            }
            if (uniqKeywords.length > 3) {
                return `${uniqKeywords[0]}, ${uniqKeywords[1]}, and ${uniqKeywords.length - 2
                    } others`;
            } else {
                const keywordElements = uniqKeywords.map((keyword) => {
                    return keyword;
                });
                return keywordElements;
             }
            }else{
                console.log("this", userArticles)
                return "None"
            }
            
    }  

    return (
        <main className="savedNews">
            <section className='savedNews__text'>
                <p className="savedNews__P">saved articles</p>
                {!isHome && userArticles !== [] && <><h2 className='savedNews__hsecond'>{user.firstName},you have {articlesLength} saved articles</h2><p className='savedNews__keywords'>By keywords: <strong>{keywordSelect()}</strong></p></>}
            </section>
            <section className='NewsCardList-container'>
                <NewsCardList userArticles={userArticles.data} />
            </section>
        </main>
    );
}


export default SavedNews;