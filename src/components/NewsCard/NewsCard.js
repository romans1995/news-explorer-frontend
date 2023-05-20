import React, { useEffect } from "react";
import trashIcon from '../../images/trash.svg';
import saveIcon from '../../images/save.svg';
import savedIcon from '../../images/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useArticles } from '../../contexts/ArticlesContext';
import { useHome } from '../../contexts/HomeContext';

const changeDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

const NewsCard = ({ card, userArticles, setUserArticles, handleDeleteArticleFunc, articlesLength } ) => {
    const [showToolTip, setShowToolTip] = React.useState(false);
    const { loggedIn } = useAuth();
    const { isHome } = useHome()
    const [myDifiedArticle] = React.useState({
        title: card.title,
        keyword:card.source?.name,
        text: card.description,
        date: changeDate(card.publishedAt),
        source: card.source?.id ? card.source.id : card.source?.name,
        image: card.urlToImage,
        link: card.url,
    });
   const token = localStorage.getItem('token');
    const api = useArticles();
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
        } catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        // Call the delete function passed from the parent component
        await handleDeleteArticleFunc(card);
    };
    const handleArticleClick = (e) => {
           // Check if a button or its child element was clicked
        const isButtonClicked = e.target.closest("button");

        if (!isButtonClicked) {
            window.open(card.url, "_blank"); // Redirect to the URL
        }
    };

    useEffect(()=>{
    }, [isHome, userArticles, articlesLength])

    return (
        <article className="NewsCard" onClick={handleArticleClick} >
            <div className="NewsCard-img" 
                style={{
                    backgroundImage: `url(${card.urlToImage ? card.urlToImage : card.image})`
                }}
            >
                <div className="NewsCard-img-container">
                    <button className="NewsCard-img-tagBtn">{card.source.name || card.keyword}</button>
                    {isHome ? <button className="NewsCard-img-icon NewsCard-img-delete"><img src={saveIcon}
                     alt="Remove from saved"
                      onMouseEnter={onHoverMessage}
                       onMouseLeave={handleMouseLeave}
                        onClick={saveArticleFunc}
                        disabled={!loggedIn} /></button>
                        : <button className=" NewsCard-img-icon NewsCard-img-save"><img src={trashIcon} alt="save" title="delete Article" onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave} onClick={handleDelete} /></button>}
                </div>
                {showToolTip && (
                    loggedIn ? (
                        isHome ? (
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