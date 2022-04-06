import './Profile.css';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';

const Profile = () => {
    return (
        <>
            <NavBar />
            <MainBoard title="Edit" background="profile">Your profile data</MainBoard>
        </>
    );
}

export default Profile;