import './Profile.css';
import { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import MainBoard from '../../Components/MainBoard/MainBoard';
import Footer from '../../Components/Footer/Footer';
import QuickLink from '../../Components/QuickLink/QuickLink';
import { clearAuth } from '../../Assets/js/Authentication';
import { useNavigate } from 'react-router-dom';
import { getAuthDecode } from '../../Assets/js/Authentication';
import UserProvider from '../../Resources/UserProvider';
import Swal from 'sweetalert2';

const UserService = new UserProvider();

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const getUser = async () => {
        try {
            const { id } = getAuthDecode();
            const { data } = await UserService.getUserById(id);
            setName(data.username);
            setEmail(data.email);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }  
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleChange = async (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const { id } = getAuthDecode();
    
                const payload = {
                    username: name
                }
    
                await UserService.updateUserById(id, payload);
    
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something wrong',
                    text: error.message,
                });
            } 
        })();    
    }, [name])

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
                        <input id="username" name="username" type="text" value={name} onChange={handleChange} />
                        <label>Email: </label>
                        <input id="email" name="email" type="text" value={email} readOnly />
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