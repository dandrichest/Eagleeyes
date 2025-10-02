
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants/data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  
  const [message, setMessage] = useState('');

  const handleAddToCart = () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (user.role !== Role.CUSTOMER) {
      setMessage('Only customers can add items to the cart.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    if (product && product.stock > 0) {
      addToCart(product);
      // NOTE: In a real app, stock would be managed server-side.
      // Here we simulate it by reducing stock on the mock data object.
      product.stock -= 1; 
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!product) {
    return <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
      <Link to="/store" className="text-secondary hover:underline mt-4 inline-block">Back to Store</Link>
      </div>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{product.name}</h1>
          <p className="text-md text-gray-500 mb-4">{product.category}</p>
          <p className="text-4xl font-bold text-secondary mb-6">₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
           <p className="text-gray-600 mb-4 font-semibold">Available Stock: {product.stock}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          {message && <p className="text-green-600 text-center mt-2 text-sm">{message}</p>}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Specifications</h3>
            <ul className="space-y-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-semibold text-gray-600">{key}:</span>
                  <span className="text-gray-800">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;