import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS//OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="ordersuccess">
      <div className="ordersuccess-box">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with us.</p>
        <p>You will be redirected to the shop page shortly...</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
