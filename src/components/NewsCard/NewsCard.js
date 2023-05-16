import React from "react";
import trashIcon from '../../images/trash.svg';
import saveIcon from '../../images/save.svg';
import { useAuth } from '../../contexts/AuthContext';
const NewsCard = (card) => {
    console.log("Card", card)
    const [showToolTip, setShowToolTip] = React.useState(false);
    const { loggedIn } = useAuth();
    const onHoverMessage = () => {
        setShowToolTip(true)
    }

    const handleMouseLeave = () => {
        setShowToolTip(false)
    }

    return (
        <article className="NewsCard">
            <div className="NewsCard-img"
                style={{
                    backgroundImage: `url(${card.card.urlToImage
})` }}
            >
                <div className="NewsCard-img-container">
                    <button className="NewsCard-img-tagBtn">{card.card.source.name}</button>
                    {loggedIn ? <button className="NewsCard-img-icon NewsCard-img-delete"><img src={trashIcon} alt="Remove from saved" onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave} /></button> : <button className=" NewsCard-img-icon NewsCard-img-save"><img src={saveIcon} alt="sace" title="please loggin to save articles" onMouseEnter={onHoverMessage} onMouseLeave={handleMouseLeave} /></button>}
                </div>
                {showToolTip && (loggedIn ?
                    <button className="news-card__tootltip">
                        Remove from saved
                    </button> : <button className="news-card__tootltip">
                        Sign in to save articles
                    </button>
                )}
            </div>
            <div className="NewsCard-text">
                <p className="NewsCard-text-date">{card.date}</p>
                <h3 className="NewsCard-text-title">{card.card.title}</h3>
                <div className="NewsCard-text-container">
                    <p className="NewsCard-text-text">{card.card.description}</p>
                </div>
                <p className="NewsCard-text-tags">{card.card.author}</p>
            </div>
        </article>
    )
}
export default NewsCard;