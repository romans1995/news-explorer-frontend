import React, { useEffect } from "react";
import trashIcon from '../../images/trash.svg';
import saveIcon from '../../images/save.svg';
import savedIcon from '../../images/saved.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useArticles } from '../../contexts/ArticlesContext';
const changeDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}
const NewsCard = (card, { userArticles }) => {
    const [showToolTip, setShowToolTip] = React.useState(false);
    const [savedArticle, setsavedArticle] = React.useState(false);
    const { loggedIn, isHome,token } = useAuth();
    const [myDifiedArticle] = React.useState({
        title: card.card.title,
        keyword:card.card.source?.name,
        text: card.card.description,
        date: changeDate(card.card.publishedAt),
        source: card.card.source?.id ? card.card.source.id : card.card.source?.name,
        image: card.card.urlToImage,
        link: card.card.url

    });
    const api = useArticles();
    const onHoverMessage = () => {
        setShowToolTip(true)
    }

    const handleMouseLeave = () => {
        setShowToolTip(false)
    }
    
    
    useEffect(()=>{
        if(isHome){
            const saveArticleFunc = async () => {
                try {
                    const article = await api.saveArticle(myDifiedArticle, token);
                    console.log("article", article)
                    if (article.ok) {
                        console.log("success")
                        setsavedArticle(true)
                    } else {
                        console.log(`Error: ${Object.values(article)} - ${article.statusText}`);
                        const errorResponse = await article.json();
                        console.log("Error response:", errorResponse);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        
    },[api, isHome, myDifiedArticle, token])

    return (
        <article className="NewsCard" >
            <div className="NewsCard-img"
                style={{
                    backgroundImage: `url(${card.card.urlToImage ? card.card.urlToImage : card.card.image})`
                }}
            >
                <div className="NewsCard-img-container">
                    <button className="NewsCard-img-tagBtn">{card.card.source.name || card.card.keyword}</button>
                    {loggedIn && isHome ? <button className="NewsCard-img-icon NewsCard-img-delete"><img src={trashIcon} alt="Remove from saved" onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave} /></button>
                        : <button className=" NewsCard-img-icon NewsCard-img-save"><img src={savedArticle ? savedIcon : saveIcon} alt="save" title={loggedIn ? "Save article" : "please loggin to save articles"} onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave}  disabled = {!loggedIn} /></button>}
                </div>
                {showToolTip && (loggedIn && !savedArticle ?
                    <button className="news-card__tootltip">
                        Save article
                    </button> : <button className="news-card__tootltip">
                        Sign in to save articles
                    </button>
                )}
            </div>
            <div className="NewsCard-text">
                <p className="NewsCard-text-date">{changeDate(card.card.publishedAt ? card.card.publishedAt : card.card.date)}</p>
                <h3 className="NewsCard-text-title">{card.card.title}</h3>
                <div className="NewsCard-text-container">
                    <p className="NewsCard-text-text">{card.card.description ? card.card.description : card.card.text}</p>
                </div>
                <p className="NewsCard-text-tags">{card.card.author}</p>
            </div>
        </article>
    )
}
export default NewsCard;