import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import NotFound from "../NotFound/NotFound";

function generateUniqueId() {
    return Math.random().toString(36).substr(3, 9);
}
const SearchResolts = (props) =>{
    const idUnq = generateUniqueId();
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
                                <NewsCard card={card} />
                            </div>
                        }) : props.handleSearchClicked && <div className="searchResult__cards-listItem"><NotFound /></div>}
                        {!props.showMore && props.searchResults.length > 2 ? <button onClick={props.onClickShowmore} className="NewsCardList__button">Show more</button> : ""}
                    </div> </div>}

        </section>
    );
}
export default SearchResolts;