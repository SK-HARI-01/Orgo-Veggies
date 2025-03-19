import React, { useState } from 'react';
import './Cart.css';

function Cart({ cart, updateCart, onClose }) {
  const [userName, setUserName] = useState('');
  const [userWhatsApp, setUserWhatsApp] = useState('');

  const increaseQuantity = (id) => {
    updateCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    updateCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    updateCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle order submission
  const handleSubmit = () => {
    if (!userName || !userWhatsApp) {
      alert('Please enter your name and WhatsApp number.');
      return;
    }

    const cartDetails = cart
      .map((item) => `${item.description} (x${item.quantity}) - Rs.${item.price * item.quantity}`)
      .join(', ');

    const message = `Hello, ${userName}.\n My order: ${cartDetails}. \nTotal: Rs.${totalAmount}.`;
    const whatsappLink = `https://wa.me/+91${userWhatsApp}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp chat with pre-filled message
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <button className="cart-close" onClick={onClose}>×</button>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>Rs.{item.price}</td>
                    <td>
                      <div className="quantity-container">
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      </div>
                    </td>

                    <td>Rs.{item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Total: Rs.{totalAmount}</h3>
            
            <div className="user-details">
            <table>
            <div className="user-info">
              <label htmlFor="userName">Your Name:</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* WhatsApp Number Input */}
            <div className="user-info">
              <label htmlFor="userWhatsApp">WhatsApp Number:</label>
              <input
                type="text"
                id="userWhatsApp"
                placeholder="Enter your WhatsApp number"
                value={userWhatsApp}
                onChange={(e) => setUserWhatsApp(e.target.value)}
              />
            </div>

            <button onClick={handleSubmit}>Send Order via WhatsApp</button>
            </table></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
