import React, { useState, useEffect } from 'react';
import Base from './Base';
import { loadCart } from './helper/carthelper';
import Card from './Card';
import { Link } from 'react-router-dom';
import StripeCheckout from './StripeCheckout';
import BTPayment from './BTPayment';
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [method, setMethod] = useState('stripe');

  const loadProducts = () => {
    setProducts(loadCart());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const paymentMethods = () => (
    <div>
      <label forHtml="payment">Choose a Payment Method</label>

      <select name="paymentmethod" id="method" onChange={handleChange}>
        <option value="stripe">Pay with Stripe</option>
        <option value="paypal">Pay with Paypal</option>
      </select>
      <div className="my-3 border">
        {method === 'stripe' ? (
          <StripeCheckout products={products} />
        ) : (
          <BTPayment products={products} />
        )}
      </div>
    </div>
  );

  return (
    <Base title="My Shopping Bag" description="">
      {products.length === 0 && (
        <div className="pb-5 mb-5">
          <Link to="/products">
            <img
              alt="Empty Cart"
              src="https://jilt.com/wp-content/uploads/2018/09/shopify-empty-cart-button-result.png"
            />
          </Link>
        </div>
      )}
      {products.length !== 0 && (
        <div className="row ">
          <span className="col-6 mx-5">
            {products.map((product, index) => (
              <Card
                key={index}
                product={product}
                addtocart={false}
                removefromcart={true}
                count={1}
              />
            ))}
          </span>
          <span className="col-3">{paymentMethods()}</span>
        </div>
      )}
    </Base>
  );
};
export default Cart;
