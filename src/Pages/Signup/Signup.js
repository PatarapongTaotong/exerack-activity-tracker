import './Signup.css';
import { useState, useEffect } from 'react';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import UserProvider from '../../Resources/UserProvider';

const UserService = new UserProvider();

const Signup = () => {
    const [username, setUsername] = useState('');
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
        if (username.length === 0) {
            return alert('Please enter your name');
        }  
        
        if (email.length === 0) {
            return alert('Email shoud not be empty');
        }  
        
        if (password.length === 0) {
            return alert('Password shoud not be empty');
        }

        try {
            const payload = {
                email,
                password,
                username
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
                <RegisterForm>
                    <h1>Sign Up</h1>
                    <h2><em>Exerack</em></h2>
                    <input id='name' type='text' name='name' placeholder='Enter your name'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
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
                </RegisterForm>
            </div>
            {showLoader && <Loader />}
        </>
    );
}

export default Signup;