// import { useArticles } from "../../contexts/ArticlesContext";
import NewsCard from "../NewsCard/NewsCard";

const NewsCardList = ({ userArticles }) => {
    return (
        <div className="NewsCardList">
            <div className="NewsCardList__cards">
                {userArticles === [] ? 
                    <p>Sorry, you haven't saved any articles</p>
                    : userArticles.map(card => (
                        <div key={card._id} className="NewsCardList__cards-listItem">
                         <NewsCard card={card} />
                        </div>))
                    }
            </div>
        </div>
    );
};

export default NewsCardList;