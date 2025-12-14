import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Iconite Earth for inquiries about our premium products.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-vh-100 pb-5" style={{ backgroundColor: '#FAFAF9' }}>
        {/* Page Header */}
        <section className="py-5 text-center">
          <div className="container">
            <h1 className="fw-semibold h3 mb-3 text-dark">Contact Us</h1>
            <p className="text-secondary mb-0">
              Ready to place an order or have questions? We're here to help you.
            </p>
          </div>
        </section>

        <div className="container mb-5">
          <div className="row g-4">
            {/* Left Column: Contact Info */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4">
                
                {/* Get in Touch Card */}
                <div className="bg-white p-4 rounded-4 shadow-sm border-0">
                  <h5 className="fw-semibold mb-4 text-dark">Get in Touch</h5>
                  
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-envelope fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Email</p>
                      <a href="mailto:info@iconiteearth.com" className="text-dark text-decoration-none fw-medium">info@iconiteearth.com</a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-telephone fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Phone</p>
                      <a href="tel:+911234567890" className="text-dark text-decoration-none fw-medium">+91 (123) 456-7890</a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary" style={{ width: 48, height: 48 }}>
                      <i className="bi bi-geo-alt fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Address</p>
                      <p className="text-dark mb-0 fw-medium">123 Export Plaza<br />Mumbai, India 400001</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="p-4 rounded-4 shadow-sm border-0" style={{ backgroundColor: '#eefcf3', border: '1px solid #c3e6cb' }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-whatsapp fs-4 text-success"></i>
                    <h5 className="fw-semibold mb-0 text-success">WhatsApp</h5>
                  </div>
                  <p className="text-secondary small mb-3">
                    Connect with us instantly on WhatsApp for faster responses
                  </p>
                  <button className="btn btn-success w-100 fw-medium py-2">
                    <i className="bi bi-whatsapp me-2"></i> Chat on WhatsApp
                  </button>
                </div>

                {/* Business Hours Card */}
                <div className="bg-primary p-4 rounded-4 shadow-sm border-0 text-white">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <i className="bi bi-clock fs-5"></i>
                    <h5 className="fw-semibold mb-0">Business Hours</h5>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2 small opacity-75">
                    <span>Monday - Friday</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small opacity-75">
                    <span>Saturday</span>
                    <span>10:00 - 15:00</span>
                  </div>
                  <div className="d-flex justify-content-between small opacity-75">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Send Enquiry Form */}
            <div className="col-lg-8">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-0 h-100">
                <h2 className="fw-semibold h4 mb-4 text-dark">Send Enquiry</h2>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label small fw-medium text-dark">Name *</label>
                    <input type="text" className="form-control py-2 bg-light border-light" id="name" placeholder="Your full name" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label small fw-medium text-dark">Email *</label>
                    <input type="email" className="form-control py-2 bg-light border-light" id="email" placeholder="your.email@example.com" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="productType" className="form-label small fw-medium text-dark">Product Type *</label>
                    <select className="form-select py-2 bg-light border-light text-secondary" id="productType">
                      <option selected>Select product...</option>
                      <option value="rice">Rice</option>
                      <option value="spices">Spices</option>
                      <option value="fruit-veg">Fruits & Vegetables</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="quantity" className="form-label small fw-medium text-dark">Quantity *</label>
                    <input type="text" className="form-control py-2 bg-light border-light" id="quantity" placeholder="e.g., 100 kg, 1 ton, 20 containers" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="destination" className="form-label small fw-medium text-dark">Destination (Location or Pincode) *</label>
                    <input type="text" className="form-control py-2 bg-light border-light" id="destination" placeholder="City, Country or Pincode" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label small fw-medium text-dark">Additional Message (Optional)</label>
                    <textarea className="form-control py-2 bg-light border-light" id="message" rows={4} placeholder="Any specific requirements or questions..."></textarea>
                  </div>

                  <div className="mb-4 form-check">
                    <input type="checkbox" className="form-check-input" id="consent" />
                    <label className="form-check-label small text-secondary" htmlFor="consent">
                      I agree to the processing of my information for the purpose of responding to my inquiry and understand that this form is not meant for collecting sensitive personal data. *
                    </label>
                  </div>

                  <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary px-4 py-2">Submit Enquiry</button>
                    <button type="reset" className="btn btn-outline-secondary px-4 py-2">Clear Form</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
