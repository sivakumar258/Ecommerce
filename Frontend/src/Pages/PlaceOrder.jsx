import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CSS/PlaceOrder.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === "") {
        alert(`Please fill the ${key.replace(/([A-Z])/g, ' $1')} field.`);
        return;
      }
    }

    clearCart();
    navigate('/ordersuccess');
  };

  return (
    <div className="placeorder">
      <div className="placeorder-left">
        <h1>Delivery Information</h1>
        <form>
          <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={changeHandler} />
          <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={changeHandler} />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={changeHandler} />
          <input name="street" type="text" placeholder="Street" value={formData.street} onChange={changeHandler} />
          <div className="placeorder-city-state">
            <input name="city" type="text" placeholder="City" value={formData.city} onChange={changeHandler} />
            <input name="state" type="text" placeholder="State" value={formData.state} onChange={changeHandler} />
          </div>
          <div className="placeorder-zip-country">
            <input name="zipcode" type="text" placeholder="Zipcode" value={formData.zipcode} onChange={changeHandler} />
            <input name="country" type="text" placeholder="Country" value={formData.country} onChange={changeHandler} />
          </div>
          <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={changeHandler} />
        </form>
      </div>

      <div className="placeorder-right">
        <h1>Cart Totals</h1>
        <div className="placeorder-total">
          <div>
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div>
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <div>
            <h3>Total</h3>
            <h3>${totalAmount}</h3>
          </div>
        </div>

        <h2>Payment Method</h2>
        <div className="placeorder-payment-methods">
          <div><input type="radio" name="payment" /> Stripe</div>
          <div><input type="radio" name="payment" /> Razorpay</div>
          <div><input type="radio" name="payment" /> Cash On Delivery</div>
        </div>

        <button className="placeorder-place-button" onClick={handleCheckout}>Place Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
