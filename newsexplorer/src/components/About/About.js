import meImg from "../../images/me.jpg";
const About = () =>{

    return(
        <section className="about">
            <img className="about__image" src={meImg} alt="Roman in amsterdam" />
            <div className="about__text">
                <h2 className = "about__title">About the author</h2>
                <p>Hey there 🖐</p>
                <p>My name is Roman and I'm a Full stack developer </p>
                <p>with 1 year of expirince in web developing</p>
                <p>I love to code , sport , create and travel</p>
            </div>
        </section>
    );
}
export default About;