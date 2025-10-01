import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '../constants/data';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/store/${product.id}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative pb-48 overflow-hidden">
      <img className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.imageUrl} alt={product.name} />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-primary mb-1 truncate">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="text-xl font-bold text-secondary">₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
  </Link>
);


const StorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Our Products</h1>
        <p className="text-gray-600">Find the best security and solar products for your needs.</p>
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            placeholder="Search products..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StorePage;