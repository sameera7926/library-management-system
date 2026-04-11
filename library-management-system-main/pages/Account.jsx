import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../db';
import { Settings, CreditCard, Shield, Bell } from 'lucide-react';

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="account-container">
      
      {/* Profile Header */}
      <section className="account-section profile-section">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-details">
            <h2>{user.name || 'Set your name'}</h2>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
      </section>

      <div className="account-grid">
        {/* Subscriptions */}
        <section className="account-section subscription-section">
          <div className="section-header">
            <CreditCard size={24} className="section-icon" />
            <h3>Your Subscription</h3>
          </div>
          <div className="subscription-card active-tier">
            <div className="tier-info">
              <h4>Free Tier</h4>
              <p>Basic access to library and bookmarks.</p>
            </div>
            <button className="upgrade-btn">Upgrade to Premium</button>
          </div>
        </section>

        {/* Settings */}
        <section className="account-section settings-section">
          <div className="section-header">
            <Settings size={24} className="section-icon" />
            <h3>Settings</h3>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div>
                <h4>Push Notifications</h4>
                <p>Receive alerts for new books.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item">
              <div>
                <h4>Dark Mode</h4>
                <p>Always stay in the dark theme.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked disabled />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="setting-item">
              <div>
                <h4>Privacy</h4>
                <p>Manage your data.</p>
              </div>
              <button className="text-btn">Manage</button>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
