import mainHeaderImg from "../../images/main.jpg";
const SearchForm = () =>{
return(

    <div className="main_img"
        style={{
            backgroundImage: `url(${mainHeaderImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
        <h1 className="main_title">What's going on in the world?</h1>
        <p className="main_p">Find the latest news on any topic and save them in your personal account.</p>
        <div className="main__search">
            <input className="main__Search-input" type="text" />
            <button className="main__Search-button">Search</button>
        </div>
    </div>
)
}
export default SearchForm;