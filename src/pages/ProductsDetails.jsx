import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../UseFetch";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(
    `https://new-project-1-beta.vercel.app/products/${id}`
  );

  const { addToCart } = useCart();
  const { addtoWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart({ ...product, quantity: quantity, size: selectedSize }); // Adding product with quantity and size
    alert("Item added to cart!");
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    addtoWishlist(product);
    alert("Item added to wishlist!");
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log("Product Features:", product.features);  

  return (
    <div className="bg-light">
      <div className="container">
        <div className="card">
          <div className="row">
            {/* Product Image Section */}
            <div className="col-md-4">
              <img
                className="img-fluid"
                src={product.images[0]} //  first image is displayed
                alt={product.title}
              />
              <div className="text-center">
                <button
                  className="btn btn-secondary mt-2"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline-secondary mt-2"
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="col-md-8">
              <div className="card-body">
                {/* Title */}
                <h3>{product.title}</h3>

                {/* Rating */}
                <p>
                  <strong>Rating:</strong> {product.rating} ⭐⭐⭐⭐
                </p>

                {/* Price */}
                <p>
                  <strong>₹{product.price}</strong>{" "}
                  <strike>₹{product.originalPrice}</strike>
                  {product.discountPercentage ? ` (${product.discountPercentage}% off)` : ""}
                </p>

                {/* Quantity Selector */}
                <p>
                  <strong>Quantity:</strong>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </p>

                {/* Size Selector */}
                <p>
  <strong>Size:</strong>{" "}
  {["S", "M", "XL", "XXL"].map((size) => (
    <button
      key={size}
      className={`btn btn-outline-secondary mx-1 ${
        selectedSize === size ? "active" : ""
      }`}
      onClick={() => setSelectedSize(size)}
    >
      {size}
    </button>
  ))}
</p>


                {/* Features */}
                <hr />
                <h5>Key Features:</h5>
                {product.features && product.features.length > 0 ? (
  <ul>
    {product.features.map((feature, index) => (
      <li key={index}>
        {Object.keys(feature).map((key) => (
          <span key={key}>{feature[key]}</span>
        ))}
      </li>
    ))}
  </ul>
) : (
  <p>No features available.</p>
)}

              </div>
            </div>
          </div>

          {/* Suggested Items Section */}
          <hr />
          <h3 className="mt-4">More items you may like in apparel</h3>
          <div className="row">
            {Array(4)
              .fill(product) // used the same product for demo purposes
              .map((item, index) => (
                <div key={index} className="col-md-3">
                  <div className="card mb-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="card-img-top"
                    />
                    <div className="card-body text-center">
                      <h6>{item.title}</h6>
                      <p>₹{item.price}</p>
                      <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
