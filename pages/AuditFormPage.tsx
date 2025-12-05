
import React, { useState } from 'react';
import { Audit, FacilityType, AccessibilityFeatures } from '../types';

interface AuditFormPageProps {
  onSubmit: (audit: Omit<Audit, 'id' | 'submittedBy'>) => void;
}

const AuditFormPage: React.FC<AuditFormPageProps> = ({ onSubmit }) => {
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState<FacilityType>(FacilityType.Hotel);
  const [features, setFeatures] = useState<AccessibilityFeatures>({
    wheelchairAccess: false,
    visualImpairmentSupport: false,
    hearingImpairmentSupport: false,
  });
  const [comments, setComments] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFeatures(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!facilityName) {
      alert('Please enter a facility name.');
      return;
    }
    onSubmit({
      facilityName,
      facilityType,
      features,
      comments,
      imageFile: imageFile?.name,
    });
    // Reset form
    setFacilityName('');
    setFacilityType(FacilityType.Hotel);
    setFeatures({ wheelchairAccess: false, visualImpairmentSupport: false, hearingImpairmentSupport: false });
    setComments('');
    setImageFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Facility Accessibility Audit</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="facilityName" className="block text-lg font-medium text-slate-700">Facility Name</label>
          <input
            id="facilityName"
            type="text"
            value={facilityName}
            onChange={e => setFacilityName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label htmlFor="facilityType" className="block text-lg font-medium text-slate-700">Facility Type</label>
          <select
            id="facilityType"
            value={facilityType}
            onChange={e => setFacilityType(e.target.value as FacilityType)}
            className="mt-1 block w-full px-4 py-2 border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {Object.values(FacilityType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="text-lg font-medium text-slate-700">Accessibility Features (Check all that apply)</legend>
          <div className="mt-2 space-y-2">
            {Object.keys(features).map(key => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={key}
                  checked={features[key as keyof typeof features]}
                  onChange={handleFeatureChange}
                  className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="imageUpload" className="block text-lg font-medium text-slate-700">Image Upload (Optional)</label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>
        <div>
          <label htmlFor="comments" className="block text-lg font-medium text-slate-700">Comments</label>
          <textarea
            id="comments"
            rows={4}
            value={comments}
            onChange={e => setComments(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>
        <div className="text-center">
            <button
                type="submit"
                className="w-full md:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-lg font-bold rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
                Submit Audit
            </button>
        </div>
      </form>
    </div>
  );
};

export default AuditFormPage;
