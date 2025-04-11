import React from 'react';
import { Link } from "react-router-dom";
import { useSearch } from '../contexts/SearchContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="navbar navbar-light navbar-expand-lg bg-body-tertiary bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MyShoppingPlace
        </Link>
        <div className="text-center">
          <div className="mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search your favourite Jackets.."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div>
          <ul className="navbar-nav d-flex flex-row">
            <button>Login</button>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/addresses">
                User Address
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
