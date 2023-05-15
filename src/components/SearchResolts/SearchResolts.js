import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import NotFound from "../NotFound/NotFound";
const SearchResolts = (props) =>{

    return(
       <section className="searchResults">
            {props.searchTerm.length === 0 ?
                <div className="searchResults__div" style={{ display: "none" }}></div>
                :
                <div className="searchResults__div">
                    {<h3 className="searchResult-title">Search results</h3>}
                    <div className="searchResult__container">
                        { props.searchResults.length !== 0 ? props.searchResults.map(card => {
                            return <div key={card._id} className="searchResult__cards-listItem">
                                <NewsCard card={card} />
                            </div>
                        }) : (props.handleSearchClicked && <div className="searchResult__cards-listItem"><NotFound /></div>)}
                        {!props.showMore && props.filteredArr.length > 3 && props.searchResults.length !== 0 ? <button onClick={props.onClickShowmore} className="NewsCardList__button">Show more</button> : ""}
                    </div> </div>}

        </section>
    );
}
export default SearchResolts;