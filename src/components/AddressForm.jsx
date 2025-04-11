import React, { useState } from 'react';
import useFetch from '../UseFetch';

const AddressDetails = () => {
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const { data, loading, error } = useFetch('https://new-project-1-beta.vercel.app/addresses');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await fetch('https://new-project-1-beta.vercel.app/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });
      alert('Address added successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Add a New Address</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={address.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="number"
              className="form-control"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address Line 1:</label>
            <input
              type="text"
              className="form-control"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address Line 2:</label>
            <input
              type="text"
              className="form-control"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Postal Code:</label>
            <input
              type="text"
              className="form-control"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={address.country}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Address
          </button>
        </form>
      )}
    </div>
  );
};

export default AddressDetails;
