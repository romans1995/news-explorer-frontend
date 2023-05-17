import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHome } from '../../contexts/HomeContext';

import NewsCardList from '../NewsCardList/NewsCardList';


const SavedNews = (props) => {
    console.log("props",props)
    const { isHome } = useHome();
    const [userArticles, setUserArticles] = useState([]);
    const { user } = useAuth();
    const getdataFromUser = async() =>{
        try{
            const articles = await props.getSavedArticles();
            setUserArticles(articles)
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
    const keywordSelect = () => {
        const keyW = userArticles.map((card) => card.keyword);
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
}  
        
   
    useEffect(()=>{
        console.log("savedNews",userArticles)
        if(!isHome){
            getdataFromUser();
        }
    }, [isHome]);
    return (
        <main className="savedNews">
            <section className='savedNews__text'>
                <p className="savedNews__P">saved articles</p>
                <h2 className='savedNews__hsecond'>{user.firstName},you have {userArticles ? userArticles.length:"0"} saved articles</h2>
                <p className='savedNews__keywords'>By keywords: <strong>{keywordSelect()}</strong></p>
            </section>
            <section className='NewsCardList-container'>
                <NewsCardList userArticles={userArticles }/>
            </section>
        </main>
    );
}


export default SavedNews;