
import React, { useState, useCallback } from 'react';
import { Page, User, UserRole, Facility, Audit, Feedback } from './types';
import { DUMMY_USERS, DUMMY_FACILITIES, DUMMY_FEEDBACK, DUMMY_AUDITS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import AuditFormPage from './pages/AuditFormPage';
import TrainingPage from './pages/TrainingPage';
import FeedbackPage from './pages/FeedbackPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Home);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const [users, setUsers] = useLocalStorage<User[]>('users', DUMMY_USERS);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  
  const [facilities, setFacilities] = useLocalStorage<Facility[]>('facilities', DUMMY_FACILITIES);
  const [audits, setAudits] = useLocalStorage<Audit[]>('audits', DUMMY_AUDITS);
  const [feedback, setFeedback] = useLocalStorage<Feedback[]>('feedback', DUMMY_FEEDBACK);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setPage(Page.Home);
  }, [setCurrentUser]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setPage(Page.Home);
  }, [setCurrentUser]);

  const handleSignup = useCallback((newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: `user-${Date.now()}` };
    setUsers(prev => [...prev, userWithId]);
    setCurrentUser(userWithId);
    setIsSigningUp(false);
    setPage(Page.Home);
  }, [setUsers, setCurrentUser]);

  const addAudit = useCallback((newAudit: Omit<Audit, 'id' | 'submittedBy'>) => {
    if (!currentUser) return;
    const auditWithId = { ...newAudit, id: `audit-${Date.now()}`, submittedBy: currentUser.email };
    setAudits(prev => [auditWithId, ...prev]);
    alert('Audit submitted successfully for review!');
    setPage(Page.Home);
  }, [currentUser, setAudits]);
  
  const addFeedback = useCallback((newFeedback: Omit<Feedback, 'id' | 'submittedBy'>) => {
    if (!currentUser) return;
    const feedbackWithId = { ...newFeedback, id: `feedback-${Date.now()}`, submittedBy: currentUser.email };
    setFeedback(prev => [feedbackWithId, ...prev]);
    alert('Thank you for your feedback!');
    setPage(Page.Home);
  }, [currentUser, setFeedback]);

  const renderPage = () => {
    switch (page) {
      case Page.Map:
        return <MapPage facilities={facilities} />;
      case Page.Audit:
        return <AuditFormPage onSubmit={addAudit} />;
      case Page.Training:
        return <TrainingPage />;
      case Page.Feedback:
        return <FeedbackPage feedbackList={feedback} onSubmit={addFeedback} />;
      case Page.Admin:
        return currentUser?.role === UserRole.Admin 
          ? <AdminPanelPage audits={audits} feedback={feedback} users={users} />
          : <HomePage setPage={setPage} />;
      case Page.Home:
      default:
        return <HomePage setPage={setPage} />;
    }
  };
  
  if (!currentUser) {
    if(isSigningUp) {
      return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setIsSigningUp(false)} />;
    }
    return <LoginPage users={users} onLogin={handleLogin} onSwitchToSignup={() => setIsSigningUp(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header user={currentUser} onLogout={handleLogout} setPage={setPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <footer className="bg-slate-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Smart Accessibility Zimbabwe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
