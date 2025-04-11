import React, { useState } from 'react';
import useFetch from '../UseFetch';

const Address = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { data, loading, error } = useFetch('https://new-project-1-beta.vercel.app/addresses');

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(`https://new-project-1-beta.vercel.app/addresses/${addressId}`, 
        {
        method: "DELETE",
      });
      if (!response.ok) {
        throw "Failed to delete address.";
      }
      const data = await response.json();
      if (data) {
        setSuccessMessage("Address Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-3">
      <h2>Available Addresses</h2>
      <div className="row">
        {data && data.map((address, index) => (
          <div key={address._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Address {index + 1}</h5>
                <p><strong>Full Name:</strong> {address.fullName}</p>
                <p><strong>Phone Number:</strong> {address.phoneNumber}</p>
                <p><strong>Address:</strong>
                  <br />
                  {address.addressLine1}
                  <br />
                  {address.addressLine2}
                  <br />
                  {address.city}, {address.state} {address.postalCode}
                  <br />
                  {address.country}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(address._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>{successMessage}</p>
    </div>
  );
};

export default Address;
