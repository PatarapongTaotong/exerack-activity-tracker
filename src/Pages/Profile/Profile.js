import './Profile.css';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';
import { clearAuth } from '../../Assets/js/Authentication';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const logout = () => {
        clearAuth();
        navigate('/', { replace: true });
    }

    return (
        <>
            <NavBar />
            <MainBoard title="Edit" background="profile">Your profile data</MainBoard>
            <div className="container section">
                <div>
                    <h2 className="section-title">Let edit your profile</h2>
                </div>
                <div className="profile-container">
                    <div className="profile-image">
                        <img src="./Images/avatar.png" alt="Profile" className="profile-picture" />
                        <div className="edit-image">
                            <img src="./Images/pencil.png" alt="pencil icon" className="pencil-icon"/>
                        </div>
                    </div> 
                    <div className="profile-data">
                        <label>Name: </label>
                        <input id="username" name="username" type="text" />
                        <label>Email: </label>
                        <input id="email" name="email" type="text" readOnly />
                        <div className="logout-button">
                            <button className="logout" onClick={logout}>Logout</button>
                        </div>        
                    </div>
                </div>
            </div>
            <QuickLink />
            <Footer>© EXERACK 2022</Footer>
        </>
    );
}

export default Profile;