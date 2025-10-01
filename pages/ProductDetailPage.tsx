import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants/data';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

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
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          <button className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
            Add to Cart
          </button>
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