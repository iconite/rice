import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore our range of premium spices, rice, and agricultural products.",
};
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getSiteData } from "@/lib/data";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";

export default async function ProductsPage() {
  const { products } = await getSiteData();

  return (
    <>
      <Header />

      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="mb-5">
            <h1 className="fw-semibold h3 text-dark mb-3">Types of Products</h1>
            <p className="text-muted">
              Explore our premium range of spices and agriculture products. Each
              product is available in multiple varieties to meet your specific
              requirements.
            </p>
          </div>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList products={products} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
