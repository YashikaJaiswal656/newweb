// Data.js
import inverterimg from '../img/lithiumintegratedinverter.JPG';

// Sample products (used as fallback or for testing if API fails)
export const products = [
  {
    id: 1,
    product_name: 'Finike Lithium-Ion Inverter 1100VA',
    product_category: 'home-inverters',
    product_brand: 'Finike',
    product_description: 'Pure sine wave inverter with lithium battery backup for homes.',
    product_price: 34999,
    product_discountedPrice: 31999,
    product_stock: 15,
    image: inverterimg,
    rating: 4.7,
    reviews: 243,
    product_capacity: '1100VA',
    product_batteryType: 'Lithium-Ion',
    product_warranty: '2 Years',
    product_features: [
      '1100VA Pure Sine Wave Output',
      'Built-in Lithium Battery (12V 100Ah)',
      '2 Years Warranty',
      'Fast Charging (6-8 hours)',
      'UPS Mode for Instant Switchover',
    ],
    specs: {
      capacity: '1100VA/900W',
      battery: 'Built-in 12V 100Ah Lithium',
      charging: '15A Charger',
      warranty: '2 Years',
      weight: '14.5 kg',
    },
    local: true,
    isNew: true,
    product_priceRange: '30000-40000',
  },
  {
    id: 2,
    product_name: 'Finike Pro Lithium-Ion Inverter 2200VA',
    product_category: 'home-inverters',
    product_brand: 'Finike',
    product_description: 'High capacity pure sine wave inverter for medium homes.',
    product_price: 48999,
    product_discountedPrice: 44999,
    product_stock: 8,
    image: inverterimg,
    rating: 4.8,
    reviews: 189,
    product_capacity: '2200VA',
    product_batteryType: 'Lithium-Ion',
    product_warranty: '3 Years',
    product_features: [
      '2200VA Pure Sine Wave Output',
      'Supports Dual Lithium Batteries',
      '3 Years Warranty',
      'LCD Display with Status Indicators',
      'Solar Compatible',
    ],
    specs: {
      capacity: '2200VA/1800W',
      battery: 'Supports 2x 12V 100Ah Lithium',
      charging: '30A Charger',
      warranty: '3 Years',
      weight: '18.2 kg',
    },
    local: true,
    bestSeller: true,
    product_priceRange: '40000-50000',
  },
  {
    id: 3,
    product_name: 'Finike Solar Hybrid Inverter 3KVA',
    product_category: 'solar-inverters',
    product_brand: 'Finike',
    product_description: 'Hybrid solar inverter with MPPT charge controller.',
    product_price: 52999,
    product_discountedPrice: 49999,
    product_stock: 5,
    image: inverterimg,
    rating: 4.6,
    reviews: 156,
    product_capacity: '3000VA',
    product_batteryType: 'Lithium Compatible',
    product_warranty: '5 Years',
    product_features: [
      '3KVA Hybrid Solar Inverter',
      'MPPT Solar Charge Controller',
      'Grid, Solar & Battery Priority Modes',
      'Wi-Fi Monitoring',
      '5 Years Warranty',
    ],
    specs: {
      capacity: '3000VA/2400W',
      solarInput: '120V DC, 50A MPPT',
      battery: '48V Lithium Compatible',
      warranty: '5 Years',
      weight: '22.5 kg',
    },
    local: false,
    product_priceRange: '40000-50000',
  },
  {
    id: 4,
    product_name: 'Finike Industrial Inverter 5KVA',
    product_category: 'industrial-inverters',
    product_brand: 'Finike',
    product_description: 'Heavy-duty inverter for commercial applications.',
    product_price: 89999,
    product_discountedPrice: 84999,
    product_stock: 3,
    image: inverterimg,
    rating: 4.9,
    reviews: 87,
    product_capacity: '5000VA',
    product_batteryType: 'Lithium Compatible',
    product_warranty: '5 Years',
    product_features: [
      '5000VA Industrial Grade',
      'Three-phase Support',
      'DIN Rail Mountable',
      'RS485 Communication',
      '5 Years Warranty',
    ],
    specs: {
      capacity: '5000VA/4000W',
      inputVoltage: '3-phase 415V',
      battery: '96V Lithium Compatible',
      warranty: '5 Years',
      weight: '35.8 kg',
    },
    local: true,
    product_priceRange: '80000+',
  },
];

// Dynamically generate categories based on products (will be overridden in Sidebar)
export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'home-inverters', name: 'Home Inverters', count: products.filter(p => p.product_category === 'home-inverters').length },
  { id: 'solar-inverters', name: 'Solar Inverters', count: products.filter(p => p.product_category === 'solar-inverters').length },
  { id: 'industrial-inverters', name: 'Industrial Inverters', count: products.filter(p => p.product_category === 'industrial-inverters').length },
];

// Price ranges based on product_discountedPrice
export const priceRanges = [
  { id: '0-30000', name: 'Under ₹30,000', count: products.filter(p => p.product_discountedPrice < 30000).length },
  { id: '30000-40000', name: '₹30,000 - ₹40,000', count: products.filter(p => p.product_discountedPrice >= 30000 && p.product_discountedPrice < 40000).length },
  { id: '40000-50000', name: '₹40,000 - ₹50,000', count: products.filter(p => p.product_discountedPrice >= 40000 && p.product_discountedPrice < 50000).length },
  { id: '50000+', name: '₹50,000+', count: products.filter(p => p.product_discountedPrice >= 50000).length },
];

// Capacities matching product_capacity
export const capacity = [
  { id: '1100VA', name: '1100VA', count: products.filter(p => p.product_capacity === '1100VA').length },
  { id: '2200VA', name: '2200VA', count: products.filter(p => p.product_capacity === '2200VA').length },
  { id: '3000VA', name: '3000VA', count: products.filter(p => p.product_capacity === '3000VA').length },
  { id: '5000VA', name: '5000VA', count: products.filter(p => p.product_capacity === '5000VA').length },
];

// Warranties matching product_warranty
export const warranty = [
  { id: '2 Years', name: '2 Years', count: products.filter(p => p.product_warranty === '2 Years').length },
  { id: '3 Years', name: '3 Years', count: products.filter(p => p.product_warranty === '3 Years').length },
  { id: '5 Years', name: '5 Years', count: products.filter(p => p.product_warranty === '5 Years').length },
];

// Weights matching specs.weight
export const weight = [
  { id: '14.5 kg', name: '14.5 Kg', count: products.filter(p => p.specs.weight === '14.5 kg').length },
  { id: '18.2 kg', name: '18.2 Kg', count: products.filter(p => p.specs.weight === '18.2 kg').length },
  { id: '22.5 kg', name: '22.5 Kg', count: products.filter(p => p.specs.weight === '22.5 kg').length },
  { id: '35.8 kg', name: '35.8 Kg', count: products.filter(p => p.specs.weight === '35.8 kg').length },
];