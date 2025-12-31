
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { Product } from '@/lib/products';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [showHighDemand, setShowHighDemand] = useState(false);
  const [isOriginDropdownOpen, setIsOriginDropdownOpen] = useState(false);
  
  // Extract unique origins
  const allOrigins = new Set<string>();
  products.forEach(p => {
     if (p.origin) {
         // Split by common separators (comma, &, and) and trim
         p.origin.split(/,|&| and /i).forEach(part => allOrigins.add(part.trim()));
     }
  });
  const origins = Array.from(allOrigins).sort();

  useEffect(() => {
    let result = products;

    // 1. Search Logic
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => {
        // Direct match
        if (p.title.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q) ||
            p.origin.toLowerCase().includes(q)) return true;

        // Sub-product (Types) match
        if (p.types?.some(t => 
             t.title.toLowerCase().includes(q) || 
             t.description.toLowerCase().includes(q)
        )) return true;
        
        return false;
      });
    }

    // 2. Origin Filter Logic
    if (selectedOrigin) {
        result = result.filter(p => {
             if (!p.origin) return false;
             // Split product origin to check if it contains the selected one
             const productOrigins = p.origin.split(/,|&| and /i).map(s => s.trim().toLowerCase());
             return productOrigins.includes(selectedOrigin.toLowerCase());
        });
    }

    // 3. High Demand Filter
    if (showHighDemand) {
        result = result.filter(p => p.isHighDemand);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedOrigin, showHighDemand, products]);

  return (
    <>
      <div className="container mb-5">
           {/* Search Bar - Integrated here for direct interaction */}
           <div className="mb-4 position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                  type="text"
                  className="form-control border shadow-sm ps-5"
                  placeholder="Search for products, makhana, spices, coconut, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           {/* Filters */}
           <div className="bg-white p-4 rounded-3 shadow-sm d-flex align-items-center flex-wrap gap-3">
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2 primary-font" disabled>
               <i className="bi bi-funnel"></i> Filter by:
            </button>
            
            <div className="d-flex gap-2 flex-wrap flex-grow-1 align-items-center">
               {/* Origin Dropdown/Toggle */}
              <div className="dropdown position-relative">
                  <button 
                    className={`btn rounded-pill px-4 ${selectedOrigin ? 'btn-primary' : 'btn-outline-secondary border-light bg-light text-dark'}`} 
                    type="button" 
                    onClick={() => {
                        if (selectedOrigin) {
                            setSelectedOrigin(null); // Clear filter
                            setIsOriginDropdownOpen(false);
                        } else {
                            setIsOriginDropdownOpen(!isOriginDropdownOpen); // Toggle dropdown
                        }
                    }}
                  >
                    {selectedOrigin || 'Origin'} 
                    {selectedOrigin && <i className="bi bi-x ms-2" onClick={(e) => { e.stopPropagation(); setSelectedOrigin(null); setIsOriginDropdownOpen(false); }}></i>}
                  </button>
                  
                  {isOriginDropdownOpen && (
                      <>
                        <div 
                            className="position-fixed top-0 start-0 w-100 h-100 z-1" 
                            onClick={() => setIsOriginDropdownOpen(false)}
                            style={{ cursor: 'default' }}
                        ></div>
                        <div className="dropdown-menu shadow border-0 mt-2 p-2 d-block z-2" onClick={(e) => e.stopPropagation()}>
                                <div className="px-2 pb-2">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-sm" 
                                        placeholder="Search countries..." 
                                        autoFocus
                                        onChange={(e) => {
                                            const val = e.target.value.toLowerCase();
                                            const items = document.querySelectorAll('.origin-item');
                                            items.forEach((item: any) => {
                                                const text = item.textContent?.toLowerCase() || '';
                                                item.style.display = text.includes(val) ? 'block' : 'none';
                                            });
                                        }}
                                    />
                                </div>
                                <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                                    <button className="dropdown-item rounded origin-item" onClick={() => { setSelectedOrigin(null); setIsOriginDropdownOpen(false); }}>All Origins</button>
                                    <hr className="dropdown-divider" />
                                    {origins.map(origin => (
                                        <button key={origin} className="dropdown-item rounded origin-item" onClick={() => { setSelectedOrigin(origin); setIsOriginDropdownOpen(false); }}>{origin}</button>
                                    ))}
                                </div>
                        </div>
                      </>
                  )}
              </div>

               {/* High Demand Toggle */}
               <button 
                    className={`btn rounded-pill px-4 ${showHighDemand ? 'btn-primary' : 'btn-outline-secondary border-light bg-light text-dark'}`}
                    onClick={() => setShowHighDemand(!showHighDemand)}
               >
                   High Demand {showHighDemand && <i className="bi bi-check-lg ms-2"></i>}
               </button>
            </div>
          </div>
      </div>

      <div className="container">
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <ProductCard {...product} />
                  </div>
                ))
            ) : (
                <div className="col-12 text-center py-5">
                    <h4 className="text-secondary">No products found matching your criteria.</h4>
                </div>
            )}
          </div>
      </div>
    </>
  );
}
