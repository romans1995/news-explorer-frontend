import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    
    const [user, setUser] = useState({
        email: 'roman123@gmail.com',
        firstName: 'Roman',
        userName: 'Stavinsky',
    });
    const history = useNavigate();
    const handleLogout = () => {
        setLoggedIn(false);
        setUser({});
        history('/');
    };

    return (
        <AuthContext.Provider
            value={{ loggedIn, setLoggedIn, user, setUser, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export { useAuth };
