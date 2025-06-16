import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? 'signin' : 'signup';
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1 className="auth-title">{isLogin ? 'Authorization' : 'Sign Up'}</h1>
        
        <div className="form-group floating-label">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        
        <div className="form-group floating-label">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="auth-input"
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        
        <button type="submit" className="auth-button">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
        
        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </p>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AuthForm;