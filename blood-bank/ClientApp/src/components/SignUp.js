import React, { useState } from 'react';
import axios from 'axios';
import classes from './SignIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !phoneNumber) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post("https://localhost:7104/api/newuser", {
        name: userName,
        email: email,
        password: password,
        phone_number: phoneNumber,
      });
      if (response.status === 200) {
        // Handle successful sign up
        console.log('User signed up successfully');
        alert('Sign up successful!');
        navigate(`/SignIn?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className={classes.containerOfSignIn}>
      <h1 className={classes.signInTitle}>Sign Up</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faArrowLeft} className={classes.goToHome} onClick={() => navigate('/')} /> 
        <div className={classes.inputContainer}>
          <FontAwesomeIcon className={classes.iconsInForm} icon={faUser} />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
        </div>
        <div className={classes.inputContainer}>
          <FontAwesomeIcon className={classes.iconsInForm} icon={faPhone} />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div><br></br>
        <button className={classes.signinbutton} type="submit">Sign Up</button>
      </form>
      <p className={classes.createaccount}>Already have an account? <Link to="/SignIn">Sign In</Link></p>
    </div>
  );
};

export default SignUp;
