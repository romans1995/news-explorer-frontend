import git from "../../images/Vector.svg";
import facebook from "../../images/facebook.svg";
import {  NavLink } from 'react-router-dom';
import { useHome } from '../../contexts/HomeContext';



const  Footer = () => {
    const { isHome } = useHome();
    
    return (
        <footer className="footer" style={{ backgroundColor: `${isHome ? "#E5E5E5":"#ffff" }`}}>
                <p className="footer__copyrights">
                    {" "}
                    &copy;
                    {new Date().getFullYear()}  Roman Stavinsky
                </p>
            <nav className="footer__wrap">
                <ul className="footer__div">
                    <li className="footer__link footer__button"><a target='_blank' href="https://practicum.com/" rel="noreferrer">Practicum</a></li>
                    <li className="footer__email footer__button"><NavLink to="/" end>
                        Home
                    </NavLink></li>
                </ul>
                <ul className="footer__imgs">
                    <li><a target='_blank' href="https://github.com/romans1995" className="footer__git footer__button" rel="noreferrer"><img src={git} alt="git" /></a></li>
                    <li> <a target='_blank' href="https://www.linkedin.com/in/roman-stavinsky-62b59a177/" className="footer__git footer__button" rel="noreferrer"><img src={facebook} alt="facebook" /></a></li> 
                </ul>
        </nav>
        </footer>
    );
}

export default Footer;