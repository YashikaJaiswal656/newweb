import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import '../css/ProductList.css';
import { products as fallbackProducts } from './Data'; // Fallback data

const ProductList = ({ cart, addToCart, updateCartQuantity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    capacities: [],
    batteryTypes: [],
    warranties: [],
    priceRanges: [],
    rating: 0,
    inStock: false,
    madeInIndia: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1/";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}productData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Extract products array from response
        const productsArray = Array.isArray(data) ? data : data.data || [];
        if (!Array.isArray(productsArray)) {
          console.warn('Expected an array of products, using fallback data');
          setProducts(fallbackProducts);
        } else {
          // Normalize products
          const normalizedProducts = productsArray.map((product) => ({
            ...product,
            rating: product.rating || 0,
            isNew: product.isNew || false,
            bestSeller: product.bestSeller || false,
            local: product.local || false,
            product_price: Number(product.product_price) || 0,
            product_discountedPrice: Number(product.product_discountedPrice) || Number(product.product_price) || 0,
            product_priceRange: product.product_priceRange || determinePriceRange(Number(product.product_discountedPrice) || 0),
          }));
          setProducts(normalizedProducts);
        }

        // Generate dynamic filter options
        const uniqueCategories = [
          ...new Set(productsArray.map((p) => p.product_category)),
        ].map((category) => ({
          id: category,
          name: category,
          count: productsArray.filter((p) => p.product_category === category).length,
        }));
        setCategories([{ id: 'all', name: 'All Products', count: productsArray.length }, ...uniqueCategories]);

        const uniquePriceRanges = [
          { id: '0-30000', name: 'Under ₹30,000', min: 0, max: 30000 },
          { id: '30000-40000', name: '₹30,000 - ₹40,000', min: 30000, max: 40000 },
          { id: '40000-50000', name: '₹40,000 - ₹50,000', min: 40000, max: 50000 },
          { id: '50000+', name: '₹50,000+', min: 50000, max: Infinity },
        ].map((range) => ({
          ...range,
          count: productsArray.filter((p) => p.product_discountedPrice >= range.min && p.product_discountedPrice < range.max).length,
        }));
        setPriceRanges(uniquePriceRanges);

        const uniqueCapacities = [
          ...new Set(productsArray.map((p) => p.product_capacity)),
        ]
          .filter((c) => c)
          .map((capacity) => ({
            id: capacity,
            name: capacity,
            count: productsArray.filter((p) => p.product_capacity === capacity).length,
          }));
        setCapacities(uniqueCapacities);

        const uniqueWarranties = [
          ...new Set(productsArray.map((p) => p.product_warranty)),
        ]
          .filter((w) => w)
          .map((warranty) => ({
            id: warranty,
            name: warranty,
            count: productsArray.filter((p) => p.product_warranty === warranty).length,
          }));
        setWarranties(uniqueWarranties);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts(fallbackProducts);
        // Set fallback filter options
        setCategories([
          { id: 'all', name: 'All Products', count: fallbackProducts.length },
          ...[...new Set(fallbackProducts.map((p) => p.product_category))].map((c) => ({
            id: c,
            name: c,
            count: fallbackProducts.filter((p) => p.product_category === c).length,
          })),
        ]);
        setPriceRanges([
          { id: '0-30000', name: 'Under ₹30,000', count: fallbackProducts.filter((p) => p.product_discountedPrice < 30000).length },
          { id: '30000-40000', name: '₹30,000 - ₹40,000', count: fallbackProducts.filter((p) => p.product_discountedPrice >= 30000 && p.product_discountedPrice < 40000).length },
          { id: '40000-50000', name: '₹40,000 - ₹50,000', count: fallbackProducts.filter((p) => p.product_discountedPrice >= 40000 && p.product_discountedPrice < 50000).length },
          { id: '50000+', name: '₹50,000+', count: fallbackProducts.filter((p) => p.product_discountedPrice >= 50000).length },
        ]);
        setCapacities([
          ...new Set(fallbackProducts.map((p) => p.product_capacity)).map((c) => ({
            id: c,
            name: c,
            count: fallbackProducts.filter((p) => p.product_capacity === c).length,
          })),
        ]);
        setWarranties([
          ...new Set(fallbackProducts.map((p) => p.product_warranty)).map((w) => ({
            id: w,
            name: w,
            count: fallbackProducts.filter((p) => p.product_warranty === w).length,
          })),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to determine price range
  const determinePriceRange = (price) => {
    if (price < 30000) return '0-30000';
    if (price < 40000) return '30000-40000';
    if (price < 50000) return '40000-50000';
    return '50000+';
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.product_description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || product.product_category === selectedCategory;

      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.product_brand);

      const matchesCapacity = filters.capacities.length === 0 || filters.capacities.includes(product.product_capacity);

      const matchesBatteryType =
        filters.batteryTypes.length === 0 || filters.batteryTypes.includes(product.product_batteryType);

      const matchesWarranty = filters.warranties.length === 0 || filters.warranties.includes(product.product_warranty);

      const matchesPriceRange =
        filters.priceRanges.length === 0 ||
        filters.priceRanges.includes(product.product_priceRange);

      const matchesRating = (product.rating || 0) >= filters.rating;

      const matchesStock = !filters.inStock || product.product_stock > 0;

      const matchesMadeInIndia = !filters.madeInIndia || (product.local || false);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesCapacity &&
        matchesBatteryType &&
        matchesWarranty &&
        matchesPriceRange &&
        matchesRating &&
        matchesStock &&
        matchesMadeInIndia
      );
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.product_discountedPrice - b.product_discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.product_discountedPrice - a.product_discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => {
          if ((a.bestSeller || false) && !(b.bestSeller || false)) return -1;
          if (!(a.bestSeller || false) && (b.bestSeller || false)) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }

    return filtered;
  }, [searchQuery, selectedCategory, filters, sortBy, products]);

  const SkeletonProductCard = () => (
    <div className="product-card loading-skeleton">
      <div className="product-image-container">
        <div className="product-image skeleton-image">
          <div className="skeleton-shimmer"></div>
        </div>
      </div>
      <div className="product-content">
        <div className="skeleton-title">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="product-rating skeleton-rating">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="product-price skeleton-price">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="skeleton-actions">
          <div>
            <div className="skeleton-shimmer"></div>
          </div>
          <div>
            <div className="skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonProductList = () => {
    const skeletonCards = Array(6)
      .fill()
      .map((_, index) => <SkeletonProductCard key={index} />);

    return (
      <div className="main-content">
        <Sidebar
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          setFilters={setFilters}
          selectedCategory={selectedCategory}
          filters={filters}
          categories={categories}
          priceRanges={priceRanges}
          capacities={capacities}
          warranties={warranties}
        />
        <main className="product-listing">
          <div className="results-header">
            <div>
              <h2 className="skeleton-title" style={{ width: '200px', height: '30px' }}>
                <div className="skeleton-shimmer"></div>
              </h2>
              <div className="skeleton-rating" style={{ width: '100px', height: '20px' }}>
                <div className="skeleton-shimmer"></div>
              </div>
            </div>
            <div className="sort-container">
              <label className="skeleton-title" style={{ width: '60px', height: '20px' }}>
                <div className="skeleton-shimmer"></div>
              </label>
              <div className="skeleton-title" style={{ width: '120px', height: '40px' }}>
                <div className="skeleton-shimmer"></div>
              </div>
            </div>
          </div>
          <div className="product-grid">{skeletonCards}</div>
        </main>
      </div>
    );
  };

  if (loading) {
    return <SkeletonProductList />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <Sidebar
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        setFilters={setFilters}
        selectedCategory={selectedCategory}
        filters={filters}
        categories={categories}
        priceRanges={priceRanges}
        capacities={capacities}
        warranties={warranties}
      />
      <main className="product-listing">
        <div className="results-header">
          <div>
            <h2>
              {selectedCategory === 'all'
                ? 'All Products'
                : categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
            </h2>
            <p>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
                updateCartQuantity={updateCartQuantity}
              />
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductList;