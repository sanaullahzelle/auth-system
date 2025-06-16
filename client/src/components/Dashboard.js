import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p className="dashboard-subtitle">Manage your account and settings</p>
        </div>
        
        <div className="dashboard-content">
          <div className="metric-card">
            <h3>Recent Activity</h3>
            <p>Last login: {new Date().toLocaleString()}</p>
          </div>
          
          <div className="metric-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="secondary-button">Profile</button>
              <button className="secondary-button">Settings</button>
            </div>
          </div>
        </div>
        
        <button onClick={handleLogout} className="logout-button">
          Sign Out
          <span className="icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;