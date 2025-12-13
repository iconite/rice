export interface Product {
  title: string;
  origin: string;
  description: string;
  image: string;
  varieties?: string[];
  slug: string;
  // Extended details for the single page view
  climate?: string;
  growingSeason?: string;
  yield?: string;
  detailedDescription?: string;
}

export const products: Product[] = [
  {
    title: 'Rice',
    origin: 'India',
    description: 'Aromatic flavors used in cooking for their distinctive taste and aroma.',
    detailedDescription: 'Our premium rice collection features the finest grains sourced from the fertile lands of India and Pakistan. Known for its exceptional length, fluffy texture, and distinct aroma, our rice is processed under strict hygiene conditions to ensure purity and nutritional value. Perfect for biryanis, pilafs, and everyday meals.',
    image: '/products/rice.png',
    varieties: [
      'Rice type 1 - Aromatic basmati with soft texture',
      'Rice type 2 - Suitable for biryani',
      'Rice type 3 - Traditional variety with unique flavor'
    ],
    slug: 'rice',
    climate: 'Tropical',
    growingSeason: '120-150 days',
    yield: '3-5 tons/ha'
  },
  {
    title: 'Spices',
    origin: 'India',
    description: 'Indian spices are renowned worldwide for their aroma and bold flavor.',
    detailedDescription: 'Experience the authentic taste of India with our hand-picked spices. Sourced from the finest spice gardens, our range includes vivid turmeric, fiery chilies, and aromatic cardamom. Each spice is sun-dried and ground to perfection to preserve its natural oils and potency.',
    image: '/products/spices.png',
    varieties: [
      'Spices type 1 - Red chili powder',
      'Spices type 2 - Black cumin seeds',
      'Spices type 3 - Whole spices mix'
    ],
    slug: 'spices',
    climate: 'Warm & Humid',
    growingSeason: '8-10 months',
    yield: 'Varies'
  },
  {
    title: 'Nuts & Seeds',
    origin: 'India & Middle East',
    description: 'Nuts and seeds are highly valued worldwide for their nutrients.',
    image: '/products/nuts.png',
    varieties: [
      'Regular Cumin - Aromatic and flavorful',
      'Black Cumin - Exotic and flavorful',
      'Organic Cumin - Naturally grown'
    ],
    slug: 'nuts-seeds',
    climate: 'Arid/Semi-arid',
    growingSeason: '90-120 days',
    yield: '500-800 kg/ha'
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
    slug: 'moringa',
    climate: 'Tropical',
    growingSeason: 'Perennial',
    yield: 'High'
  },
  {
    title: 'Cow Dung',
    origin: 'India',
    description: 'Natural organic fertilizer known for its high nutrient content.',
    detailedDescription: 'Sourced from free-grazing seeds, our high-quality organic cow dung is an excellent fertilizer for all types of crops. It enriches the soil with essential nutrients, improves water retention, and promotes healthy microbial activity.',
    image: '/products/cowdung.png',
    slug: 'cow-dung',
    // No varieties = "dub categories"
    climate: 'All-Year',
    growingSeason: 'N/A',
    yield: 'Sustainable'
  },
  {
    title: 'Coconut',
    origin: 'India & Guatemala',
    description: 'Queen of spices with an intense aroma and sweet flavor.',
    detailedDescription: 'This variety is known for its exceptional quality and unique characteristics. It has been cultivated for generations using both traditional and modern farming techniques, resulting in superior grain quality and optimal yields.',
    image: '/products/coconut.png',
    varieties: [
      'Green Cardamom - Most popular variety',
      'Black Cardamom - Smoky flavor'
    ],
    slug: 'coconuts',
    climate: 'Tropical',
    growingSeason: '12 months',
    yield: '80-100 nuts/tree'
  },
  {
    title: 'Fruits & Vegetables',
    origin: 'Sri Lanka & India',
    description: 'Fruits and vegetables are globally essential for their fresh nutrition.',
    image: '/products/fruits.png',
    varieties: [
      'Ceylon Cinnamon - True cinnamon, delicate flavor',
      'Cassia Cinnamon - Strong and sweet',
      'Cinnamon Powder - Ground form for easy use'
    ],
    slug: 'fruits-vegetables',
    climate: 'Tropical',
    growingSeason: 'Seasonal',
    yield: 'Variable'
  }
];
