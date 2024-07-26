import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import classes from './SignIn.module.css';
import { useNavigate } from 'react-router-dom'; 

const SignInForm = () => {
  // Define state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation(); 

  // Effect hook to handle parameters passed in URL query string
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    const passwordParam = searchParams.get('password');

    if (emailParam && passwordParam) {
      setEmail(emailParam);
      setPassword(passwordParam);
    }
  }, [location.search]); // Run effect when location.search changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login endpoint with email and password
      const response = await axios.post('https://localhost:7104/api/auth/login', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        // If login is successful, extract token and userId from response data
        const { token, userId } = response.data;
        localStorage.setItem('token', token); // Store token in localStorage
        localStorage.setItem('userId', userId); // Store userId in localStorage for later use
        
        // Include the token in the headers of subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Redirect to HomePage
        navigate('/HomePage');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to sign in. Please try again later.');
    }
  };
  

  return (
    <div className={classes.containerOfSignIn}>
      <h1 className={classes.signInTitle}>Sign In</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
      <FontAwesomeIcon icon={faArrowLeft} className={classes.goToHome} onClick={() => navigate('/')} /> 
        <div className={classes.inputContainer}>
          <FontAwesomeIcon className={classes.iconsInForm} icon={faEnvelope} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.inputContainer}>
          <FontAwesomeIcon className={classes.iconsInForm} icon={faLock} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div><br></br>
        <button className={classes.signinbutton} type="submit">Sign In</button>
      </form>
      <p className={classes.createaccount}>
        Don't have an account? <Link to="/SignUp">Create one.</Link>
      </p>
    </div>
  );
};

export default SignInForm;
