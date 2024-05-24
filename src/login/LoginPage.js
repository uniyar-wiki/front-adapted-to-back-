// LoginPage.js
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import { API_URL } from '../globalVariables';
import './LoginPage.css';

const LoginPage = () => {
    const vantaRef = useRef(null);
  useEffect(() => {
    let vantaEffect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      skyColor: 0x0000,
      cloudColor: 0xbbbbbb,
      cloudShadowColor: 0xb1b1b1,
      sunColor: 0xff9900,
      sunGlareColor: 0xff9900,
      sunlightColor: 0xff9900
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@uniyar.ac.ru$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(!validateEmail(emailValue));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await fetch(API_URL+'Auth/login', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Logged in with:', email,password);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorDetails}`);
      }
  
      const data = await response.json();
      console.log('Logged in with:', data);
      localStorage.setItem('token', data.token);
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
    window.location.replace('/profile');
  };


  return (
    <div className="login-container" ref={vantaRef}>
        
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">НУ ПРИВЕТ, АНОН</h2>
        <div className="input-container">
          <input
            type="email"
            className={`login-input ${emailError ? 'error' : ''}`}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <div className="error-message">Email must be i.ivanov@uniyar.ac.ru</div>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="login-button"
          disabled={!email || !password || emailError}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
