import mainHeaderImg from "../../images/main.jpg";
import {data} from "../../data";
import React, { useEffect, useState } from "react";
import SearchResolts from "../SearchResolts/SearchResolts";
import Preloader from "../Preloader/preloader";

const SearchForm = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [handleSearchClicked, setHandleSearchClicked] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    // filteredArr is all the result 
    const filteredArr = data.filter(subArr => Object.values(subArr).some(val => val === searchTerm));
    let filter = "";
    
    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
        
    };
   const onClickShowmore = (event) =>{
       event.preventDefault();
       setShowMore(true);
       filter = filteredArr;
       setSearchResults(filter)
   }
    const handleSearch = (event) =>{
       event.preventDefault();
        filter = filteredArr.length > 3 && showMore === false ? filteredArr.slice(0, 3) : filteredArr;
        setHandleSearchClicked(true);
       setSearchResults(filter);
        setIsLoading(true);

   }
    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setTimeout(() => setIsLoading(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);
       
return(
<>
    <section className="search"
        style={{
            backgroundImage: `url(${mainHeaderImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: `${searchTerm ? "0px 0px" : "48px 0px"}`
        }
        }>
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search_pargrap ">Find the latest news on any topic and save them in your personal account.</p>
        <form className="search__input">
            <input id="search" name="search" onChange={handleInputChange} className="search__input-text" type="text" autoComplete="true" />
            <button onClick={handleSearch} className="search__input-button">Search</button>
        </form>
        </section>
        
        {isLoading ? <Preloader /> :<SearchResolts
         showMore={showMore}
          onClickShowmore={onClickShowmore}
           searchResults={searchResults}
            handleSearchClicked={handleSearchClicked}
            filteredArr={filteredArr}
            searchTerm={searchTerm}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
           />}
    
    </>
)
}
export default SearchForm;
