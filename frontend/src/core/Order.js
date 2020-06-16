import React from 'react';
import Base from './Base';
import { Link } from 'react-router-dom';

export default function Order() {
  return (
    <Base title="My Orders" description="Manage your Orders Here">
      <div className="bg-white">
        <h5 className="bg-white py-5">
          Currently No Order Placed For this Account
        </h5>
        <Link
          to="/products"
          className=" btn btn-lg btn-outline-primary d-block  mx-auto col-3"
        >
          Continue Shopping
        </Link>

        <img
          alt="Empty Cart"
          src="https://cdn.dribbble.com/users/357929/screenshots/2276751/orderup-emptystate-sadbag.png"
        />
      </div>
    </Base>
  );
}
