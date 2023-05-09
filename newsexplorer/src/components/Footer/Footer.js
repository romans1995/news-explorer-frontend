import git from "../../images/Vector.svg";
import facebook from "../../images/facebook.svg";
const  Footer = () => {
    // const location = useLocation();
    return (
        <footer className="Footer">
            
                <p className="footer__copyrights">
                    {" "}
                    &copy;
                    {new Date().getFullYear()}  Roman Stavinsky
                </p>
            <div className="Footer_wrap">
                <div className="Footer__div">
                    <p className="Footer__link Footer__button">Practicum</p>
                    <p className="Footer__email Footer__button">Home</p>
                </div>
                <div className="Footer__social">
                    <a href="https://github.com/romans1995" className="Footer__git Footer__button"><img src={git} alt="git" /></a>
                    <a href="https://www.linkedin.com/in/roman-stavinsky-62b59a177/" className="Footer__git Footer__button"><img src={facebook} alt="facebook" /></a>
                </div>
        </div>
        </footer>
    );
}

export default Footer;