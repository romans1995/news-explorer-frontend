import React from "react";
import Header from '../Header/Header';

import Main from '../Main/Main';
import Footer from "../Footer/Footer";
import Popups from "../Popups/Popups";
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from "../SavedNews/SavedNews";
// import { useAuth } from '../../contexts/AuthContext';

// css 
import "../Header/Header.css";
import "../Main/Main.css";
import "../About/About.css";
import "../Footer/Footer.css";
import "../Navigation/Nav.css";
import "../Signin/Signin.css";
import "../PopupWithForm/PopupWithForm.css";
import "../SavedNews/SavedNews.css";
import"../NewsCard/NewsCard.css";
import"../NewsCardList/NewsCardList.css";
import"../SuccessPopup/SuccessPopup.css";
import"../SearchForm/SearchForm.css";
import '../NotFound/NotFound.css';

// import "../Preloader/preloader.css";


function App() {
 
  return (
    <div className= "app" >
    <Header
    />
      <Routes>
        <Route path="/saved-news" element={<ProtectedRoute><SavedNews /></ProtectedRoute>} /> 
        <Route exact path="*" element={<Main />}/>
        < Route path="*" element= { <Navigate replace to="/"/> } />
      </Routes>
      <Footer/>
      <Popups
      /> 
    </div>

  );
}
export default App;