import React, { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const HomeContext = React.createContext();
export const HomeControler = ({ children }) => {
    const [isHome, setIsHome] = useState(true);
    const location = useLocation();
    useEffect(() => {
        location.pathname !== '/' ? setIsHome(false) : setIsHome(true);
    }, [location, isHome]);
    return (
        <HomeContext.Provider value={{ isHome, setIsHome, location }}>
            {children}
        </HomeContext.Provider>
    );
}
export const useHome = () => useContext(HomeContext);