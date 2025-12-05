
import React from 'react';
import { Page, User, UserRole } from '../types';
import { HomeIcon, MapIcon, Edit3Icon, AwardIcon, MessageSquareIcon, ShieldIcon } from './IconComponents';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setPage }) => {
  const navItems = [
    { page: Page.Home, label: 'Home', icon: <HomeIcon /> },
    { page: Page.Map, label: 'Map', icon: <MapIcon /> },
    { page: Page.Audit, label: 'Submit Audit', icon: <Edit3Icon /> },
    { page: Page.Training, label: 'Training', icon: <AwardIcon /> },
    { page: Page.Feedback, label: 'Feedback', icon: <MessageSquareIcon /> },
  ];

  if (user?.role === UserRole.Admin) {
    navItems.push({ page: Page.Admin, label: 'Admin Panel', icon: <ShieldIcon /> });
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => setPage(Page.Home)} className="text-2xl font-bold text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg">
            Smart Accessibility <span className="text-amber-500">Zimbabwe</span>
          </button>
          
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-slate-600 hidden sm:inline">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
