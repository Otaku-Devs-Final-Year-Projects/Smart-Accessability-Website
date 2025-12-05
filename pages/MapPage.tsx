
import React, { useState, useMemo } from 'react';
import { Facility } from '../types';
import { WheelchairIcon, EyeIcon, EarIcon } from '../components/IconComponents';

interface MapPageProps {
  facilities: Facility[];
}

const MapPage: React.FC<MapPageProps> = ({ facilities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    wheelchairAccess: false,
    visualImpairmentSupport: false,
    hearingImpairmentSupport: false,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = 
        (!filters.wheelchairAccess || facility.wheelchairAccess) &&
        (!filters.visualImpairmentSupport || facility.visualImpairmentSupport) &&
        (!filters.hearingImpairmentSupport || facility.hearingImpairmentSupport);
      return matchesSearch && matchesFilters;
    });
  }, [facilities, searchTerm, filters]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Accessibility Map & Directory</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Find Accessible Places</h2>
          <input
            type="text"
            placeholder="Search by facility name..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold mb-2">Filter by features:</legend>
            {Object.keys(filters).map(key => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={key}
                  checked={filters[key as keyof typeof filters]}
                  onChange={handleFilterChange}
                  className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="mt-6 h-96 overflow-y-auto pr-2">
            {filteredFacilities.length > 0 ? (
                filteredFacilities.map(facility => (
                <div key={facility.id} className="mb-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <h3 className="font-bold text-lg text-teal-700">{facility.name}</h3>
                    <p className="text-sm text-slate-600">{facility.address}</p>
                    <div className="flex space-x-4 mt-2">
                        {facility.wheelchairAccess && <WheelchairIcon className="h-5 w-5 text-blue-600" />}
                        {facility.visualImpairmentSupport && <EyeIcon className="h-5 w-5 text-amber-600" />}
                        {facility.hearingImpairmentSupport && <EarIcon className="h-5 w-5 text-indigo-600" />}
                    </div>
                </div>
                ))
            ) : (
                <p className="text-slate-500">No facilities match your criteria.</p>
            )}
          </div>
        </aside>

        {/* Map Placeholder */}
        <main className="lg:w-2/3 h-[600px] bg-slate-200 rounded-lg shadow-lg flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-slate-600">Interactive Map Placeholder</h3>
            <p className="text-slate-500">A map (e.g., Google Maps embed) would be displayed here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapPage;
