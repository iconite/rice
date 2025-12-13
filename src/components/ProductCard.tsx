import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  origin: string;
  description: string;
  image: string;
  varieties?: string[];
  slug: string;
}

export default function ProductCard({ 
  title, 
  origin, 
  description, 
  image, 
  varieties,
  slug 
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="text-decoration-none primary-font">
      <div className="card h-100 border text-start shadow-sm rounded-4 overflow-hidden bg-white transition-all hover-lift">
        <div className="position-relative" style={{ height: '260px' }}>
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-fit-cover"
          />
        </div>
        <div className="card-body p-4">
          <p className="mb-2 text-dark fw-bold fs-5">{title}</p>
          <p className="mb-3 fw-medium" style={{ color: '#2C5F5D' }}>Origin: {origin}</p>
          <p className="mb-0 text-secondary small lh-base" style={{ opacity: 0.85 }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
