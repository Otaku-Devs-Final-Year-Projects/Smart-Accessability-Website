
import React from 'react';
import { Page } from '../types';
import { MapIcon, Edit3Icon, AwardIcon, MessageSquareIcon } from '../components/IconComponents';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {

  const actionButtons = [
    { page: Page.Map, label: 'Accessible Places Map', icon: <MapIcon />, color: 'bg-teal-600 hover:bg-teal-700' },
    { page: Page.Audit, label: 'Submit Facility Audit', icon: <Edit3Icon />, color: 'bg-amber-500 hover:bg-amber-600' },
    { page: Page.Training, label: 'Training Portal', icon: <AwardIcon />, color: 'bg-blue-600 hover:bg-blue-700' },
    { page: Page.Feedback, label: 'Community Feedback', icon: <MessageSquareIcon />, color: 'bg-indigo-600 hover:bg-indigo-700' },
  ];

  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="bg-cover bg-center rounded-lg shadow-xl py-24 px-4" style={{ backgroundImage: `url('https://picsum.photos/1200/400?grayscale&blur=2')` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Welcome to <span className="text-teal-400">Accessible</span> Zimbabwe
          </h1>
          <p className="mt-4 text-xl text-slate-200 max-w-3xl mx-auto">
            Your guide to inclusive and accessible tourism in the heart of Africa. Explore with confidence.
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {actionButtons.map(btn => (
            <button
              key={btn.page}
              onClick={() => setPage(btn.page)}
              className={`${btn.color} text-white font-bold py-12 px-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-opacity-75 focus:ring-${btn.color.split('-')[1]}-500`}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 mb-4">{React.cloneElement(btn.icon, { className: 'w-16 h-16' })}</div>
                <span className="text-2xl">{btn.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white p-12 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Mission</h2>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
          To champion a barrier-free tourism experience in Zimbabwe for everyone. We aim to empower tourists with reliable information, assist operators in enhancing their facilities, and build a community dedicated to universal accessibility.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
