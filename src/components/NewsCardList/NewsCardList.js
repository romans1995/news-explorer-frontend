// import { useArticles } from "../../contexts/ArticlesContext";
import { useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";

const NewsCardList = ({ userArticles, setUserArticles, handleDeleteArticleFunc, articlesLength } ) => {
   useEffect(()=>{
       console.log("NewsCardList", userArticles)
   }, [userArticles])
    
    return (
        <div className="NewsCardList">
            <div className="NewsCardList__cards">
                {!userArticles?.data || userArticles  === []? 
                    <p>Sorry, you haven't saved any articles</p>
                    : userArticles.data.map(card => (
                        <div id={card._id } key={card._id} className="NewsCardList__cards-listItem">
                            <NewsCard 
                            card={card}
                             userArticles={userArticles}
                              setUserArticles={setUserArticles}
                               handleDeleteArticleFunc={handleDeleteArticleFunc}
                                articlesLength={articlesLength}
                               />
                        </div>))
                    }
            </div>
        </div>
    );
};

export default NewsCardList;