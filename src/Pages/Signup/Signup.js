import './Signup.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import UserProvider from '../../Resources/UserProvider';

const UserService = new UserProvider();

const Signup = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
  
    useEffect(() => {
        if(email.length > 0){ 
            setIsInvalid(!validateEmail(email));
        } else {
            setIsInvalid(false);
        }
    },[email]);

    const handleClick = async () => {
        if (email.length === 0) {
            alert('Email shoud not be empty');
            return;
        } else if (password.length === 0) {
            alert('Password shoud not be empty');
            return;
        }

        try {
            const payload = {
                email,
                password
            }

            const { data } = await UserService.createUser(payload);
            setShowLoader(true);
            setTimeout (() => {
                setShowLoader(false);
                navigate('/', { replace: true });
            }, 1000);
        } catch (error) {
            console.log({error});
        }
    }

    return (
        <>
            <div className="signup-container">
                <div className="signup-box">
                    <h1>Sign Up</h1>
                    <h2><em>Exerack</em></h2>
                    <input className={isInvalid ? 'error' : ''} 
                        id='email' type='email' name='email' 
                        placeholder='Enter your email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />
                    {isInvalid && <div className='error-text'>Email is invalid</div>}
                    <input id='password' type='password' name='password' 
                        placeholder='Enter your password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                    <button className='signup-btn' onClick={ isInvalid ? '' : handleClick }>Sign Up</button>    
                </div>
            </div>
            {showLoader && <Loader />}
        </>
    );
}

export default Signup;