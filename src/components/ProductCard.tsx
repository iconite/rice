import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  origin: string;
  description: string;
  image: string;
  varieties?: string[];
  slug: string;
  climate?: string;
  growingSeason?: string;
  yield?: string;
}

export default function ProductCard({
  title,
  origin,
  description,
  image,
  varieties,
  slug,
  climate,
  growingSeason,
  yield: yieldResult,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="text-decoration-none primary-font"
    >
      <div className="card h-100 border text-start shadow-sm rounded-4 overflow-hidden bg-white transition-all hover-lift">
        <div className="position-relative" style={{ height: "260px" }}>
          {image && image.trim() !== "" ? (
            <Image src={image} alt={title} fill className="object-fit-cover" />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
              <i className="bi bi-image fs-1 text-muted"></i>
            </div>
          )}
        </div>
        <div className="card-body p-4">
          <p className="mb-2 text-dark fw-bold fs-5">{title}</p>
          <div className="mb-3 d-flex flex-wrap gap-3 small">
            <span className="fw-medium" style={{ color: "#2C5F5D" }}>
              Origin: {origin}
            </span>
            {climate && (
              <span className="text-muted">
                <i className="bi bi-cloud-sun me-1"></i>
                {climate}
              </span>
            )}
            {yieldResult && (
              <span className="text-muted">
                <i className="bi bi-bar-chart me-1"></i>
                {yieldResult}
              </span>
            )}
            {growingSeason && (
              <span className="text-muted">
                <i className="bi bi-calendar-event me-1"></i>
                {growingSeason}
              </span>
            )}
          </div>
          <p
            className="mb-0 text-secondary small lh-base"
            style={{ opacity: 0.85 }}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
