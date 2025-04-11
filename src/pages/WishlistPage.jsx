import React, { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';  

const WishlistPage = () => {
  const { wishlist, moveToCart, clearWishlist } = useWishlist();
  const { addToCart } = useCart();  

  const [sizes, setSizes] = useState({});
  const [notification, setNotification] = useState('');

  const handleMoveToCart = (product) => {
    if (!sizes[product._id]) {
      showNotification('Please select a size');
      return;
    }

    // Update the product with the selected size
    const updatedProduct = { ...product, size: sizes[product._id] };

    // Add the updated product to the cart
    addToCart(updatedProduct);  

    // Remove the product from the wishlist
    moveToCart(product);

    // Reset selection
    setSizes((prevSizes) => {
      const newSizes = { ...prevSizes };
      delete newSizes[product._id];
      return newSizes;
    });

    showNotification('Item moved to cart');
  };

  const handleSizeSelect = (productId, size) => {
    setSizes((prevSizes) => ({ ...prevSizes, [productId]: size }));
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000); // To clear notification after 3 seconds
  };

  if (wishlist.length === 0) {
    return <div className="container mt-3">Your wishlist is empty.</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Your Wishlist</h2>
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          clearWishlist();
          showNotification('Wishlist cleared');
        }}
      >
        Clear Wishlist
      </button>
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
      {wishlist.map((item) => (
        <div key={item._id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: ₹{item.price}</p>
                <div className="mb-3">
                  <label className="form-label">Select Size:</label>
                  <div>
                    {["S", "M", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        className={`btn btn-outline-secondary mx-1 ${
                          sizes[item._id] === size ? "active" : ""
                        }`}
                        onClick={() => handleSizeSelect(item._id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
