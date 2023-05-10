import { useArticles } from "../../contexts/ArticlesContext";
import NewsCard from "../NewsCard/NewsCard";

const NewsCardList = () => {
    const { data } = useArticles();
    return(
        <div className="NewsCardList">
            <div className="NewsCardList__cards">
                {data.map(card =>(
                    <div key={card._id} className="NewsCardList__cards-listItem">
                        <NewsCard card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsCardList;