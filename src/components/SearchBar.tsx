'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Bay leaves',
    'Turmeric',
    'Basmati Rice',
    'Cardamom'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="py-4 shadow-sm border-top border-light">
      <div className="container">
        <form onSubmit={handleSearch}>
          <div className="d-flex gap-3 mb-3">
            <input
              type="text"
              className="form-control form-control-lg border-end-0 bg-white"
              placeholder="Search for products, spices, grains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary px-5 fw-medium">
              Search
            </button>
          </div>
          <div className="d-flex gap-2 flex-wrap overflow-auto pb-2 text-green">
            Popular:
            {categories.map((category) => (
              <p
                key={category}
                className={` px-3`}
              >
                {category}
              </p>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
