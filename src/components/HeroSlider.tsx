'use client';

import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

const heroImages = [
  '/cover-image.jpg',
  '/hero-bg-2.png',
  '/hero-bg-3.png'
];

export default function HeroSlider() {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
      <Carousel 
        controls={false} 
        indicators={false} 
        interval={3000} 
        fade={true} 
        pause={false}
        className="h-100 hero-carousel"
      >
        {heroImages.map((src, index) => (
          <Carousel.Item key={index} className="h-100">
            <div className="w-100 h-100">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
