import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSearch } from '../contexts/SearchContext';

const Homepage = () => {
  const { filteredData, loading, error } = useSearch();

 

  // Category Data (passed as Static one because filteredData contains jacket images and not Category images)
  const categories = [
    { _id: "1", title: "Men", imgUrl: "https://wwd.com/wp-content/uploads/2019/09/park-macys-5.jpg?w=1000&h=563&crop=1" },
    { _id: "2", title: "Women", imgUrl: "https://staticbiassets.in/thumb/msid-71158477,width-700,height-525,imgsize-901466/we-entered-through-the-second-floor-which-included-the-jewelry-accessories-and-mens-and-womens-clothing-sections-we-started-browsing-in-the-womens-section-.jpg" },
    { _id: "3", title: "Kids", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinEAwVaUJZsx18ppUmsELn6zlMNKSK4-K28ZVAxR_J7WvnJEiaO3OuiIJrezNGIJ49lo&usqp=CAU" },
    { _id: "4", title: "Electronics", imgUrl: "https://img.freepik.com/premium-photo/electronics-mall-with-large-section-home-automation-smart-home-devices2_995578-3092.jpg" },
    { _id: "5", title: "Home", imgUrl: "https://www.ulcdn.net/media/furniture-stores/coimbatore/avinashiroad/Avinashi-Road-TN-store-mobile.jpg?1683050227" },
  ];

  return (
    <div className="container mt-3">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Category Section */}
      <div className="row mb-4">
        {categories.map(category => (
          <div className="col" style={{ width: '20%' }} key={category._id}>
            <div className="card">
              <Link to={`/products`}>  {/* All categories will route to jackets product listing page */}
                <img
                  src={category.imgUrl}
                  alt={category.title}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}  
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{category.title}</h6>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area  */}
      <div className>
       
        <h3>Explore our amazing collection of products.</h3>
      </div>

      {/* New Arrivals Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">NEW ARRIVALS</h5>
              <h6 className="card-subtitle mb-2 text-muted">Summer Collection</h6>
              <p className="card-text">
                Check out our best winter collection to stay warm in style this season
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">NEW ARRIVALS</h5>
              <h6 className="card-subtitle mb-2 text-muted">Summer Collection</h6>
              <p className="card-text">
                Check out our best winter collection to stay warm in style this season
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
