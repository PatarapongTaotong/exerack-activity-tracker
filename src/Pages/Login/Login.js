import './Login.css';
import { useState, useEffect } from 'react';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setAuthUser, getAuth } from '../../Assets/js/Authentication';
import AuthProvider from '../../Resources/AuthProvider';
import Swal from 'sweetalert2';

const AuthService = new AuthProvider();

const Login = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    useEffect(() => {
        if (getAuth()) {
            navigate('/home', { replace: true });
        }
    })
    
  
    useEffect(() => {
        if(email.length > 0){ 
            setIsInvalid(!validateEmail(email));
        } else {
            setIsInvalid(false);
        }
    },[email]);
    
    const handleClick = async () => {
        if (email.length === 0) {
            return Swal.fire('Please enter your email');
        } else if (password.length === 0) {
            return Swal.fire('Please enter your password');
        }

        try {
            const payload = {
                email,
                password
            }

            const { data } = await AuthService.login(payload);
            const token = setAuthUser(data);
            console.log(token);
            navigate('/home', { replace: true });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Cannot log in',
                text: error.message,
            });
        }
    }

    return (
        <>
            <div className="login-container">
                <RegisterForm>
                    <h1>Login</h1>
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
                    <button className='login-btn' onClick={ isInvalid ? null : handleClick }>Login</button>
                    <div className='separator'>or</div>
                    <div className='no-account'>
                        Don’t have an account? 
                        <span>
                            <Link to='./signup' className='signup'>{' Sign Up'}</Link>
                        </span>
                    </div>
                </RegisterForm>
            </div>
        </>
    );
}

export default Login;