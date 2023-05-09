import { useAuth } from '../../contexts/AuthContext';
const SavedNews = () => {
    const { loggedIn, user, handleLogout } = useAuth();
    return(
        <div className="savedNews">
            <p className="savedNews__P">saved articles</p>
            <h2>{user.firstName},you have 5 saved articles</h2>
            <p>By keywords: <strong>Nature, Yellowstone, and 2 other</strong></p>
        </div>
    );
}

export default SavedNews;