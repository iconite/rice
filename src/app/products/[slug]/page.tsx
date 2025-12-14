import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getSiteData();
  const product: any = products.find((p) => p.slug === slug) || 
                       products.flatMap((p) => p.types || []).find((t) => t.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  const { products } = await getSiteData();
  const mainSlugs = products.map((product) => ({ slug: product.slug }));
  const subSlugs = products.flatMap((p) => p.types || []).map((t) => ({ slug: t.slug }));
  return [...mainSlugs, ...subSlugs];
}

import ProductCard from '@/components/ProductCard';

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { products } = await getSiteData();
  
  // Find product and potentially its parent
  let product: any = products.find((p) => p.slug === slug);
  let parentProduct: any = null;
  let backLink = "/products";
  let backLabel = "Back to Products";

  if (!product) {
    // Access sub-category via parent
    parentProduct = products.find(p => p.types?.some(t => t.slug === slug));
    if (parentProduct) {
      product = parentProduct.types?.find((t: any) => t.slug === slug);
      backLink = `/products/${parentProduct.slug}`;
      backLabel = `Back to ${parentProduct.title}`;
      
      // Inherit stats from parent if missing
      if (product) {
          if (!product.origin) product.origin = parentProduct.origin;
          if (!product.climate) product.climate = parentProduct.climate;
          if (!product.growingSeason) product.growingSeason = parentProduct.growingSeason;
          if (!product.yield) product.yield = parentProduct.yield;
      }
    }
  }

  if (!product) {
    notFound();
  }

  // If product has sub-categories (types), show the listing view
  if (product.types && product.types.length > 0) {
    return (
      <>
        <Header />
        <main className="py-5 bg-light min-vh-100">
          <div className="container mb-4">
            <Link href="/products" className="text-decoration-none text-muted d-flex align-items-center gap-2 small fw-medium">
              <i className="bi bi-arrow-left"></i> Back to Products
            </Link>
          </div>
          
          <div className="container">
            <div className="mb-5">
              <h3 className="fw-semibold text-dark mb-3">Types of {product.title}</h3>
              <p className="text-secondary mb-4">
                Explore our premium range of {product.title.toLowerCase()} and agricultural products. Each product is available in multiple varieties to meet your specific requirements.
                {product.detailedDescription && <span className="d-block mt-2">{product.detailedDescription}</span>}
              </p>

              {/* Parent Stats Grid */}
              <div className="row g-3">
                {product.origin && (
                  <div className="col-md-3 col-6">
                    <div className="p-3 bg-white border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2 small">
                         <i className="bi bi-geo-alt"></i> Origin
                      </p>
                      <p className="fw-medium mb-0 text-dark small">{product.origin}</p>
                    </div>
                  </div>
                )}
                
                {product.climate && (
                  <div className="col-md-3 col-6">
                    <div className="p-3 bg-white border rounded-3 h-100">
                      <p className=" text-green mb-1 d-flex align-items-center gap-2 small">
                        <i className="bi bi-cloud-sun"></i> Climate
                      </p>
                      <p className="fw-medium mb-0 text-dark small">{product.climate}</p>
                    </div>
                  </div>
                )}

                {product.growingSeason && (
                  <div className="col-md-3 col-6">
                    <div className="p-3 bg-white border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2 small">
                        <i className="bi bi-calendar-event"></i> Growing Season
                      </p>
                      <p className="fw-medium mb-0 text-dark small">{product.growingSeason}</p>
                    </div>
                  </div>
                )}

                {product.yield && (
                  <div className="col-md-3 col-6">
                    <div className="p-3 bg-white border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2 small">
                        <i className="bi bi-bar-chart"></i> Yield
                      </p>
                      <p className="fw-medium mb-0 text-dark small">{product.yield}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-3 shadow-sm mb-5 d-flex align-items-center flex-wrap gap-3">
              <button className="btn btn-outline-secondary d-flex align-items-center gap-2 primary-font">
                <i className="bi bi-funnel"></i> Filter by:
              </button>
              <div className="d-flex gap-2 flex-wrap flex-grow-1">
                <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">Origin</button>
                <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">High Demand</button>
              </div>
            </div>

            <div className="row g-4">
              {product.types.map((type: any, index: number) => (
                <div key={index} className="col-lg-4 col-md-6">
                  {/* Using ProductCard for types. Note: ProductCard expects a slug. 
                      Clicking these will go to /products/[slug]. 
                      We haven't defined pages for 'rice-type-1' yet, so they will 404 unless handled. */}
                  <ProductCard 
                    title={type.title}
                    origin={type.origin}
                    description={type.description}
                    image={type.image}
                    slug={type.slug}
                    climate={type.climate}
                    growingSeason={type.growingSeason}
                    yield={type.yield}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Default Detail View for single products
  return (
    <>
      <Header />
      <main className="bg-white min-vh-100 pb-5">
        {/* Breadcrumb */}
        <div className="container py-4">
          <Link href={backLink} className="text-decoration-none text-muted d-flex align-items-center gap-2 small fw-medium">
            <i className="bi bi-arrow-left"></i> {backLabel}
          </Link>
        </div>

        <div className="container mb-5">
          <div className="row g-5">
            {/* Left Column: Image */}
            <div className="col-lg-6">
              <div className="position-relative w-100 rounded-4 overflow-hidden shadow-sm h-100" style={{ minHeight: '400px' }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-fit-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="col-lg-6">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <span className="badge bg-light text-dark border border-secondary fw-medium px-3 py-2 rounded-pill small">
                  PREMIUM PRODUCT
                </span>
              </div>

              <h1 className="fw-semibold h4 mb-3 d-flex align-items-center gap-3 text-dark">
                {product.title}
                <i className="bi bi-graph-up-arrow fs-4 text-secondary"></i>
              </h1>

              <p className="text-secondary lh-lg mb-4">
                {product.detailedDescription || product.description}
              </p>

              {/* Stats Grid */}
              <div className="row g-3 mb-4">
                {product.origin && (
                  <div className="col-6">
                    <div className="p-3 border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2">
                         <i className="bi bi-geo-alt"></i> Origin
                      </p>
                      <p className="fw-medium mb-0 text-dark">{product.origin}</p>
                    </div>
                  </div>
                )}
                
                {product.climate && (
                  <div className="col-6">
                    <div className="p-3 border rounded-3 h-100">
                      <p className=" text-green mb-1 d-flex align-items-center gap-2">
                        <i className="bi bi-cloud-sun"></i> Climate
                      </p>
                      <p className="fw-medium mb-0 text-dark">{product.climate}</p>
                    </div>
                  </div>
                )}

                {product.growingSeason && (
                  <div className="col-6">
                    <div className="p-3 border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2">
                        <i className="bi bi-calendar-event"></i> Growing Season
                      </p>
                      <p className="fw-medium mb-0 text-dark">{product.growingSeason}</p>
                    </div>
                  </div>
                )}

                {product.yield && (
                  <div className="col-6">
                    <div className="p-3 border rounded-3 h-100">
                      <p className="text-green mb-1 d-flex align-items-center gap-2">
                        <i className="bi bi-bar-chart"></i> Yield
                      </p>
                      <p className="fw-medium mb-0 text-dark">{product.yield}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mb-5">
            <h3 className="fw-semibold mb-3 text-dark">Details</h3>
            <p className="text-secondary lh-lg mb-0">
                This variety is known for its exceptional quality and unique characteristics. It has been cultivated for generations using both traditional and modern farming techniques, resulting in superior grain quality and optimal yields. Our rigorous quality control ensures that only the best products reach your table.
            </p>
        </div>

        {/* Enquiry Bar */}
        <div className="container mb-5">
            <div className="bg-white border shadow-sm rounded-3 p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div>
                    <h5 className="fw-medium mb-1">Interested in this product?</h5>
                    <p className="text-muted small mb-0">Get in touch for pricing and availability</p>
                </div>
                <button className="btn btn-primary px-4 py-2 text-white">
                    Enquire Now
                </button>
            </div>
        </div>

        {/* Certifications Section */}
        <section className="py-5 bg-secondary">
          <div className="container text-center">
            <h3 className="fw-semibold mb-5 text-dark">Our Certifications</h3>
            <div className="row g-4 justify-content-center">
                {[
                  { title: 'ISO 22000:2018', text: 'Food Safety Management', icon: 'bi-shield-check' },
                  { title: 'FSSAI Certified', text: 'Food Safety Standards', icon: 'bi-award' },
                  { title: 'Organic Certified', text: 'Certified Organic Products', icon: 'bi-patch-check' },
                  { title: 'HACCP', text: 'Hazard Analysis Critical Control', icon: 'bi-shield-shaded' },
                  { title: 'GMP Certified', text: 'Good Manufacturing Practice', icon: 'bi-gear-wide-connected' }
                ].map((cert, idx) => (
                    <div key={idx} className="col-md-2 col-6">
                        <div className="bg-white p-4 rounded-4 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                            <div className="mb-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, backgroundColor: '#E0E7E7' }}>
                                <i className={`bi ${cert.icon} fs-4 text-primary`}></i>
                            </div>
                            <h6 className="fw-semibold mb-2 small">{cert.title}</h6>
                            <p className="text-muted small mb-0 lh-sm" style={{ fontSize: '0.75rem' }}>{cert.text}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Bottom Strip */}
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="bg-light p-3 rounded-3 d-flex align-items-center gap-3 border">
                         <div className="rounded-3 d-flex align-items-center justify-content-center text-white" style={{ width: 48, height: 48, backgroundColor: '#133F40' }}>
                            <i className="bi bi-truck fs-5"></i>
                         </div>
                         <div>
                             <h6 className="fw-semibold mb-1">Global Shipping</h6>
                             <p className="text-muted small mb-0">We deliver worldwide with reliable logistics partners</p>
                         </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-light p-3 rounded-3 d-flex align-items-center gap-3 border">
                         <div className="rounded-3 d-flex align-items-center justify-content-center text-white" style={{ width: 48, height: 48, backgroundColor: '#133F40' }}>
                            <i className="bi bi-shield-check fs-5"></i>
                         </div>
                         <div>
                             <h6 className="fw-semibold mb-1">Quality Guaranteed</h6>
                             <p className="text-muted small mb-0">100% authentic products with quality assurance</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
