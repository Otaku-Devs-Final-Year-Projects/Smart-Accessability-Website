
import React, { useState } from 'react';
import { Feedback } from '../types';

interface FeedbackPageProps {
  feedbackList: Feedback[];
  onSubmit: (feedback: Omit<Feedback, 'id' | 'submittedBy'>) => void;
}

const StarRating: React.FC<{ rating: number; setRating?: (rating: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={setRating ? () => setRating(star) : undefined}
          onMouseOver={setRating ? () => setRating(star) : undefined}
          className={`text-4xl ${star <= rating ? 'text-amber-400' : 'text-slate-300'} ${setRating ? 'cursor-pointer' : ''}`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const FeedbackPage: React.FC<FeedbackPageProps> = ({ feedbackList, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
    onSubmit({ rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Community Feedback</h1>
      
      {/* Submission Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-slate-700 mb-2">Overall Accessibility Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div>
            <label htmlFor="review" className="block text-lg font-medium text-slate-700">Your Review</label>
            <textarea
              id="review"
              rows={4}
              value={review}
              onChange={e => setReview(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell us about your experience..."
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-8 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Display Reviews */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Recent Reviews</h2>
        <div className="space-y-6">
          {feedbackList.map(fb => (
            <div key={fb.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={fb.rating} />
                <span className="text-sm text-slate-500">by {fb.submittedBy}</span>
              </div>
              <p className="text-slate-700 italic">"{fb.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
