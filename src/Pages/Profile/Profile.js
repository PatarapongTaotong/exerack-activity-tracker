import './Profile.css';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import Footer from '../../Components/Footer/Footer';

const Profile = () => {
    return (
        <>
            <NavBar />
            <MainBoard title="Edit" background="profile">Your profile data</MainBoard>
            <div className="profile-container">
                <div className="profile-image">
                    <img src="./Images/avatar.png" alt="Profile image" className="profile-picture" />
                </div>
                <div className="edit-image">
                        <button className="edit-profile-image">Edit profile image</button>
                </div> 
                <div className="profile-data">
                    <label id="userName">Username: </label>
                    <input id="userName" name="userName" type="text" />
                    <label id="email">Email: </label>
                    <input id="email" name="email" type="text" />
                    <div className="logout-button">
                        <button className="logout">Logout</button>
                    </div>        
                </div>
            </div>
            <Footer>© EXERACK 2022</Footer>
        </>
    );
}

export default Profile;