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
import S3BucketProvider from '../../Resources/S3BucketProvider';
import Loader from '../../Components/Loader/Loader';

const UserService = new UserProvider();
const S3BucketService = new S3BucketProvider();

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('./Images/avatar.png');
    const [showLoader, setShowLoader] = useState(false);

    const getUser = async () => {
        try {
            setShowLoader(true);

            const { id } = getAuthDecode();
            const { data } = await UserService.getUserById(id);

            setName(data.username);
            setEmail(data.email);
            setProfileImage(data.imgUrl);

            if (data) {
                setShowLoader(false);
            }

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
        e.preventDefault();
        setName(e.target.value);
    }

    const changeName = async () => {
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
    }

    useEffect(() => {
        if (name === '') {
            setTimeout (() => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                changeName();
            }, 3000)
        }
        
        if (name !== '') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            changeName();
        }

    }, [name])

    const navigate = useNavigate();

    const logout = () => {
        clearAuth();
        navigate('/', { replace: true });
    }

    const uploadImage = () => {
        const imgUploadBox = document.getElementById('imgupload');
        imgUploadBox.click();
    }

    const imageUploaded = async (event) => {       
        try {
            event.preventDefault();
            const image = event.target.files[0]; 
            const fileType = image.type.split('/')[1];

            // get url
            const { data: url } = await S3BucketService.getUploadUrl(fileType);

            // post image to bucket
            await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-type": "multipart/form-data"
                },
                body: image
            })

            // get image url from server
            const imgUrl = url.split('?')[0];

            const result = await Swal.fire({
                title: 'Do you want to change your profile image?',
                showDenyButton: true,
                confirmButtonText: 'Change',
                denyButtonText: `Don't change`,
            })

            if (result.isConfirmed) {
                setProfileImage(imgUrl);

                const { id } = getAuthDecode();
                await UserService.updateUserById(id, { imgUrl });
            }  

            if (result.isDenied) {
                const imgUploadBox = document.getElementById('imgupload');
                imgUploadBox.value = null;
            }
          

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: error.message,
            });
        }
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
                        <img alt="Profile" className="profile-picture" src={profileImage} />
                        <div className="edit-image" onClick={uploadImage}>
                            <img src="./Images/pencil.png" alt="pencil icon" className="pencil-icon"/>
                        </div>
                        <input  type="file" 
                                id="imgupload" 
                                style={{display: 'none'}} 
                                accept="image/*"
                                onChange={imageUploaded} />
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
            {showLoader && <Loader />}
        </>
    );
}

export default Profile;