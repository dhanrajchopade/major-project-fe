import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Products from './pages/Products'; 
import Orders from './pages/Orders';
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage';
import AddressDetails from './pages/AddressDetails';
import ProductDetails from './pages/ProductsDetails';
import {CartProvider} from './contexts/CartContext'
import { SearchProvider } from './contexts/SearchContext';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <WishlistProvider>       
      <CartProvider>
        <Header />
        <Routes>
         <Route path="/" element={<Homepage />} />
         <Route path="/products" element={<Products/>} />
         <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/cart" element={<CartPage/>} />
         <Route path="/orders" element={<Orders/>} />
         <Route path="/addresses" element={<AddressDetails/>} />
         <Route path="/wishlist" element={<WishlistPage/>} /> 
        </Routes>
        </CartProvider>
        </WishlistProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}
export default App;