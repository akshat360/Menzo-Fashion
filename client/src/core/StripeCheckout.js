import React from 'react';
import Stripe from 'react-stripe-checkout';
import { emptyCart } from './helper/carthelper';
import { isAuthenticated } from '../user/helper/userapicalls';
import { Link } from 'react-router-dom';
import { API } from '../backend';

const StripeCheckout = ({ products }) => {
  // const { user, token } = isAuthenticated();

  const getAmount = () => {
    let amount = 0;
    products.map((product) => (amount += product.price));
    return amount;
  };

  // const [data, setData] = useState({
  //   loading: false,
  //   success: false,
  //   error: null,
  // });

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        emptyCart();
      })
      .catch((err) => console.log(err));
  };

  const checkoutButton = () => {
    return isAuthenticated() ? (
      <Stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={getAmount() * 100}
        token={makePayment}
        name="Place Order"
        shippingAddress
        billingAddress
      >
        <button className="mt-3 btn rounded btn-success btn-block ">
          Place Order
        </button>
      </Stripe>
    ) : (
      <div className="d-block text-secondary my-3">
        Please SignIn First, to Place Order!
        <Link to="/signin" className="btn btn-danger rounded d-block mt-2">
          Sign In
        </Link>
      </div>
    );
  };
  return (
    <div className="d-block  m-5">
      Total Amount : &#8377;{getAmount()}
      {checkoutButton()}
    </div>
  );
};

export default StripeCheckout;
