import git from "../../images/Vector.svg";
import facebook from "../../images/facebook.svg";
import {  NavLink } from 'react-router-dom';
const  Footer = () => {
   
    return (
        <footer className="footer">
            
                <p className="footer__copyrights">
                    {" "}
                    &copy;
                    {new Date().getFullYear()}  Roman Stavinsky
                </p>
            <div className="footer_wrap">
                <div className="footer__div">
                    <p className="footer__link footer__button"><a href="https://practicum.com/">Practicum</a></p>
                    <p className="footer__email footer__button"><NavLink to="/" end>
                        Home
                    </NavLink></p>
                </div>
                <div className="footer__imgs">
                    <a href="https://github.com/romans1995" className="footer__git footer__button"><img src={git} alt="git" /></a>
                    <a href="https://www.linkedin.com/in/roman-stavinsky-62b59a177/" className="footer__git footer__button"><img src={facebook} alt="facebook" /></a>
                </div>
        </div>
        </footer>
    );
}

export default Footer;