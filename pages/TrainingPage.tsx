
import React, { useState } from 'react';
import { AwardIcon } from '../components/IconComponents';

const TrainingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const modules = [
    { title: 'Introduction to Disability Awareness', description: 'Understand the core principles of inclusive hospitality.' },
    { title: 'Physical Accessibility Standards', description: 'Learn about structural requirements like ramps and accessible restrooms.' },
    { title: 'Inclusive Customer Service', description: 'Training on communication and assistance for guests with diverse needs.' },
  ];

  const handleCardClick = () => {
    setShowModal(true);
  };
  
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Accessibility Training Portal</h1>
      <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
        Empower your team with the knowledge to provide exceptional service to all guests. Our upcoming modules are designed by experts in accessibility and hospitality.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {modules.map((module, index) => (
          <div key={index} onClick={handleCardClick} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500 cursor-pointer transform hover:-translate-y-2 transition-transform">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{module.title}</h3>
            <p className="text-slate-600">{module.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg inline-flex items-center space-x-4">
        <AwardIcon />
        <div>
            <h3 className="text-2xl font-bold">Earn Your Certification</h3>
            <p className="text-slate-600">Complete all modules to receive the Smart Accessibility Zimbabwe certification badge.</p>
        </div>
        <img src="https://picsum.photos/100/100?random=cert" alt="Dummy certification badge" className="rounded-full" />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Coming Soon!</h2>
            <p className="text-slate-600 mb-6">This training module is currently under development. Please check back later.</p>
            <button
              onClick={() => setShowModal(false)}
              className="py-2 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
