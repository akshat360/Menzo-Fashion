import React from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './helper/userapicalls';

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();
  const adminLeft = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
          <li className="list-group-item ">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRight = () => {
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
          <li className="list-group-item">
            <span className="badge badge-danger text-white">Admin Access </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Admin DashBoard" description="Welcome to Admin Dashboard.">
      <div className="row">
        <div className="col-3">{adminLeft()}</div>
        <div className="col-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
