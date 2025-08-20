import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductDetailsModal.css';

const parseProductImages = (imagesData, baseUrl, fallbackImage) => {
  let images = [];

  if (!imagesData) {
    console.log('[DEBUG] No images data provided, using fallback');
    return [fallbackImage];
  }

  if (Array.isArray(imagesData)) {
    images = imagesData;
  } else if (typeof imagesData === 'string') {
    let cleanData = imagesData.trim();
    if (cleanData.includes('%')) {
      try {
        cleanData = decodeURIComponent(cleanData);
        console.log('[DEBUG] URL decoded string:', cleanData);
      } catch (e) {
        console.warn('[DEBUG] Failed to decode URL:', e);
      }
    }
    
    if (cleanData.startsWith('[') && cleanData.endsWith(']')) {
      try {
        const parsed = JSON.parse(cleanData);
        images = Array.isArray(parsed) ? parsed : [cleanData];
        console.log('[DEBUG] Successfully parsed JSON images:', images);
      } catch (e) {
        console.warn('[DEBUG] Failed to parse JSON, trying comma-separated fallback:', e);
        images = cleanData
          .replace(/[\[\]"']/g, '')
          .split(',')
          .map(img => img.trim())
          .filter(img => img.length > 0);
      }
    } else if (cleanData.includes(',')) {
      images = cleanData
        .replace(/[\[\]"']/g, '')
        .split(',')
        .map(img => img.trim())
        .filter(img => img.length > 0);
    } else {
      images = [cleanData.replace(/[\[\]"']/g, '')];
    }
  }

  const processedImages = images
    .map(img => {
      if (typeof img !== 'string') return null;
      const cleanImg = img.trim().replace(/^["'\[\]]+|["'\[\]]+$/g, '');
      if (!cleanImg) return null;
      const imageUrl = cleanImg.startsWith('http') ? cleanImg : `${baseUrl}${cleanImg}`;
      console.log(`[DEBUG] Processed image URL: ${imageUrl}`);
      return imageUrl;
    })
    .filter(img => img !== null && img !== baseUrl);

  console.log('[DEBUG] Final processed images:', processedImages);
  return processedImages.length > 0 ? processedImages : [fallbackImage];
};

const handleImageError = (event, fallbackImage) => {
  const img = event.target;
  const originalSrc = img.src;
  
  console.error(`[DEBUG] Image failed to load: ${originalSrc}`);
  
  if (!img.dataset.retried) {
    img.dataset.retried = 'true';
    img.src = fallbackImage;
  } else if (originalSrc === fallbackImage) {
    img.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
    img.alt = 'Image not available';
    img.style.opacity = '0.5';
  }
};

const ProductDetailsModal = ({ cart, setCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [wishlist, setWishlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [reviewData, setReviewData] = useState({
    review_stars: 0,
    review_content: '',
    name: '',
    email: '',
    review_title: '',
    product_id: productId,
  });
  const [reviewError, setReviewError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);

  const fallbackImage = 'https://via.placeholder.com/150?text=Fallback+Image';
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1/';
  const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || 'http://localhost:8000/Uploads/products/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(`[DEBUG] Fetching product data for productId: ${productId} from ${API_BASE_URL}productData/${productId}`);
        const response = await fetch(`${API_BASE_URL}productData/${productId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[DEBUG] API response:', data);
        const productData = Array.isArray(data) ? data[0] : data.data || data;

        let parsedSpecs = productData.product_specs || {};
        if (typeof parsedSpecs === 'string') {
          try {
            parsedSpecs = JSON.parse(parsedSpecs);
            console.log('[DEBUG] Parsed product_specs:', parsedSpecs);
          } catch (e) {
            console.error('[DEBUG] Error parsing product_specs:', e);
            parsedSpecs = {};
          }
        }

        let parsedAdditionalInfo = productData.addtional_info || {};
        if (typeof parsedAdditionalInfo === 'string') {
          try {
            parsedAdditionalInfo = JSON.parse(parsedAdditionalInfo);
            console.log('[DEBUG] Parsed additional_info:', parsedAdditionalInfo);
          } catch (e) {
            console.error('[DEBUG] Error parsing additional_info:', e);
            parsedAdditionalInfo = {};
          }
        } else {
          console.log('[DEBUG] additional_info is already an object:', parsedAdditionalInfo);
        }

        console.log('[DEBUG] Raw product_images:', productData.product_images);
        console.log('[DEBUG] Raw product_image:', productData.product_image);
        
        const productImages = parseProductImages(
          productData.product_images || productData.product_image,
          IMAGE_BASE_URL,
          fallbackImage
        );

        console.log('[DEBUG] Final processed images:', productImages);

        let productFeatures = [];
        if (productData.product_features) {
          if (typeof productData.product_features === 'string') {
            try {
              productFeatures = JSON.parse(productData.product_features) || [];
              console.log('[DEBUG] Parsed product_features:', productFeatures);
            } catch (e) {
              console.error('[DEBUG] Error parsing product_features:', e);
              productFeatures = [];
            }
          } else if (Array.isArray(productData.product_features)) {
            productFeatures = productData.product_features;
            console.log('[DEBUG] product_features is already an array:', productFeatures);
          }
        }

        let whatIsInBox = productData.what_is_in_box || productData.whatsInBox || productData.whatInTheBox || 'No information provided';
        if (typeof whatIsInBox === 'string' && whatIsInBox.startsWith('[') && whatIsInBox.endsWith(']')) {
          try {
            whatIsInBox = JSON.parse(whatIsInBox);
            console.log('[DEBUG] Parsed what_is_in_box:', whatIsInBox);
          } catch (e) {
            console.error('[DEBUG] Error parsing what_is_in_box:', e);
            whatIsInBox = ['No information provided'];
          }
        } else if (typeof whatIsInBox === 'string') {
          whatIsInBox = [whatIsInBox];
        }

        const normalizedProduct = {
          ...productData,
          id: productData.id,
          product_name: productData.product_title || 'Unknown Product',
          product_image: productImages[0],
          product_images: productImages,
          product_price: Number(productData.product_price) || 0,
          product_discountedPrice: Number(productData.product_discountedPrice) || Number(productData.product_price) || 0,
          product_description: productData.product_description || 'No description available',
          product_stock: Number(productData.product_stock) || 0,
          rating: Number(productData.rating) || 0,
          reviews: Number(totalReviews),
          product_features: productFeatures,
          product_specs: parsedSpecs,
          addtional_info: parsedAdditionalInfo,
          dimensions: productData.dimensions || 'N/A',
          weight: productData.weight || 'N/A',
          manufacturer: productData.product_brand || 'Unknown Manufacturer',
          warranty: productData.warranty || '1 year limited warranty',
          what_is_in_box: Array.isArray(whatIsInBox) ? whatIsInBox : ['No information provided'],
        };

        console.log('[DEBUG] Normalized product:', normalizedProduct);
        setProduct(normalizedProduct);
      } catch (error) {
        console.error('[DEBUG] Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, totalReviews]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);
        console.log(`[DEBUG] Fetching reviews for productId: ${productId}, page: ${currentPage}, limit: ${reviewsPerPage}`);
        const response = await fetch(
          `${API_BASE_URL}ReviewData/${productId}?page=${currentPage}&limit=${reviewsPerPage}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[DEBUG] Reviews API response:', data);
        const newReviews = data.reviews || [];
        setReviews((prev) => (currentPage === 1 ? newReviews : [...prev, ...newReviews]));
        setTotalReviews(data.total_reviews || 0);
        setRatingDistribution(data.distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
        setHasMoreReviews(newReviews.length === reviewsPerPage);
      } catch (error) {
        console.error('[DEBUG] Error fetching reviews:', error);
        setReviewsError('Failed to load reviews: ' + error.message);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, currentPage, reviewsPerPage]);

  const loadMoreReviews = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
  };

  const handleImageZoom = (e) => {
    if (!zoomImage) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const renderRating = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${rating >= i ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + (words[1] ? words[1][0] : words[0][1])).toUpperCase();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.product_stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError(null);
    try {
      if (reviewData.review_stars === 0) {
        throw new Error('Please select a rating (1-5 stars).');
      }
      console.log('[DEBUG] Submitting review:', reviewData);
      const response = await fetch(`${API_BASE_URL}publishReview/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const responseData = await response.json();
      console.log('[DEBUG] Review submission response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || JSON.stringify(responseData.errors) || `HTTP error! status: ${response.status}`);
      }

      setReviewData({
        review_stars: 0,
        review_content: '',
        name: '',
        email: '',
        review_title: '',
        product_id: productId,
      });
      setShowReviewForm(false);
      alert('Review submitted successfully!');
      setCurrentPage(1);
      setReviews([]);
    } catch (error) {
      console.error('[DEBUG] Error submitting review:', error);
      setReviewError('Failed to submit review: ' + error.message);
    }
  };

  const handleStarClick = (star) => {
    setReviewData({ ...reviewData, review_stars: star });
  };

  const renderReviewForm = () => {
    return (
      <div className="review-form-container">
        <h3 className="review-form-title">Write Your Review</h3>
        {reviewError && <div className="error-message">{reviewError}</div>}
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input type="hidden" name="product_id" value={reviewData.product_id} />
          <div className="form-group">
            <label className="form-label">Your Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${reviewData.review_stars >= star ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Review Title (Optional)</label>
            <input
              type="text"
              value={reviewData.review_title}
              onChange={(e) => setReviewData({ ...reviewData, review_title: e.target.value })}
              placeholder="Enter review title"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Your Review</label>
            <textarea
              value={reviewData.review_content}
              onChange={(e) => setReviewData({ ...reviewData, review_content: e.target.value })}
              placeholder="Share your experience with this product..."
              required
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              value={reviewData.name}
              onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
              placeholder="Enter your name"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              value={reviewData.email}
              onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-review-btn">Submit Review</button>
            <button
              type="button"
              className="cancel-review-btn"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderSpecifications = () => {
    const formatSpecKey = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    };

    console.log('[DEBUG] Rendering specifications, product.additional_info:', product?.addtional_info);

    return (
      <div className="specs-container">
        {product?.product_specs && Object.keys(product.product_specs).length > 0 ? (
          <div className="specs-section">
            <h3 className="specs-section-title">Technical Specifications</h3>
            <div className="specs-grid">
              {Object.entries(product.product_specs).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{formatSpecKey(key)}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="specs-section">
            <h3 className="specs-section-title">Technical Specifications</h3>
            <div className="no-content">
              <div className="no-content-icon">📋</div>
              <h4>No specifications available</h4>
              <p>Technical details will be updated soon</p>
            </div>
          </div>
        )}
        {product?.addtional_info && Object.keys(product.addtional_info).length > 0 ? (
          <div className="specs-section additional-info-section">
            <h3 className="specs-section-title">Additional Information</h3>
            <div className="specs-grid">
              {Object.entries(product.addtional_info).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{formatSpecKey(key)}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="specs-section additional-info-section">
            <h3 className="specs-section-title">Additional Information</h3>
            <div className="no-content">
              <div className="no-content-icon">📋</div>
              <h4>No additional information available</h4>
              <p>Additional details will be updated soon</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SkeletonReview = () => (
    <div className="review-item loading-skeleton">
      <div className="review-header">
        <div className="reviewer-dp skeleton-title" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="reviewer-info">
          <div className="skeleton-title" style={{ width: '100px', height: '20px' }}>
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="skeleton-rating" style={{ width: '80px', height: '15px' }}>
            <div className="skeleton-shimmer"></div>
          </div>
        </div>
        <div className="skeleton-rating" style={{ width: '120px', height: '20px' }}>
          <div className="skeleton-shimmer"></div>
        </div>
      </div>
      <div className="skeleton-title" style={{ width: '150px', height: '20px', margin: '10px 0' }}>
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="skeleton-price" style={{ width: '100%', height: '60px' }}>
        <div className="skeleton-shimmer"></div>
      </div>
    </div>
  );

  const renderReviews = () => {
    if (reviewsLoading && reviews.length === 0) {
      return (
        <div className="reviews-list">
          {Array(3)
            .fill()
            .map((_, index) => (
              <SkeletonReview key={index} />
            ))}
        </div>
      );
    }
    if (reviewsError) {
      return <div className="error-message">{reviewsError}</div>;
    }
    if (reviews.length === 0 && !showReviewForm) {
      return (
        <div className="reviews-list">
          <div className="reviews-empty-state">
            <div className="reviews-icon">💬</div>
            <h3>Share Your Experience</h3>
            <p>Be the first to review this product and help other customers make informed decisions!</p>
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
              <span className="btn-icon">✏️</span>
              Write a Review
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="reviews-list">
        {hasMoreReviews && (
          <button
            className="load-more-btn"
            onClick={loadMoreReviews}
            disabled={reviewsLoading}
          >
            {reviewsLoading ? 'Loading...' : 'Read More Reviews'}
          </button>
        )}
        {!showReviewForm && (
          <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
            <span className="btn-icon">✏️</span>
            Write a Review
          </button>
        )}
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-dp">{getInitials(review.name)}</div>
              <div className="reviewer-info">
                <span className="reviewer-name">{review.name}</span>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {renderRating(review.review_stars)}
            </div>
            {review.review_title && <h4 className="review-title">{review.review_title}</h4>}
            <p className="review-content">{review.review_content}</p>
            {review.review_image && (
              <img
                src={`${IMAGE_BASE_URL}reviews/${review.review_image}`}
                alt="Review"
                className="review-image"
                onError={(e) => handleImageError(e, fallbackImage)}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-content">
            <div className="description-content">
              <div className="description-header">
                <h3 className="description-title">Product Overview</h3>
                <div className="description-badge">Detailed Information</div>
              </div>
              <div className="product-description-wrapper">
                <p className="product-description">{product.product_description}</p>
              </div>
              <div className="benefits-section">
                <h3 className="description-title">Why Choose This Product?</h3>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-icon">🏆</div>
                    <h4>Premium Quality</h4>
                    <p>High-quality materials and superior craftsmanship</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">💡</div>
                    <h4>Smart Design</h4>
                    <p>Innovative features that make your life easier</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">🔒</div>
                    <h4>Reliable</h4>
                    <p>Trusted by thousands of satisfied customers</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">🌟</div>
                    <h4>Value for Money</h4>
                    <p>Best price for premium quality products</p>
                  </div>
                </div>
                <div className="what_is_in_box">
                  <h3>What is in the box</h3>
                  {product.what_is_in_box && product.what_is_in_box.length > 0 && product.what_is_in_box[0] !== 'No information provided' ? (
                    <ul className="what-is-in-box-list">
                      {product.what_is_in_box.map((item, index) => (
                        <li key={index} className="what-is-in-box-item">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="product-description">No information provided.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="tab-content">
            <div className="features-container">
              <div className="features-header">
                <h3 className="features-title">Detailed Features</h3>
                <div className="features-badge">Complete List</div>
              </div>
              <div className="feat">
                {product.product_features.length > 0 ? (
                  product.product_features.map((feature, index) => (
                    <div key={index} className="feat-d">
                      <ul className="feature-heading">
                        <li className="feature-text">{feature}</li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="no-content">
                    <div className="no-content-icon">📋</div>
                    <h4>No features available</h4>
                    <p>Feature details will be updated soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'specifications':
        return (
          <div className="tab-content">
            <div className="specs-header">
              <h3 className="specs-title">Technical Specifications</h3>
              <div className="specs-badge">Complete Details</div>
            </div>
            {renderSpecifications()}
          </div>
        );
      case 'reviews':
        return (
          <div className="tab-content">
            <div className="reviews-container">
              <div className="reviews-header"></div>
              <div className="">
                <div className="reviews-rating">
                  <span className="average-rating">{totalReviews.toLocaleString()} reviews</span>
                </div>
                <div className="reviews-distribution">
                  <div className="distribution-bar">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="distribution-row">
                        <span className="star-label">{star} ★</span>
                        <div className="distribution-progress">
                          <div
                            className="distribution-fill"
                            style={{ width: `${ratingDistribution[star]}%` }}
                          ></div>
                        </div>
                        <span className="percentage-label">{ratingDistribution[star]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {showReviewForm ? renderReviewForm() : renderReviews()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-skeleton">
          <div className="skeleton-grid">
            <div className="skeleton-image">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-info">
              <div className="skeleton-title">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-rating">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-price">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="skeleton-actions">
                <div className="skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Product Not Found</h2>
          <p>{error || "The product you're looking for doesn't exist."}</p>
          <button onClick={() => navigate('/')} className="back-to-home-btn">
            <span className="btn-icon">🏠</span>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const discountPercentage =
    product.product_discountedPrice < product.product_price
      ? Math.round(
          ((product.product_price - product.product_discountedPrice) / product.product_price) * 100
        )
      : 0;

  return (
    <div className="product-details-container">
      <nav className="breadcrumb">
        <span onClick={() => navigate('/')} className="breadcrumb-link">
          <span className="breadcrumb-icon">🏠</span>
          Home
        </span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{product.product_name}</span>
      </nav>

      <div className="product-main-grid">
        <div className="product-gallery">
          <div
            className={`main-image-container ${zoomImage ? 'zoom-active' : ''}`}
            onMouseMove={handleImageZoom}
            onMouseLeave={() => setZoomImage(false)}
          >
            <img
              src={product.product_images[hoveredImageIndex !== null ? hoveredImageIndex : selectedImageIndex]}
              alt={product.product_name}
              className="main-product-image"
              style={{
                transform: zoomImage
                  ? `scale(2) translate(${-zoomPosition.x + 50}%, ${-zoomPosition.y + 50}%)`
                  : 'none',
              }}
              onError={(e) => handleImageError(e, fallbackImage)}
            />
            {discountPercentage > 0 && (
              <div className="discount-badge">
                <span className="discount-text">-{discountPercentage}%</span>
                <span className="discount-label">OFF</span>
              </div>
            )}
            <button
              className="zoom-btn"
              onClick={() => setZoomImage(!zoomImage)}
              title={zoomImage ? 'Disable zoom' : 'Enable zoom'}
            >
              🔍
            </button>
            <button
              className="wishlist-btn"
              onClick={() => setWishlist(!wishlist)}
              title={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlist ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="thumbnail-gallery">
            {product.product_images.slice(0, 4).map((img, index) => {
              console.log(`[DEBUG] Rendering thumbnail ${index}: ${img}`);
              return (
                <div
                  key={index}
                  className={`thumbnail-container ${index === selectedImageIndex ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="thumbnail-image"
                    onError={(e) => handleImageError(e, fallbackImage)}
                  />
                </div>
              );
            })}
            {product.product_images.length > 3 && (
              <button
                className="read-more-btn"
                onClick={() => setShowImagePopup(true)}
              >
                More
              </button>
            )}
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <div className="product-title-section">
              <h1 className="product-title">{product.product_name}</h1>
              <div className="title-badges">
                {product.product_stock > 0 && <span className="badge in-stock-badge">✓ In Stock</span>}
                {discountPercentage > 0 && <span className="badge discount-badge">🔥 Hot Deal</span>}
              </div>
            </div>
            <div className="product-meta">
              <span className="product-brand">
                <span className="meta-icon">🏭</span>
                Brand: {product.manufacturer}
              </span>
              <span className="product-sku">
               
              </span>
            </div>
          </div>

          <div className="price-section">
            <div className="price-container">
              <span className="current-price">₹{product.product_discountedPrice.toLocaleString('en-IN')}</span>
              {discountPercentage > 0 && (
                <div className="price-comparison">
                  <span className="original-price">₹{product.product_price.toLocaleString('en-IN')}</span>
                  <span className="savings">
                    <span className="savings-icon">💰</span>
                    You save ₹{(product.product_price - product.product_discountedPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
            <div className="price-tax-info">
              <span className="tax-icon">ℹ️</span>
              (Inclusive of all taxes)
            </div>
          </div>

          <div className="stock-availability">
            {product.product_stock > 0 ? (
              <div className="stock-status in-stock">
                <div className="stock-indicator">
                  <span className="stock-dot available"></span>
                  <span className="stock-text">In Stock</span>
                </div>
                <div className="stock-details">
                  <span className="stock-count">{product.product_stock} units available</span>
                  {product.product_stock <= 5 && (
                    <span className="low-stock-warning">
                      ⚡ Only {product.product_stock} left - Order soon!
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="stock-status out-of-stock">
                <span className="stock-dot unavailable"></span>
                <span className="stock-text">Out of Stock</span>
                <button className="notify-btn">Notify When Available</button>
              </div>
            )}
          </div>

          <div className="product-info-cards">
            <div className="info-card delivery">
              <div className="card-icon">🔒</div>
              <div className="card-content">
                <h4 className="card-title">Secure transaction</h4>
              </div>
            </div>
            <div className="info-card warranty">
              <div className="card-icon">🛡️</div>
              <div className="card-content">
                <h4 className="card-title">Warranty Protection</h4>
                <p className="card-description">{product.product_warranty}</p>
              </div>
            </div>
            
          </div>

          <div className="quantity-section">
            <label className="quantity-label">Quantity</label>
            <div className="quantity-selector">
              <button
                className="quantity-btn decrease"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-btn increase"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.product_stock}
              >
                +
              </button>
            </div>
            <div className="quantity-info">
              <span className="total-price">
                Total: ₹{(product.product_discountedPrice * quantity).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn primary-btn"
              onClick={() => addToCart(product, quantity)}
              disabled={product.product_stock === 0}
            >
              <span className="btn-icon">🛒</span>
              Add to Cart
            </button>
            <button
              className="buy-now-btn secondary-btn"
              onClick={() => {
                navigate('/checkout', { 
                  state: { 
                    product: { ...product, quantity },
                    directBuy: true 
                  } 
                });
              }}
              disabled={product.product_stock === 0}
            >
              <span className="btn-icon">⚡</span>
              Buy Now
            </button>
          </div>

          <div className="product-tags">
            <span className="tag-label">Categories:</span>
            <div className="tags-container">
              <span className="product-tag electronics">📱</span>
              <span className="product-tag popular">🔥</span>
              <span className="product-tag trending">📈</span>
            </div>
          </div>
        </div>
      </div>

      {showImagePopup && (
        <div className="image-popup-overlay" onClick={() => setShowImagePopup(false)}>
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="image-popup-close"
              onClick={() => setShowImagePopup(false)}
            >
              ×
            </button>
            <h3 className="image-popup-title"></h3>
            <div className="image-popup-grid">
              {product.product_images.map((img, index) => (
                <div key={index} className="image-popup-item">
                  <img
                    src={img}
                    alt={`Product ${index + 4}`}
                    className="image-popup-image"
                    onError={(e) => handleImageError(e, fallbackImage)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="product-details-tabs">
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            <span className="tab-icon">📝</span>
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <span className="tab-icon">⭐</span>
            Features
          </button>
          <button
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            <span className="tab-icon">📊</span>
            Specifications
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span className="tab-icon">💬</span>
            Reviews
          </button>
        </div>
        <div className="tab-content-container">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;