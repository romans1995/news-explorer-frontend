import trashIcon from '../../images/trash.svg'
import saveIcon from '../../images/save.svg'
import { useAuth } from '../../contexts/AuthContext';
const NewsCard = ({card}) => {
    const {  loggedIn } = useAuth();
return(
    <article className="NewsCard">
        <div className="NewsCard-img" 
         style={{backgroundImage: `url(${card.image})`}}
        >
            <div className="NewsCard-img-container">
                <button className="NewsCard-img-tagBtn">{card.keyword}</button>
                {loggedIn ? <button className="NewsCard-img-icon NewsCard-img-delete"><img src={trashIcon} alt="Remove from saved" /></button> : <button className=" NewsCard-img-icon NewsCard-img-save"><img src={saveIcon} alt="sace" /></button>}
            </div>
            
            </div> 
        <div className="NewsCard-text">
            <p className="NewsCard-text-date">{card.date}</p>
            <h3 className="NewsCard-text-title">{card.title}</h3>
            <div className="NewsCard-text-container">
                <p className="NewsCard-text-text">{card.text}</p>
            </div>
            <p className="NewsCard-text-tags">{card.source}</p>
            </div> 
    </article>
)
}
export default NewsCard;