import meImg from "../../images/me.jpg";
const About = () =>{

    return(
        <div className="about">
            <img className="about_image" src={meImg} alt="Roman is amsterdam" />
            <div className="about__text">
                <h1 className = "about__title">About the author</h1>
                <p>Hey there 🖐</p>
                <p>My name is Roman and I'm a Full stack developer </p>
                <p>with 1 year of expirince in web developing</p>
                <p>I love to code , sport , create and travel</p>
            </div>
        </div>
    );
}
export default About;