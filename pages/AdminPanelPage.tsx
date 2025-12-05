
import React, { useState } from 'react';
import { Audit, Feedback, User, UserRole } from '../types';

interface AdminPanelPageProps {
  audits: Audit[];
  feedback: Feedback[];
  users: User[];
}

type AdminTab = 'audits' | 'feedback' | 'users';

const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ audits, feedback, users }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('audits');

  const renderContent = () => {
    switch (activeTab) {
      case 'audits':
        return (
          <div className="space-y-4">
            {audits.map(audit => (
              <div key={audit.id} className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg">{audit.facilityName} ({audit.facilityType})</h3>
                <p className="text-sm text-slate-500">Submitted by: {audit.submittedBy}</p>
                <p className="mt-2">{audit.comments}</p>
                <div className="mt-2 text-sm">
                  <strong>Features:</strong>
                  <ul className="list-disc list-inside">
                    {Object.entries(audit.features).map(([key, value]) => value && <li key={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      case 'feedback':
        return (
          <div className="space-y-4">
            {feedback.map(fb => (
              <div key={fb.id} className="bg-slate-50 p-4 rounded-lg border">
                 <p className="text-amber-500 font-bold">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</p>
                 <p className="italic my-2">"{fb.review}"</p>
                 <p className="text-sm text-slate-500 text-right">- {fb.submittedBy}</p>
              </div>
            ))}
          </div>
        );
      case 'users':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: AdminTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 font-semibold rounded-t-lg ${
        activeTab === tab 
          ? 'bg-white border-b-0 border-t-2 border-x-2 border-t-teal-500' 
          : 'bg-slate-100 text-slate-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
      <div className="flex border-b-2">
        <TabButton tab="audits" label={`Audits (${audits.length})`} />
        <TabButton tab="feedback" label={`Feedback (${feedback.length})`} />
        <TabButton tab="users" label={`Users (${users.length})`} />
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-lg border-x-2 border-b-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanelPage;
