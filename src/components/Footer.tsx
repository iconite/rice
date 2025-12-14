import Link from 'next/link';
import { getSiteData } from '@/lib/data';

export default async function Footer() {
  const { contact } = await getSiteData();

  return (
    <footer className="bg-primary text-white py-5 mt-5 primary-font">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-semibold mb-4">Iconite Earth</h5>
            <p className="text-white-50 mb-3">
Your trusted partner for premium quality spices, grains, and agricultural products, sourced sustainably and delivered globally.            </p>
            
            <div className="d-flex gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter" className="text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}><i className="bi bi-twitter"></i></a>
              <a href="#" aria-label="Instagram" className="text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="LinkedIn" className="text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}><i className="bi bi-linkedin"></i></a>
              <a href="#" aria-label="YouTube" className="text-white bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-semibold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link href="/products" className="text-white-50 text-decoration-none">Types of Products</Link></li>
              <li className="mb-2"><Link href="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-white-50 text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-semibold mb-4">Our Products</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/products?search=spices" className="text-white-50 text-decoration-none">Spices</Link></li>
              <li className="mb-2"><Link href="/products?search=rice" className="text-white-50 text-decoration-none">Rice</Link></li>
              <li className="mb-2"><Link href="/products?search=coconut" className="text-white-50 text-decoration-none">Coconut</Link></li>
              <li className="mb-2"><Link href="/products?search=moringa" className="text-white-50 text-decoration-none">Moringa</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-semibold mb-4">Contact Us</h5>
            <div className="text-white-50">
              {/* Address: Align Start for multi-line */}
              <div className="d-flex align-items-start mb-3">
                <div className="flex-shrink-0 me-3" style={{ width: '20px', marginTop: '2px' }}>
                    <i className="bi bi-geo-alt-fill"></i>
                </div>
                <span className="lh-sm" style={{ whiteSpace: 'pre-line' }}>{contact.address}</span>
              </div>

              {/* Phone: Align Center */}
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="d-flex align-items-center mb-3 text-white-50 text-decoration-none hover-white">
                 <div className="flex-shrink-0 me-3" style={{ width: '20px' }}>
                    <i className="bi bi-telephone-fill"></i>
                 </div>
                 <span>{contact.phone}</span>
              </a>

              {/* Email: Align Center */}
              <a href={`mailto:${contact.email}`} className="d-flex align-items-center mb-3 text-white-50 text-decoration-none hover-white">
                <div className="flex-shrink-0 me-3" style={{ width: '20px' }}>
                    <i className="bi bi-envelope-fill"></i>
                </div>
                <span>{contact.email}</span>
              </a>

              {/* Time: Align Center */}
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 me-3" style={{ width: '20px' }}>
                    <i className="bi bi-clock-fill"></i>
                </div>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-white-50 mb-md-0 small">
                © 2025 Iconite Earth - All rights reserved
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <Link href="/privacy" className="text-white-50 text-decoration-none small">Privacy Policy</Link>
                <Link href="/terms" className="text-white-50 text-decoration-none small">Terms of Service</Link>
                <Link href="/cookies" className="text-white-50 text-decoration-none small">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
