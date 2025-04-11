import React, { useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';


const Products = () => {
 const { filteredData: initialProducts, loading, error } = useSearch();
 const { addToCart } = useCart();
 const { addtoWishlist } = useWishlist();
 const [products, setProducts] = useState([]);
 const [priceRange, setPriceRange] = useState([0, 20000]);
 const [gender, setGender] = useState('all');
 const [rating, setRating] = useState(0);
 const [sortBy, setSortBy] = useState('');


 useEffect(() => {
 // Initialize products with initialProducts
 if (initialProducts && Array.isArray(initialProducts)) {
 
 setProducts(initialProducts);
 } else {
 setProducts([]);
 }
 }, [initialProducts]);


 useEffect(() => {
 if (!initialProducts || !Array.isArray(initialProducts)) return; 


 let filteredProducts = [...initialProducts];


 // Price filter
 filteredProducts = filteredProducts.filter(
 (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
 );


 // Gender filter
 if (gender !== 'all') {
 filteredProducts = filteredProducts.filter((product) => product.gender === gender);
 }


 // Rating filter
 if (rating > 0) {
 filteredProducts = filteredProducts.filter((product) => product.rating >= rating);
 }


 // Sorting
 if (sortBy === 'price-low-to-high') {
 filteredProducts.sort((a, b) => a.price - b.price);
 } else if (sortBy === 'price-high-to-low') {
 filteredProducts.sort((a, b) => b.price - a.price);
 }
 

 setProducts(filteredProducts);
 }, [priceRange, gender, rating, sortBy, initialProducts]);


 const handlePriceChange = (e) => {
 const value = e.target.value;
 if (value === 'all') {
 setPriceRange([0, 2000]);
 } else if (value === 'above1000') {
 setPriceRange([1000, 2000]);
 } else if (value === 'above1500') {
 setPriceRange([1500, 2000]);
 } else if (value === 'above2000') {
 setPriceRange([2000, 2000]);
 }
 };


 const handleGenderChange = (e) => {
 setGender(e.target.value);
 };


 const handleRatingChange = (e) => {
 setRating(parseInt(e.target.value));
 };


 const handleSortChange = (e) => {
 setSortBy(e.target.value);
 };


 // Clear filters
 const handleClearFilters = () => {
 setPriceRange([0, 20000]);  
 setGender('all');
 setRating(0);
 setSortBy('');
 };





 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error}</p>;


 return (
 <div className="container mt-3">
 <div className="row">
 {/* Filters Section */}
 <div className="col-md-3">
 <h3>Filters</h3>
 <button className="btn btn-secondary btn-sm mb-2" onClick={handleClearFilters}>
 Clear
 </button>


 {/* Price Filter */}
 <div className="mb-3">
 <label className="form-label">Price</label>
 <select className="form-select" value={priceRange[0] === 0 ? 'all' : priceRange[0] === 1000 ? 'above1000' : priceRange[0] === 1500 ? 'above1500' : 'above2000'} onChange={handlePriceChange}>
 <option value="all">All</option>
 <option value="above1000">Above ₹1000</option>
 <option value="above1500">Above ₹1500</option>
 <option value="above2000">Above ₹2000</option>
 </select>
 </div>


 {/* Gender Filter */}
 <div className="mb-3">
 <label className="form-label">Gender</label>
 <select className="form-select" value={gender} onChange={handleGenderChange}>
 <option value="all">All</option>
 <option value="Men">Men</option>
 <option value="Women">Women</option>
 </select>
 </div>


 {/* Rating Filter */}
 <div className="mb-3">
 <label className="form-label">Rating</label>
 {[4, 3, 2, 1].map((star) => (
 <div className="form-check" key={star}>
 <input
 className="form-check-input"
 type="radio"
 name="rating"
 id={`rating${star}`}
 value={star}
 checked={rating === star}
 onChange={handleRatingChange}
 />
 <label className="form-check-label" htmlFor={`rating${star}`}>
 {star} Stars & above
 </label>
 </div>
 ))}
 </div>


 {/* Sort By */}
 <div className="mb-3">
 <label className="form-label">Sort By</label>
 <div className="form-check">
 <input
 className="form-check-input"
 type="radio"
 name="sortBy"
 id="priceLowToHigh"
 value="price-low-to-high"
 checked={sortBy === 'price-low-to-high'}
 onChange={handleSortChange}
 />
 <label className="form-check-label" htmlFor="priceLowToHigh">
 Price - Low to High
 </label>
 </div>
 <div className="form-check">
 <input
 className="form-check-input"
 type="radio"
 name="sortBy"
 id="priceHighToLow"
 value="price-high-to-low"
 checked={sortBy === 'price-high-to-low'}
 onChange={handleSortChange}
 />
 <label className="form-check-label" htmlFor="priceHighToLow">
 Price - High to Low
 </label>
 </div>
 </div>
 </div>


 {/* Products Section */}
 <div className="col-md-9">
 <h2>Showing All Products (Showing {products?.length || 0} products)</h2>
 <div className="row">
 {products?.map((product) => (
 <ProductCard
 key={product._id}
 product={product}
 addToCart={addToCart}
 addtoWishlist={addtoWishlist}
 />
 ))}
 </div>
 </div>
 </div>
 </div>
 );
};


const ProductCard = ({ product, addToCart, addtoWishlist }) => {
 const [selectedSize, setSelectedSize] = useState('');
 const [quantity, setQuantity] = useState(1);


 const handleAddToCart = () => {
 if (!selectedSize) {
 alert("Please select a size before adding to cart.");
 return;
 }
 addToCart({ ...product, quantity, size: selectedSize });
 alert("Item added to cart!");
 };


 const handleAddToWishlist = () => {
 addtoWishlist(product);
 alert("Item added to wishlist!");
 };


 const handleQuantityChange = (type) => {
 if (type === 'increment') {
 setQuantity(quantity + 1);
 } else if (type === 'decrement' && quantity > 1) {
 setQuantity(quantity - 1);
 }
 };


 return (
 <div className="col-md-3 mb-4" key={product._id}>
 <div className="card">
 <Link to={`/product/${product._id}`}>
 <img
 src={product.images[0]}
 alt={product.title}
 className="card-img-top"
 style={{ height: '200px', objectFit: 'cover' }}
 />
 </Link>
 <div className="card-body">
 <Link to={`/product/${product._id}`}>
 <h5 className="card-title">{product.title}</h5>
 </Link>
 <p className="card-text">
 <span>₹{product.price}</span>
 <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice}</span>
 </p>
 <p className="card-text">{product.discountPercentage}% off</p>


 {/* Size Selection */}
 <div className="mb-3">
 <label className="form-label">Size:</label>
 <select
 className="form-select"
 value={selectedSize}
 onChange={(e) => setSelectedSize(e.target.value)}
 >
 <option value="">Select Size</option>
 <option value="S">S</option>
 <option value="M">M</option>
 <option value="L">L</option>
 <option value="XL">XL</option>
 </select>
 </div>


 {/* Quantity Selection */}
 <div className="mb-3">
 <label className="form-label">Quantity:</label>
 <div className="d-flex align-items-center">
 <button
 className="btn btn-outline-secondary btn-sm"
 onClick={() => handleQuantityChange('decrement')}
 >
 -
 </button>
 <span className="mx-2">{quantity}</span>
 <button
 className="btn btn-outline-secondary btn-sm"
 onClick={() => handleQuantityChange('increment')}
 >
 +
 </button>
 </div>
 </div>

 <div className="d-flex justify-content-between">
 <button className="btn btn-primary" onClick={handleAddToCart}>
 Add to Cart
 </button>
 <button className='btn btn-primary' onClick={handleAddToWishlist}>Add to Wishlist </button>
 </div>
 
 </div>
 </div>
 
 </div>
 );
};


export default Products;
