
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-2">Your Cart is Empty</h1>
        <p className="text-xl text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/store" className="bg-secondary hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition duration-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-4">Your Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                <p className="text-sm text-gray-500">₦{item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  max={item.stock + item.quantity} // Allow up to original stock
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                  className="w-16 p-1 border border-gray-300 rounded-md text-center"
                />
              </div>
              <p className="text-lg font-bold w-32 text-right">₦{(item.price * item.quantity).toLocaleString()}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6">
        <h2 className="text-2xl font-bold text-primary">Subtotal: <span className="text-secondary">₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h2>
        <button className="mt-4 md:mt-0 w-full md:w-auto bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
