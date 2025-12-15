"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In future, you can trigger an API call here before navigation
    router.push("/contact/success");
  };

  return (
    <section>
      <h2 className="fw-semibold h4 mb-4 text-dark">Send Enquiry</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="form-label small fw-medium text-dark"
          >
            Name *
          </label>
          <input
            type="text"
            className="form-control py-2 bg-light border-light"
            id="name"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="form-label small fw-medium text-dark"
          >
            Email *
          </label>
          <input
            type="email"
            className="form-control py-2 bg-light border-light"
            id="email"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productType"
            className="form-label small fw-medium text-dark"
          >
            Product Type *
          </label>
          <select
            className="form-select py-2 bg-light border-light text-secondary"
            id="productType"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select product...
            </option>
            <option value="rice">Rice</option>
            <option value="spices">Spices</option>
            <option value="fruit-veg">Fruits & Vegetables</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="form-label small fw-medium text-dark"
          >
            Quantity *
          </label>
          <input
            type="text"
            className="form-control py-2 bg-light border-light"
            id="quantity"
            placeholder="e.g., 100 kg, 1 ton, 20 containers"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="destination"
            className="form-label small fw-medium text-dark"
          >
            Destination (Location or Pincode) *
          </label>
          <input
            type="text"
            className="form-control py-2 bg-light border-light"
            id="destination"
            placeholder="City, Country or Pincode"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="form-label small fw-medium text-dark"
          >
            Additional Message (Optional)
          </label>
          <textarea
            className="form-control py-2 bg-light border-light"
            id="message"
            rows={4}
            placeholder="Any specific requirements or questions..."
          ></textarea>
        </div>

        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="consent"
            required
          />
          <label
            className="form-check-label small text-secondary"
            htmlFor="consent"
          >
            I agree to the processing of my information for the purpose of
            responding to my inquiry and understand that this form is not meant
            for collecting sensitive personal data. *
          </label>
        </div>

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary px-4 py-2">
            Submit Enquiry
          </button>
          <button type="reset" className="btn btn-outline-secondary px-4 py-2">
            Clear Form
          </button>
        </div>
      </form>
    </section>
  );
}
