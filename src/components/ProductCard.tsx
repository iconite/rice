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
    <div className="card h-100 border text-start shadow-sm rounded-4 overflow-hidden bg-white">
      <div className="position-relative" style={{ height: '260px' }}>
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-fit-cover"
        />
      </div>
      <div className="card-body p-4">
        <p className=" mb-2 text-dark">{title}</p>
        <p className="mb-3 fw-medium" style={{ color: '#2C5F5D' }}>Origin: {origin}</p>
        <p className=" mb-0 " >
          {description}
        </p>
      </div>
    </div>
  );
}
