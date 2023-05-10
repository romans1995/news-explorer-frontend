import trashIcon from '../../images/trash.svg'
const NewsCard = ({card}) => {
  
return(
    <article className="NewsCard">
        <div className="NewsCard-img" 
         style={{backgroundImage: `url(${card.image})`}}
        >
            <div className="NewsCard-img-container">
                <button className="NewsCard-img-tagBtn">{card.keyword}</button>
                <button className="NewsCard-img-delete"><img src={trashIcon} alt="Remove from saved" /></button>
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