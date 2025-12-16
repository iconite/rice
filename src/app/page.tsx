import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { getSiteData } from '@/lib/data';


export default async function Home() {
  const { products } = await getSiteData();
  // Sort products: High Demand first, then others. Slice to first 3.
  const displayProducts = [...products]
    .sort((a, b) => {
        // High Demand first
        if (a.isHighDemand === b.isHighDemand) return 0;
        return a.isHighDemand ? -1 : 1;
    })
    .slice(0, 3);
  
  // Popular tags for search bar: strictly the high demand ones, or if none, the top 3 items
  const highDemandProducts = products.filter(p => p.isHighDemand);
  const popularTags = highDemandProducts.length > 0 
    ? highDemandProducts.map(p => ({ title: p.title, slug: p.slug }))
    : displayProducts.map(p => ({ title: p.title, slug: p.slug }));

  return (
    <>
      <Header />
      <SearchBar popularTags={popularTags} />
      
      <main>
        {/* Hero Section */}
        <section id="hero" className="hero position-relative d-flex align-items-center text-white" >
          {/* <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div> */}
          <div className="container position-relative z-2">
            <div >
              <h1 className="fw-semibold mb-4 ls-1 hero-title text-center">GLOBAL EXPORT & DELIVERY</h1>
              <h3 className="fw-medium mb-5 opacity-75 hero-subtitle text-center">
                Serving customers worldwide with JDC shipping and consistent<br className="d-none d-md-block" />
                quality that meets international standards.
              </h3>
              <div className="d-flex gap-3  flex-wrap justify-content-center">
                <Link href="/products" className="btn btn-primary px-4 shadow-sm primary-font p-3 text-decoration-none hero-btn">View Products <i className="bi bi-arrow-right ms-2"></i></Link>
                <Link href="/contact" className="btn btn-light px-4 primary-font p-3 text-decoration-none hero-btn">Contact Us</Link>
              </div>
            </div>
          </div>
          {/* <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2 z-3">
            <span className="bg-white opacity-50 rounded-circle" style={{ width: 10, height: 10, cursor: 'pointer' }}></span>
            <span className="bg-white rounded-pill" style={{ width: 30, height: 10, cursor: 'pointer' }}></span>
            <span className="bg-white opacity-50 rounded-circle" style={{ width: 10, height: 10, cursor: 'pointer' }}></span>
          </div> */}
        </section>

        {/* About Section */}
        <section className="py-5 bg-white">
          <div className="container py-4 text-center">
            <h2 className="display-6 fw-semibold text-dark mb-4">About Iconite Earth</h2>
            <p className="text-muted mx-auto mb-5 lh-lg" style={{ maxWidth: 900 }}>
              Iconite Earth is a trusted export partner that specializes in delivering high-quality agricultural products to customers worldwide. With a commitment to excellence and sustainability, we source the finest spices, grains, and organic products directly from certified farms. Our mission is to bridge the gap between local farmers and global markets, ensuring that every product meets international standards while supporting sustainable farming practices. We take pride in our rigorous quality control processes and our ability to deliver fresh, authentic products that preserve their natural flavors and nutritional value.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-5 bg-info">
          <div className="container py-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
              <h2 className="display-6 fw-semibold text-dark mb-0">Popular Products</h2>
              <Link href="/products" className="text-primary text-decoration-none fw-medium d-flex align-items-center gap-2 hover-translate">
                View All Products <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row g-4">
              {displayProducts.map((product, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-primary text-white text-center">
          <div className="container py-4">
            <h2 className="display-6 fw-semibold mb-3">Ready to Place an Order?</h2>
            <p className="lead mb-4 opacity-75">
              Contact us today to make custom orders and find the best products.
            </p>
            <Link href="/contact" className="btn btn-white text-primary bg-white fw-semibold px-5 py-3 shadow-sm hover-lift text-decoration-none">Get In Touch <i className="bi bi-arrow-right ms-2"></i></Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
