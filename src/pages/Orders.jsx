import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import useFetch from '../UseFetch'; 

const Orders = () => {
  const { cart } = useCart();
  const { data: addressData, loading, error } = useFetch("https://new-project-1-beta.vercel.app/addresses");

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const deliveryCharges = 499;

  useEffect(() => {
    if (!cart.length) return;

    let newTotalPrice = 0;
    let newTotalDiscount = 0;

    cart.forEach((cartItem) => {
      //  cartItem contains price and originalPrice
      const itemPrice = Number(cartItem.price) * Number(cartItem.quantity);
      const itemDiscount = Number(cartItem.originalPrice - cartItem.price) * Number(cartItem.quantity);

      newTotalPrice += itemPrice;
      newTotalDiscount += itemDiscount;
    });

    setTotalPrice(newTotalPrice);
    setTotalDiscount(newTotalDiscount);
  }, [cart]);

  const handleOrderPlacement = async () => {
    try {
      const order = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: addressData[selectedAddressIndex], 
      };
      await axios.post(`https://new-project-1-beta.vercel.app/orders`, order); // Use POST for placing orders
      alert('Order placed successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-3">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Address</h4>
          {addressData && addressData.length > 0 && (
            <div>
              <select value={selectedAddressIndex} onChange={(e) => setSelectedAddressIndex(e.target.value)}>
                {addressData.map((address, index) => (                  
                  <option key={index} value={index}>
                    User {index + 1}                 
                   </option>
                ))}
              </select>
              <div>
                <p>
                  <strong>Full Name:</strong> {addressData[selectedAddressIndex].fullName}
                </p>
                <p>
                  <strong>Phone Number:</strong> {addressData[selectedAddressIndex].phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {addressData[selectedAddressIndex].addressLine1}, {addressData[selectedAddressIndex].addressLine2}
                </p>
                <p>
                  <strong>City and Pincode:</strong> {addressData[selectedAddressIndex].city} - {addressData[selectedAddressIndex].postalCode}
                </p>
                <p>
                  <strong>State:</strong> {addressData[selectedAddressIndex].state} 
                </p>
                <p>
                  <strong>Country:</strong> {addressData[selectedAddressIndex].country}
                </p>
              </div>
            </div>
          )}
          <Link to="/addresses" className="btn btn-secondary">
            Edit Address
          </Link>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Price ({cart.length} items): ₹{totalPrice}</p>
          <p>Discount: - ₹{totalDiscount}</p>
          <p>Delivery Charges: ₹{deliveryCharges}</p>
          <hr />
          <h4>Total Amount: ₹{totalPrice+ deliveryCharges}</h4>
          <button className="btn btn-primary" onClick={handleOrderPlacement}>
           Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
