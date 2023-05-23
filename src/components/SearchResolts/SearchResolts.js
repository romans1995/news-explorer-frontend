import React,{useEffect,useState} from "react";
import NewsCard from "../NewsCard/NewsCard";
import NotFound from "../NotFound/NotFound";
import { useHome } from '../../contexts/HomeContext';
import { useArticles } from '../../contexts/ArticlesContext';

function generateUniqueId() {
    return Math.random().toString(36).substr(3, 9);
}
const SearchResolts = (props) =>{
    const idUnq = generateUniqueId();
    const { isHome } = useHome();
    const [allSavedArticles, setAllSavedArticles] = useState([]);
    const api = useArticles();
    const savedArticlesSet = new Set(allSavedArticles?.data?.map(element => element.link));

    
    // const unSaveArticleFunc = async () => {
    //     try {
    //         await props.searchResults.map(card =>{
    //             if (savedArticlesSet.has(card.url)) {
    //                 const deletePromises =  allSavedArticles.data
    //                     .filter(element => element.link === card.url)
    //                     .map(element => api.deleteArticle(element._id));

    //                  Promise.all(deletePromises);
    //                 savedArticlesSet.delete(url);
    //                 setArticleSaved(false);
    //             }
    //         })

            
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const debouncedUnSaveArticleFunc = debounce(unSaveArticleFunc, 500);


    useEffect(() => {
        if (isHome) {
            const fetchSavedArticles = async () => {
                try {
                    const articles = await api.getSavedArticles(localStorage.getItem('token'));
                    setAllSavedArticles(articles);
                } catch (error) {
                    console.log(error);
                    // Handle the error, e.g., show an error message or set a default value for allSavedArticles
                }
            };

            fetchSavedArticles();

            
        }
    }, []);
    return(
       <section className="searchResults">
            {props.searchTerm.length === 0 ?
                <div className="searchResults__div" style={{ display: "none" }}></div>
                :
                <div className="searchResults__div">
                    {<h3 className="searchResult-title">Search results</h3>}
                    <div className="searchResult__container">
                        {props.searchResults.length !== 0 ? props.searchResults.map((card,key) => {
                            return <div id={key + idUnq} key={key + idUnq} className="searchResult__cards-listItem">
                                <NewsCard savedArticlesSet={savedArticlesSet} searchTerm={props.searchTerm} card={card} allSavedArticles={allSavedArticles} setAllSavedArticles={setAllSavedArticles} />
                            </div>
                        }) : props.handleSearchClicked && <div className="searchResult__cards-listItem"><NotFound /></div>}
                        {!props.showMore && props.searchResults.length > 2 ? <button onClick={props.onClickShowmore} className="NewsCardList__button">Show more</button> : ""}
                    </div> </div>}

        </section>
    );
}
export default SearchResolts;