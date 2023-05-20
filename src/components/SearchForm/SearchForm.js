import mainHeaderImg from "../../images/main.jpg";
import { useArticles } from '../../contexts/ArticlesContext';
import React, {  useState,useRef } from "react";
import SearchResolts from "../SearchResolts/SearchResolts";
import Preloader from "../Preloader/preloader";

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [handleSearchClicked] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [allResolts, setAllResolts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(3);
    const api = useArticles();
    const inputRef = useRef(null);
    let filter = "";

    
    const onClickShowmore = async (event) => {
        event.preventDefault();
        setShowMore(true);
        filter = allResolts.articles.length > 3 && showMore === false ? Object.values(allResolts.articles.slice(0, counter + 3)) : allResolts.articles;
        setSearchResults(filter);
        setCounter(counter + 3);
        setShowMore(false);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        const inputValue = inputRef.current && inputRef.current.value;
        setSearchTerm(inputValue)
        setCounter(3);
        setIsLoading(true)
        try {
            const articles = await api.api.getInitalArticles(inputValue);
            setAllResolts(articles);
            filter = articles.articles.length > 3 && showMore === false ? Object.values(articles.articles.slice(0, counter)) : articles.articles;
            setSearchResults(filter);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="search"
                style={{
                    backgroundImage: `url(${mainHeaderImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: `${handleSearchClicked ? "0px 0px" : "48px 0px"}`
                }}>
                <h1 className="search__title">What's going on in the world?</h1>
                <p className="search__pargrap ">Find the latest news on any topic and save them in your personal account.</p>
                <form className="search__input" id="search__input-id">
                    <input id="search" ref={inputRef} name="search" className="search__input-text" type="text" autoComplete="true" placeholder="Enter topic" />
                    <button onClick={handleSearch} className="search__input-button">Search</button>
                </form>
            </section>

            {isLoading ? <Preloader /> : <SearchResolts
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
