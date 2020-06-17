import React from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated, signout } from './helper/userapicalls';

const Profile = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userLeft = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/profile" className="nav-link text-info">
              Account Information
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/cart" className="nav-link text-info">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/orders" className="nav-link text-info">
              My Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/"
              className="nav-link text-danger  text-danger"
              onClick={() => {
                signout(() => setTimeout(() => <Redirect to="/" />, 1000));
              }}
            >
              SignOut
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRight = () => {
    return (
      <div className="card">
        <div className="header bg-dark text-white">Information</div>
        <ul className="list-group text-md-left ">
          <li className="list-group-item">
            <span className="badge badge-info text-white mr-4">Name </span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info text-white mr-4">Email </span>
            {email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base title="Profile">
      <div className="row">
        <div className="col-3">{userLeft()}</div>
        <div className="col-9">{userRight()}</div>
      </div>
    </Base>
  );
};

export default Profile;
