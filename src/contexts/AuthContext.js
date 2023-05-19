import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTocken } from '../utils/MainApi'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        userName: '',
        id:""
    });
    const history = useNavigate();
   
    
    const handleLogout = () => {
        setLoggedIn(false);
        setUser({});
        localStorage.clear();
        history('/');
    };
    useEffect(() => {
        if (token) {
            checkTocken(token).then(res => {
                if (res._id) {
                    setLoggedIn(true);
                    setUser({email:res.email,firstName:res.name,id:res._id})
                    
                }
            }).catch((err) => {
                console.log(err);
                history('/');
                setLoggedIn(false);
            })
        }
    }, [history, token])
    return (<AuthContext.Provider value={{ loggedIn, setLoggedIn, setToken, user, handleLogout, token }}>
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