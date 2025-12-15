import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Message Sent",
  description:
    "Thank you for contacting Iconite Earth. We have received your message.",
};

export default async function ContactSuccessPage() {
  const { contact } = await getSiteData();

  return (
    <>
      <Header />
      <main className="min-vh-100 pb-5" style={{ backgroundColor: "#FAFAF9" }}>
        <section className="py-5">
          <div className="container">
            <div className="d-flex justify-content-center mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 96,
                  height: 96,
                  backgroundColor: "#e6f9ec",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#c7f2d6",
                  }}
                >
                  <i className="bi bi-check2 fs-2 text-success" />
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-4 text-start text-center">
                  <h1 className="h4 fw-semibold mb-3">
                    Message Sent Successfully!
                  </h1>
                  <p className="text-secondary mb-4">
                    Thank you for reaching out to us. We&apos;ve received your
                    message and will get back to you as soon as possible,
                    typically within 24–48 hours.
                  </p>

                  <div
                    className="rounded-4 px-4 py-4 text-start mx-auto"
                    style={{ backgroundColor: "#F4EDDC" }}
                  >
                    <p className="fw-semibold mb-3 text-dark">
                      What happens next?
                    </p>

                    <div className="d-flex mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: "#133F40",
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        1
                      </div>
                      <p className="mb-0 small text-secondary">
                        You&apos;ll receive a confirmation email at the address
                        you provided.
                      </p>
                    </div>

                    <div className="d-flex mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: "#133F40",
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        2
                      </div>
                      <p className="mb-0 small text-secondary">
                        Our team will review your inquiry and prepare a detailed
                        response.
                      </p>
                    </div>

                    <div className="d-flex">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: "#133F40",
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        3
                      </div>
                      <p className="mb-0 small text-secondary">
                        We&apos;ll reach out to you via email with the
                        information you requested.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
                    <Link
                      href="/"
                      className="btn btn-primary d-inline-flex align-items-center justify-content-center px-4 py-2"
                    >
                      <i className="bi bi-house-door me-2" />
                      Back to Home
                    </Link>
                    <Link
                      href="/products"
                      className="btn btn-outline-secondary px-4 py-2"
                    >
                      Explore Product Types
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 text-start">
                  <div className="d-flex align-items-center mb-3 justify-content-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 "
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#e6f4ff",
                      }}
                    >
                      <i className="bi bi-envelope text-primary" />
                    </div>
                    <h2 className="h6 fw-semibold mb-0 text-center">
                      Need immediate assistance?
                    </h2>
                  </div>

                  <p className="small text-secondary mb-2 text-center">
                    For urgent inquiries, please call us at{" "}
                    <a
                      href={`tel:${contact.phone.replace(/\D/g, "")}`}
                      className="fw-semibold text-dark text-decoration-none"
                    >
                      {contact.phone}
                    </a>
                  </p>
                  <p className="small text-secondary mb-0 text-center">
                    Monday - Friday, 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
