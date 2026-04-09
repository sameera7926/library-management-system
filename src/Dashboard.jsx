import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, BookOpen, Clock, Headphones, ShoppingCart, User, Search } from 'lucide-react';
import { getCurrentUser, logoutUser } from './db';
import logoUrl from './assets/logo.jpeg';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout dashboard-entrance dashboard-bg">
      <div className="dashboard-overlay"></div>
      
      <div className="main-content">
        {/* Top Header with Search */}
        <header className="topbar">
          <div className="topbar-search-container">
            <h2>Choose your book</h2>
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input type="text" placeholder="Search your book..." className="search-input" />
            </div>
          </div>
          
          <div className="user-profile-badge">
            <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
            <span>{user.name || 'User'}</span>
            <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="content-scroll-area pb-spacing">
          <Outlet />
        </main>

        {/* Bottom Task Bar Navigation */}
        <nav className="bottom-task-bar">
           <img src={logoUrl} alt="Readx" className="task-bar-logo" />
           
           <div className="task-nav-links">
             <Link to="/dashboard" className={`task-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
               <BookOpen size={24} />
               <span>Books</span>
             </Link>
             
             {/* Mock placeholder routes just redirecting safely for now */}
             <div className="task-link disabled">
               <Clock size={24} />
               <span>Tracking</span>
             </div>
             
             <div className="task-link disabled">
               <Headphones size={24} />
               <span>Listening</span>
             </div>

             <div className="task-link disabled">
               <ShoppingCart size={24} />
               <span>Cart</span>
             </div>

             <Link to="/dashboard/account" className={`task-link ${location.pathname === '/dashboard/account' ? 'active' : ''}`}>
               <User size={24} />
               <span>Profile</span>
             </Link>
           </div>
        </nav>
      </div>
    </div>
  );
}
