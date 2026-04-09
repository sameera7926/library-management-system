import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Heart, Bookmark, User, LogOut } from 'lucide-react';
import { getCurrentUser, logoutUser } from './db';
import logoUrl from './assets/logo.jpeg';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (!activeUser) {
      navigate('/');
    } else {
      setUser(activeUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // Generate dynamic title based on location
  const getPageTitle = () => {
    const path = location.pathname.replace('/dashboard', '');
    if (path.includes('favorites')) return 'Favorites';
    if (path.includes('bookmarks')) return 'Bookmarks';
    if (path.includes('account')) return 'Account & Settings';
    return 'Library';
  };

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logoUrl} alt="Readx Logo" className="sidebar-logo" />
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <BookOpen size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard/favorites" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Heart size={20} />
            <span>Favorites</span>
          </NavLink>
          <NavLink to="/dashboard/bookmarks" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Bookmark size={20} />
            <span>Bookmarks</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/dashboard/account" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <User size={20} />
            <span>Account</span>
          </NavLink>
          <button className="nav-link logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="topbar">
          <h2>{getPageTitle()}</h2>
          <div className="user-profile-badge">
            <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
            <span>{user.name || user.email.split('@')[0]}</span>
          </div>
        </header>

        <main className="content-scroll-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
