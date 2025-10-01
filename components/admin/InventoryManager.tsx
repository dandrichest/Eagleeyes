import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants/data';
import { Product } from '../../types';

const InventoryManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  // In a real app, you would have state for forms, editing, etc.
  // This is a simplified display.

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Manage Inventory</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-light">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Stock</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">₦{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline text-sm mr-2">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <button className="mt-6 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition duration-300">
            Add New Product
        </button>
    </div>
  );
};

export default InventoryManager;