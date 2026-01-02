"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Types from existing codebase
// We redefine simpler loose types for the admin form to handle partial states easily
interface ProductType {
  title: string;
  origin: string;
  description: string;
  image: string;
  slug: string;
  climate?: string;
  growingSeason?: string;
  yield?: string;
  detailedDescription?: string;
  isHighDemand?: boolean;
}

interface Product extends ProductType {
  varieties?: string[];
  types?: ProductType[];
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

interface SiteData {
  contact: ContactInfo;
  products: Product[];
}

interface Message {
  id: number;
  name: string;
  email: string;
  productType: string;
  quantity: string;
  destination: string;
  message: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "contact" | "products" | "enquiries"
  >("contact");
  const [enquiries, setEnquiries] = useState<Message[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState<string>("all");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Product Editing State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // The main product being edited
  const [editIndex, setEditIndex] = useState<number>(-1); // Index in the main products array
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Sub-Product Editing State
  const [editingSubProduct, setEditingSubProduct] =
    useState<ProductType | null>(null);
  const [editSubIndex, setEditSubIndex] = useState<number>(-1);

  useEffect(() => {
    fetchData();
    if (activeTab === "enquiries") {
      fetchEnquiries();
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (!res.ok) throw new Error("Failed to fetch data");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data = await res.json();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load enquiries");
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const saveData = async (newData: SiteData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to save data");
      setData(newData);
      alert("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!data) return;
    const { name, value } = e.target;
    setData({
      ...data,
      contact: { ...data.contact, [name]: value },
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Upload failed" }));
        throw new Error(errorData.error || "Upload failed");
      }
      const json = await res.json();
      if (!json.url) {
        console.error("No URL in response:", json);
        alert("Upload succeeded but no URL returned");
        setUploadingImage(false);
        return null;
      }
      setUploadingImage(false);
      return json.url;
    } catch (err) {
      console.error("Upload error:", err);
      alert(
        `Image upload failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setUploadingImage(false);
      return null;
    }
  };

  // --- Main Product Handlers ---

  const handleEditProduct = (index: number) => {
    if (!data) return;
    setEditingProduct({ ...data.products[index] }); // Clone
    setEditIndex(index);
    setIsNewProduct(false);
    setEditingSubProduct(null); // Reset sub editing
    setEditSubIndex(-1);
  };

  const handleCreateProduct = () => {
    setEditingProduct({
      title: "",
      origin: "",
      description: "",
      image: "",
      slug: "",
      varieties: [],
      types: [],
    } as any);
    setEditIndex(-1);
    setIsNewProduct(true);
    setEditingSubProduct(null);
  };

  const saveProductEdit = async () => {
    if (!data || !editingProduct) return;

    // Auto-slug
    if (!editingProduct.slug) {
      editingProduct.slug = editingProduct.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]/g, "");
    }

    console.log("Saving product with image:", editingProduct.image); // Debug log

    const newProducts = [...data.products];
    if (isNewProduct) {
      newProducts.push(editingProduct);
    } else {
      newProducts[editIndex] = editingProduct;
    }

    const dataToSave = { ...data, products: newProducts };
    console.log("Data being saved:", JSON.stringify(dataToSave, null, 2)); // Debug log

    await saveData(dataToSave);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (index: number) => {
    if (!data || !confirm("Are you sure you want to delete this product?"))
      return;
    const newProducts = [...data.products];
    newProducts.splice(index, 1);
    await saveData({ ...data, products: newProducts });
  };

  // --- Sub Product Handlers ---

  const handleDetailChange = (
    field: keyof Product,
    value: any,
    isSub: boolean = false
  ) => {
    if (isSub) {
      setEditingSubProduct((prev) =>
        prev ? ({ ...prev, [field]: value } as ProductType) : null
      );
    } else {
      setEditingProduct((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleAddSubProduct = () => {
    setEditingSubProduct({
      title: "New Sub Category",
      origin: "",
      description: "",
      image: "",
      slug: `sub-${Date.now()}`,
    });
    setEditSubIndex(-1); // New
  };

  const handleEditSubProduct = (index: number) => {
    if (!editingProduct?.types) return;
    setEditingSubProduct({ ...editingProduct.types[index] });
    setEditSubIndex(index);
  };

  const saveSubProduct = () => {
    if (!editingProduct || !editingSubProduct) return;
    const newTypes = [...(editingProduct.types || [])];

    if (editSubIndex === -1) {
      newTypes.push(editingSubProduct);
    } else {
      newTypes[editSubIndex] = editingSubProduct;
    }

    setEditingProduct({ ...editingProduct, types: newTypes });
    setEditingSubProduct(null); // Return to main product view
  };

  const handleDeleteSubProduct = (index: number) => {
    if (!editingProduct?.types) return;
    const newTypes = [...editingProduct.types];
    newTypes.splice(index, 1);
    setEditingProduct({ ...editingProduct, types: newTypes });
  };

  // --- Renderers ---

  const renderFormFields = (item: ProductType | Product, isSub: boolean) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={item.title}
          onChange={(e) => handleDetailChange("title", e.target.value, isSub)}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Slug</label>
        <input
          type="text"
          className="form-control"
          value={item.slug}
          onChange={(e) => handleDetailChange("slug", e.target.value, isSub)}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Origin</label>
        <input
          type="text"
          className="form-control"
          value={item.origin}
          onChange={(e) => handleDetailChange("origin", e.target.value, isSub)}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Image URL</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={item.image}
            onChange={(e) => handleDetailChange("image", e.target.value, isSub)}
            placeholder="Image URL or upload file"
          />
          <input
            type="file"
            className="form-control"
            accept="image/*"
            disabled={uploadingImage}
            onChange={async (e) => {
              if (e.target.files?.[0]) {
                const file = e.target.files[0];
                console.log("Uploading file:", file.name);
                const url = await uploadImage(file);
                console.log("Uploaded URL:", url);
                if (url) {
                  handleDetailChange("image", url, isSub);
                  console.log("Image URL set in state:", url);
                } else {
                  console.error("Failed to get URL from upload");
                }
                // Reset the file input so the same file can be selected again
                e.target.value = "";
              }
            }}
          />
        </div>
        {uploadingImage && (
          <div className="mt-2 text-muted small">
            <i className="bi bi-arrow-up-circle me-1"></i>Uploading image...
          </div>
        )}
        {item.image && item.image.trim() !== "" && (
          <div className="mt-2">
            <img
              src={item.image}
              alt="Preview"
              className="rounded border"
              style={{ maxHeight: 100 }}
              onError={(e) => {
                console.error("Image failed to load:", item.image);
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="mt-1 small text-muted">
              <i className="bi bi-check-circle text-success me-1"></i>
              Image URL: {item.image.substring(0, 50)}...
            </div>
          </div>
        )}
      </div>
      <div className="col-12">
        <label className="form-label">Description (Short)</label>
        <textarea
          className="form-control"
          rows={2}
          value={item.description}
          onChange={(e) =>
            handleDetailChange("description", e.target.value, isSub)
          }
        ></textarea>
      </div>
      <div className="col-12">
        <label className="form-label">Detailed Description</label>
        <textarea
          className="form-control"
          rows={4}
          value={item.detailedDescription || ""}
          onChange={(e) =>
            handleDetailChange("detailedDescription", e.target.value, isSub)
          }
        ></textarea>
      </div>

      {/* New Optional Fields */}
      <div className="col-md-4">
        <label className="form-label">Climate (Optional)</label>
        <input
          type="text"
          className="form-control"
          value={item.climate || ""}
          onChange={(e) => handleDetailChange("climate", e.target.value, isSub)}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Growing Season (Optional)</label>
        <input
          type="text"
          className="form-control"
          value={item.growingSeason || ""}
          onChange={(e) =>
            handleDetailChange("growingSeason", e.target.value, isSub)
          }
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Yield (Optional)</label>
        <input
          type="text"
          className="form-control"
          value={item.yield || ""}
          onChange={(e) => handleDetailChange("yield", e.target.value, isSub)}
        />
      </div>

      <div className="col-12 mt-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id={`highDemand-${item.slug}`}
            checked={item.isHighDemand || false}
            onChange={(e) =>
              handleDetailChange("isHighDemand", e.target.checked, isSub)
            }
          />
          <label
            className="form-check-label"
            htmlFor={`highDemand-${item.slug}`}
          >
            Mark as High Demand (Visible in Popular section)
          </label>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!data)
    return (
      <div className="p-5 text-center text-danger">Error loading data</div>
    );

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand">Admin Dashboard</span>
          <div className="d-flex gap-2">
            <Link href="/" className="btn btn-outline-light btn-sm">
              View Site
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container pb-5">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              Contact Info
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "enquiries" ? "active" : ""
              }`}
              onClick={() => setActiveTab("enquiries")}
            >
              Enquiries
            </button>
          </li>
        </ul>

        {activeTab === "contact" && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4">Edit Contact Information</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={data.contact.email}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={data.contact.phone}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">WhatsApp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    className="form-control"
                    value={data.contact.whatsapp}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows={3}
                    value={data.contact.address}
                    onChange={handleContactChange}
                  ></textarea>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => saveData(data)}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Contact Info"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            {!editingProduct && (
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <h4>Products List</h4>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                >
                  <i className="bi bi-plus-lg me-2"></i>Add New Product
                </button>
              </div>
            )}

            {/* Sub Product Edit Mode */}
            {editingProduct && editingSubProduct && (
              <div className="card border-info mb-4">
                <div className="card-header bg-info text-dark d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {editSubIndex === -1
                      ? "Add Sub-Category"
                      : `Edit: ${editingSubProduct.title}`}
                  </h5>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setEditingSubProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="card-body">
                  {renderFormFields(editingSubProduct, true)}
                  <hr />
                  <button className="btn btn-success" onClick={saveSubProduct}>
                    Save Sub-Category
                  </button>
                </div>
              </div>
            )}

            {/* Main Product Edit Mode (Hidden if editing sub-product?) No, show details but maybe disabled or just under it. 
                Let's hide main form when editing sub-product to focus attention.
            */}
            {editingProduct && !editingSubProduct && (
              <div className="card border-primary mb-4">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {isNewProduct ? "Add Product" : "Edit Product"}
                  </h5>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setEditingProduct(null)}
                  >
                    Close
                  </button>
                </div>
                <div className="card-body">
                  {renderFormFields(editingProduct, false)}

                  <div className="mt-4">
                    <label className="form-label fw-bold">
                      Varieties (Simple List)
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={editingProduct.varieties?.join("\n") || ""}
                      onChange={(e) =>
                        handleDetailChange(
                          "varieties",
                          e.target.value.split("\n"),
                          false
                        )
                      }
                      placeholder="One per line..."
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-bold mb-0">
                        Sub-Categories Products
                      </label>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleAddSubProduct}
                      >
                        + Add Sub-Category
                      </button>
                    </div>
                    <div className="bg-light p-3 rounded border">
                      {(!editingProduct.types ||
                        editingProduct.types.length === 0) && (
                        <p className="text-muted small mb-0">
                          No sub-categories yet.
                        </p>
                      )}
                      {editingProduct.types?.map((type, tIndex) => (
                        <div
                          key={tIndex}
                          className="d-flex gap-2 mb-2 align-items-center bg-white p-2 rounded border"
                        >
                          {type.image && (
                            <img
                              src={type.image}
                              alt=""
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                              }}
                              className="rounded"
                            />
                          )}
                          <div className="flex-grow-1">
                            <strong>{type.title}</strong>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditSubProduct(tIndex)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteSubProduct(tIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <button
                    className="btn btn-success text-white"
                    onClick={saveProductEdit}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </div>
            )}

            {!editingProduct && (
              <div className="row g-4">
                {data.products.map((product, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                      <div style={{ height: 200, overflow: "hidden" }}>
                        <img
                          src={product.image}
                          className="card-img-top object-fit-cover w-100 h-100"
                          alt={product.title}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text text-muted small">
                          {product.description}
                        </p>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm flex-grow-1"
                            onClick={() => handleEditProduct(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteProduct(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "enquiries" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Contact Form Enquiries</h4>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={fetchEnquiries}
                disabled={loadingEnquiries}
              >
                {loadingEnquiries ? "Loading..." : "Refresh"}
              </button>
            </div>

            {loadingEnquiries ? (
              <div className="text-center p-5">Loading enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="card shadow-sm">
                <div className="card-body text-center p-5 text-muted">
                  No enquiries yet.
                </div>
              </div>
            ) : (
              <>
                {/* Filter Section */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label small fw-medium">
                          Search Enquiries
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-search"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email, product type, destination, or message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          {searchTerm && (
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => setSearchTerm("")}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-medium">
                          Filter by Product Type
                        </label>
                        <select
                          className="form-select"
                          value={productTypeFilter}
                          onChange={(e) => setProductTypeFilter(e.target.value)}
                        >
                          <option value="all">All Product Types</option>
                          {Array.from(
                            new Set(enquiries.map((e) => e.productType))
                          )
                            .filter((type): type is string => !!type)
                            .sort()
                            .map((type) => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtered Results */}
                {(() => {
                  const filteredEnquiries = enquiries.filter((enquiry) => {
                    // Product type filter
                    if (
                      productTypeFilter !== "all" &&
                      enquiry.productType !== productTypeFilter
                    ) {
                      return false;
                    }

                    // Search term filter (case-insensitive search across multiple fields)
                    if (searchTerm) {
                      const search = searchTerm.toLowerCase();
                      const searchableText = `
                        ${enquiry.name} 
                        ${enquiry.email} 
                        ${enquiry.productType} 
                        ${enquiry.destination} 
                        ${enquiry.quantity}
                        ${enquiry.message || ""}
                      `.toLowerCase();

                      if (!searchableText.includes(search)) {
                        return false;
                      }
                    }

                    return true;
                  });

                  return filteredEnquiries.length === 0 ? (
                    <div className="card shadow-sm">
                      <div className="card-body text-center p-5 text-muted">
                        No enquiries match your filters.
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 text-muted small">
                        Showing {filteredEnquiries.length} of {enquiries.length}{" "}
                        enquiry{enquiries.length !== 1 ? "ies" : ""}
                        {(searchTerm || productTypeFilter !== "all") && (
                          <button
                            className="btn btn-link btn-sm p-0 ms-2"
                            onClick={() => {
                              setSearchTerm("");
                              setProductTypeFilter("all");
                            }}
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                      <div className="row g-4">
                        {filteredEnquiries.map((enquiry) => (
                          <div key={enquiry.id} className="col-12">
                            <div className="card shadow-sm">
                              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <div>
                                  <strong>{enquiry.name}</strong>
                                  <span className="text-muted ms-2">
                                    {enquiry.email}
                                  </span>
                                </div>
                                <small className="text-muted">
                                  {new Date(
                                    enquiry.createdAt
                                  ).toLocaleString()}
                                </small>
                              </div>
                              <div className="card-body">
                                <div className="row g-3">
                                  <div className="col-md-6">
                                    <label className="small text-muted mb-1">
                                      Product Type
                                    </label>
                                    <p className="mb-0 fw-medium">
                                      {enquiry.productType}
                                    </p>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="small text-muted mb-1">
                                      Quantity
                                    </label>
                                    <p className="mb-0 fw-medium">
                                      {enquiry.quantity}
                                    </p>
                                  </div>
                                  <div className="col-12">
                                    <label className="small text-muted mb-1">
                                      Destination
                                    </label>
                                    <p className="mb-0 fw-medium">
                                      {enquiry.destination}
                                    </p>
                                  </div>
                                  {enquiry.message && (
                                    <div className="col-12">
                                      <label className="small text-muted mb-1">
                                        Additional Message
                                      </label>
                                      <p className="mb-0">{enquiry.message}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
