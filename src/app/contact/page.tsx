import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Iconite Earth for inquiries about our premium products.",
};

export default async function ContactPage() {
  const { contact } = await getSiteData();

  return (
    <>
      <Header />
      <main className="min-vh-100 pb-5" style={{ backgroundColor: "#FAFAF9" }}>
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
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary"
                      style={{ width: 48, height: 48 }}
                    >
                      <i className="bi bi-envelope fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-dark text-decoration-none fw-medium"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary"
                      style={{ width: 48, height: 48 }}
                    >
                      <i className="bi bi-telephone fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Phone</p>
                      <a
                        href={`tel:${contact.phone.replace(/\D/g, "")}`}
                        className="text-dark text-decoration-none fw-medium"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-3 text-secondary"
                      style={{ width: 48, height: 48 }}
                    >
                      <i className="bi bi-geo-alt fs-5"></i>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Address</p>
                      <p
                        className="text-dark mb-0 fw-medium"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div
                  className="p-4 rounded-4 shadow-sm border-0"
                  style={{
                    backgroundColor: "#eefcf3",
                    border: "1px solid #c3e6cb",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-whatsapp fs-4 text-success"></i>
                    <h5 className="fw-semibold mb-0 text-success">WhatsApp</h5>
                  </div>
                  <p className="text-secondary small mb-3">
                    Connect with us instantly on WhatsApp for faster responses
                  </p>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success w-100 fw-medium py-2 text-decoration-none"
                  >
                    <i className="bi bi-whatsapp me-2"></i> Chat on WhatsApp
                  </a>
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
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
