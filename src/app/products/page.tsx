import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore our range of premium spices, rice, and agricultural products.",
};
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function ProductsPage() {
  return (
    <>
      <Header />
      
      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="mb-5">
            <h1 className="fw-semibold h3 text-dark mb-3">Types of Products</h1>
            <p className="text-muted" >
              Explore our premium range of spices and agriculture products. Each product is available in multiple varieties to meet your specific requirements.
            </p>
          </div>

          <div className="bg-white p-4 rounded-3 shadow-sm mb-5 d-flex align-items-center flex-wrap gap-3">
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2 primary-font">
              <i className="bi bi-funnel"></i> Filter by:
            </button>
            <div className="d-flex gap-2 flex-wrap flex-grow-1">
              <button className="btn btn-primary rounded-pill px-4">Origin</button>
              <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">High Demand</button>
              <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">Category</button>
            </div>
          </div>

          <div className="row g-4">
            {products.map((product, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
