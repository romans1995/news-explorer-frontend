import React, { useEffect, useState } from "react";
import trashIcon from '../../images/trash.svg';
import saveIcon from '../../images/save.svg';
import savedIcon from '../../images/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useArticles } from '../../contexts/ArticlesContext';
import { useHome } from '../../contexts/HomeContext';
import { debounce } from "lodash";

const changeDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

const NewsCard = ({ savedArticlesSet,searchTerm, card, userArticles, setUserArticles, handleDeleteArticleFunc, articlesLength, cardId, allSavedArticles, setAllSavedArticles }) => {
    const [showToolTip, setShowToolTip] = React.useState(false);
    const { loggedIn } = useAuth();
    const { isHome } = useHome()
    const undifindImg = "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
    const date = new Date()
    const [myDifiedArticle] = React.useState({
        title: card.title,
        keyword: searchTerm,
        text: card.description,
        date: changeDate(card.publishedAt) || changeDate(date) ,
        source: card.source?.id ? card.source.id : card.source?.name,
        image: card.urlToImage || undifindImg,
        link: card.url,
    });
    const token = localStorage.getItem('token');
    const api = useArticles();
    const [articleSaved, setArticleSaved] = useState(false);
    
   

    const onHoverMessage = (e) => {
        e.preventDefault();
        setShowToolTip(true)
    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        setShowToolTip(false)
    }
    const saveArticleFunc = async () => {
        try {
            await api.saveArticle(myDifiedArticle, token);
            setArticleSaved(true);
        } catch (err) {
            console.log(err);
        }
    }
 
    const unSaveArticleFunc = async () => {
        try {
            const { url } = card;

            if (savedArticlesSet.has(url)) {
                const deletePromises = allSavedArticles.data
                    .filter(element => element.link === url)
                    .map(element => api.deleteArticle(element._id));

                await Promise.all(deletePromises);
                savedArticlesSet.delete(card);
                setArticleSaved(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
  
    const debouncedUnSaveArticleFunc = debounce(unSaveArticleFunc, 500);

const handleDelete = async (e) => {
    e.preventDefault();
    // Call the delete function passed from the parent component
    await handleDeleteArticleFunc(card);
};
const handleArticleClick = (e) => {
    // Check if a button or its child element was clicked
    const isButtonClicked = e.target.closest("button");
    if (!isButtonClicked) {
        card.url ? window.open(card.url, "_blank") : window.open(card.link, "_blank"); // Redirect to the URL
    }
};
 
  


    useEffect(() => {
        if (allSavedArticles && allSavedArticles.data) {
            const isArticleSaved = allSavedArticles.data.some(element => element.link === card.url);
            setArticleSaved(isArticleSaved);
        }
    }, [allSavedArticles, card.url]);

return (
    <article className="NewsCard" onClick={handleArticleClick} >
        <div className="NewsCard-img"
            style={{
                backgroundImage: `url(${card.urlToImage ? card.urlToImage : card.image ? card.image : undifindImg})`
            }}
        >
            <div className="NewsCard-img-container">
                <button className="NewsCard-img-tagBtn">{card.source.name || card.keyword}</button>
                {isHome ? <button className="NewsCard-img-icon NewsCard-img-delete"><img src={articleSaved ? savedIcon : saveIcon}
                    alt="Remove from saved"
                    onMouseEnter={onHoverMessage}
                    onMouseLeave={handleMouseLeave}
                    onClick={articleSaved ? debouncedUnSaveArticleFunc : saveArticleFunc}
                    disabled={!loggedIn} /></button>
                    : <button className=" NewsCard-img-icon NewsCard-img-save"><img src={trashIcon} alt="save" title="delete Article" onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave} onClick={handleDelete} /></button>}
            </div>
            {showToolTip && (
                loggedIn ? (
                    isHome && !articleSaved ? (
                        <button className="news-card__tootltip">
                            Save Article
                        </button>
                    ) : (
                        <button className="news-card__tootltip">
                            Remove Article
                        </button>
                    )
                ) : (
                    <button className="news-card__tootltip">
                        Please Log In
                    </button>
                )
            )}
        </div>
        <div className="NewsCard-text">
            <p className="NewsCard-text-date">{changeDate(card.publishedAt ? card.publishedAt : card.date)}</p>
            <h3 className="NewsCard-text-title">{card.title}</h3>
            <div className="NewsCard-text-container">
                <p className="NewsCard-text-text">{card.description ? card.description : card.text}</p>
            </div>
            <p className="NewsCard-text-tags">{card.author}</p>
        </div>
    </article>
)
}
export default NewsCard;