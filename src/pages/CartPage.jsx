import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import useFetch from '../UseFetch';
import { useWishlist } from '../contexts/WishlistContext';

const CartPage = () => {
    const { cart, setCart, removeFromCart, clearCart } = useCart(); 
    const [notification, setNotification] = useState('');
    const [itemCount, setItemCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const deliveryCharges = 499;
    const { data: products, loading, error } = useFetch("https://new-project-1-beta.vercel.app/products");
    const { addtoWishlist } = useWishlist();

    // Loaded cart data from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart)); // Update the cart state with stored data
        }
    }, [setCart]);

    // Saved cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Calculated totals when cart or products change
    useEffect(() => {
        if (loading || error || !products) return;

        let newCount = 0;
        let newTotalPrice = 0;
        let newTotalDiscount = 0;

        cart.forEach(cartItem => {
            const product = products?.find(p => p._id === cartItem._id);
            if (product) {
                newCount += cartItem.quantity;
                const itemPrice = Number(product.price) * Number(cartItem.quantity);
                const itemDiscount = Number(product.originalPrice - product.price) * Number(cartItem.quantity);

                newTotalPrice += itemPrice;
                newTotalDiscount += itemDiscount;
            }
        });

        setItemCount(newCount);
        setTotalPrice(newTotalPrice);
        setTotalDiscount(newTotalDiscount);
    }, [cart, products, loading, error]);

    const finalAmount = Number(totalPrice) - Number(totalDiscount) + Number(deliveryCharges);

    const handleRemove = (productId) => {
        removeFromCart(productId);
        setNotification('Product has been removed from the cart');
        setTimeout(() => setNotification(''), 3000);
    };

    // Handle moving to wishlist
    const handleMoveToWishlist = (product) => {
        addtoWishlist(product);
        removeFromCart(product._id);
        alert("Item moved to wishlist!");
    };

    if (loading) {
        return <div className="container mt-3">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-3">Error: {error}</div>;
    }

    if (cart.length === 0) {
        return <div className="container mt-3">Your cart is empty.</div>;
    }

    return (
        <div className="container mt-3">
            <h2>Your Cart</h2>
            {notification && (
                <div className="alert alert-warning" role="alert">
                    {notification}
                </div>
            )}

            <div className="row">
                {/* Products Card */}
                <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Products in Your Cart</h5>
                            {cart.map((cartItem) => {
                                const product = products?.find(p => p._id === cartItem._id);
                                if (!product) return null;

                                return (
                                    <CartItem
                                        key={cartItem._id}
                                        item={product}
                                        cartItem={cartItem}
                                        removeFromCart={handleRemove}
                                        handleMoveToWishlist={handleMoveToWishlist} 
                                    />
                                );
                            })}
                            <button className="btn btn-danger" onClick={() => { 
                                clearCart(); 
                                localStorage.removeItem('cart'); 
                            }}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Price Details Card */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Price Details</h5>
                            <p>Price ({itemCount} item): ₹{totalPrice}</p>
                            <p>Discount: ₹{totalDiscount}</p>
                            <p>Delivery Charges: ₹{deliveryCharges}</p>
                            <hr />
                            <h4>Total Amount: ₹{totalPrice +deliveryCharges}</h4>
                            <p>You will save ₹{totalDiscount} on this order</p>
                            <Link to="/orders" className="btn btn-primary">
                                Place Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartItem = ({ item, cartItem, removeFromCart, handleMoveToWishlist }) => {
    return (
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={item.images[0]}
              alt={item.title}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">Price: ₹{item.price}</p>
              <p className="card-text">Original Price: ₹{item.originalPrice}</p>
              <p className="card-text ">Discount: ₹{(item.originalPrice - item.price)}</p>

              <p><strong>Quantity:</strong> {cartItem.quantity}</p>  {/* Qty */}
              <button
                className="btn btn-danger mt-2"
                onClick={() => removeFromCart(item._id)}
              >
                Remove from Cart
              </button>
              <button 
                className='btn btn-primary' 
                onClick={() => handleMoveToWishlist(item)}>
                  Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CartPage;
