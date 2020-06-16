import React, { useState, useEffect } from 'react';

import { loadCart, emptyCart } from './helper/carthelper';
import { isAuthenticated } from '../user/helper/userapicalls';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymenthelper';
import { createOrder } from './helper/orderhelper';
import DropIn from 'braintree-web-drop-in-react';

const BTPayment = ({ products }) => {
  const [info, setInfo] = useState({
    loading: false,
    error: null,
    success: false,
    clientToken: null,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((data) => {
      if (data.error) {
        setInfo({ ...data, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((product) => (amount += product.price));
    return amount;
  };

  const onBuy = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success });
          emptyCart();
        })
        .catch((error) => {
          setInfo({ ...info, success: false, loading: false });
        });
    });
  };

  const dropInComponent = () => {
    return (
      <div>
        {info.clientToken !== null && token && products.length !== 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-success rounded"
              onClick={onBuy}
            >
              Place Order
            </button>
          </div>
        ) : (
          <div className="d-block text-secondary my-3">
            Please SignIn First, to Place Order!
            <Link to="/signin" className="btn btn-danger rounded d-block mt-2">
              Sign In
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="m-5">
      Total Amount : &#8377;{getAmount()}
      {dropInComponent()}
    </div>
  );
};
export default BTPayment;
