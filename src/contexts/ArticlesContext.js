import {api} from '../utils/NewsApi';
import { saveArticle, deleteArticle, getSavedArticles } from '../utils/MainApi';
const { createContext, useContext } = require('react');


const ArticlesContext = createContext();

// data

//provider
const ArticlesContextProvider = ({ children }) => {
    return (
        <ArticlesContext.Provider value={{ api, saveArticle, deleteArticle, getSavedArticles }}>
            {children}
        </ArticlesContext.Provider>
    );
};

export default ArticlesContextProvider;

//make a custom hook for accessing the context
export const useArticles = () => {
    const  api  = useContext(ArticlesContext);

    return api ;
};