'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tag {
  title: string;
  slug: string;
}

interface SearchBarProps {
  popularTags?: Tag[];
}

export default function SearchBar({ popularTags }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const categories: Tag[] = popularTags && popularTags.length > 0 
    ? popularTags 
    : [
    { title: 'Bay leaves', slug: 'bay-leaves' },
    { title: 'Turmeric', slug: 'turmeric' },
    { title: 'Basmati Rice', slug: 'rice' },
    { title: 'Cardamom', slug: 'cardamom' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
          <div className="d-flex gap-2 flex-wrap overflow-auto pb-2 text-green align-items-center">
            <span className="me-2">Popular:</span>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className=" text-primary px-3 fw-medium"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
