import './Login.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <h2><em>Exerack</em></h2>
                <input className={isInvalid ? 'error' : ''} 
                    id='email' type='text' name='email' 
                    placeholder='Enter your email' 
                    value={email} 
                    isInvalid={isInvalid}
                    onChange={e => setEmail(e.target.value)} />
                {isInvalid && <div className='error-text'>Email is invalid</div>}
                <input id='password' type='text' name='password' 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} />
                <button className='login-btn'>Login</button>
                <div className='separator'>or</div>
                <div className='no-account'>
                    Don’t have an account? 
                    <span>
                        <Link to='./signup' className='signup'>{' Sign Up'}</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;