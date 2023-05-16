import mainHeaderImg from "../../images/main.jpg";
import {useArticles} from '../../contexts/ArticlesContext';
import React, { useEffect, useState } from "react";
import SearchResolts from "../SearchResolts/SearchResolts";
import Preloader from "../Preloader/preloader";

const SearchForm = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [handleSearchClicked, setHandleSearchClicked] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const api = useArticles();
    
    // const filteredArr = data.filter(subArr => Object.values(subArr).some(val => val === searchTerm));
    // let filter = searchResults.length > 3 && showMore === false ? searchResults.slice(0, 3) : searchResults;
    // let filter = "";
    
    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        
    };
   const onClickShowmore = async(event) =>{
       event.preventDefault();
       setShowMore(true);
       setShowMore(false);
   }

    const handleSearch = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const articles = await api.getInitalArticles(searchTerm);
            let filter = articles.articles.length > 3 && showMore === false ? Object.values(articles.articles.slice(0, 3)) : articles.articles;
            setSearchResults(filter);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
        
return(
<>
    <section className="search"
        style={{
            backgroundImage: `url(${mainHeaderImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: `${searchTerm ? "0px 0px" : "48px 0px"}`
        }}>
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__pargrap ">Find the latest news on any topic and save them in your personal account.</p>
        <form className="search__input" id="search__input-id">
                <input id="search" name="search" onChange={handleInputChange} className="search__input-text" type="text" autoComplete="true" placeholder="Enter topic"  />
            <button onClick={handleSearch} className="search__input-button">Search</button>
        </form>
        </section>
        
       {isLoading?<Preloader/>:<SearchResolts
         showMore={showMore}
          onClickShowmore={onClickShowmore}
            searchResults={Object.values(searchResults)}
            handleSearchClicked={handleSearchClicked}
            searchTerm={searchTerm}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
           />}
    </>
)
}
export default SearchForm;
