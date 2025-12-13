import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productPlaceholders } from '@/lib/placeholders';


export default function ProductsPage() {
  const products = [
    {
      title: 'Rice',
      origin: 'India',
      description: 'Aromatic flavors used in cooking for their distinctive taste and aroma.',
      image: "/products/rice.png",
      varieties: [
        'Rice type 1 - Aromatic basmati with soft texture',
        'Rice type 2 - Suitable for biryani',
        'Rice type 3 - Traditional variety with unique flavor'
      ],
      slug: 'rice'
    },
    {
      title: 'Spices',
      origin: 'India',
      description: 'Indian spices are renowned worldwide for their aroma and...',
      image: '/products/spices.png',
      varieties: [
        'Spices type 1 - Red chili powder',
        'Spices type 2 - Black cumin seeds',
        'Spices type 3 - Whole spices mix'
      ],
      slug: 'spices'
    },
    {
      title: 'Nuts & Seeds',
      origin: 'India & Middle East',
      description: 'Nuts and seeds are highly valued worldwide for their nutrients and...',
      image: '/products/nuts.png',
      varieties: [
        'Regular Cumin - Aromatic and flavorful',
        'Black Cumin - Exotic and flavorful',
        'Organic Cumin - Naturally grown'
      ],
      slug: 'nuts-seeds'
    },
    {
      title: 'Moringa',
      origin: 'India & Vietnam',
      description: 'King of spices, essential in cuisines worldwide.',
      image: '/products/moringa.png',
      varieties: [
        'Tellicherry Black Pepper - Large and bold',
        'Malabar Black Pepper - Aromatic variety'
      ],
      slug: 'moringa'
    },
    {
      title: 'Cow Dung',
      origin: 'India',
      description: 'Aromatic seeds with a crispy and sweet notes.',
      image: '/products/cowdung.png',
      varieties: [
        'Sage Coriander - Large and bold',
        'Basil Seeds - All-purpose seeds'
      ],
      slug: 'cow-dung'
    },
    {
      title: 'Coconuts',
      origin: 'India & Guatemala',
      description: 'Queen of spices with an intense aroma and sweet flavor.',
      image: '/products/coconut.png',
      varieties: [
        'Green Cardamom - Most popular variety',
        'Black Cardamom - Smoky flavor'
      ],
      slug: 'coconuts'
    },
    {
      title: 'Fruits & Vegetables',
      origin: 'Sri Lanka & India',
      description: 'Fruits and vegetables are globally essential for their fresh nutrition, vibra...',
      image: '/products/fruits.png',
      varieties: [
        'Ceylon Cinnamon - True cinnamon, delicate flavor',
        'Cassia Cinnamon - Strong and sweet',
        'Cinnamon Powder - Ground form for easy use'
      ],
      slug: 'fruits-vegetables'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="mb-5">
            <h3 className="fw-semibold text-dark mb-3">Types of Products</h3>
            <p className="text-muted" >
              Explore our premium range of spices and agriculture products. Each product is available in multiple varieties to meet your specific requirements.
            </p>
          </div>

          <div className="bg-white p-4 rounded-3 shadow-sm mb-5 d-flex align-items-center flex-wrap gap-3">
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
              <i className="bi bi-funnel"></i> Filter by:
            </button>
            <div className="d-flex gap-2 flex-wrap flex-grow-1">
              <button className="btn btn-primary rounded-pill px-4">Origin</button>
              <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">High Demand</button>
              <button className="btn btn-outline-secondary rounded-pill px-4 border-light bg-light text-dark">Category</button>
            </div>
          </div>

          <div className="row g-4">
            {products.map((product, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
