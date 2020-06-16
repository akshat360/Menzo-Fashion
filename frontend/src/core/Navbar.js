import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../user/helper/userapicalls';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#FFF' };
  }
  return { color: '#CCC' };
};

const Navbar = ({ history }) => {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg mainColor   ">
        <Link className="navbar-brand text-white" to="/">
          Menzo Fashion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active ">
              <Link
                style={currentTab(history, '/')}
                className="nav-link"
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, '/products')}
                className="nav-link"
                to="/products"
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, '/cart')}
                className="nav-link"
                to="/cart"
              >
                <img
                  alt="cart"
                  src="https://www.nicepng.com/png/full/553-5538470_view-basket-shopping-bag-white-png.png"
                  style={{ width: '15px' }}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, '/profile')}
                className="nav-link "
                to="/profile"
              >
                <img
                  alt="cart"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png"
                  style={{ width: '25px' }}
                  className="rounded-circle bg-white"
                />
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, '/user/dashboard')}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  {/* Dashboard */}
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, '/admin/dashboard')}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, '/signup')}
                  className="nav-link"
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, '/signin')}
                  className="nav-link"
                  to="/signin"
                >
                  SignIn
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li className="nav-item ">
                <span
                  className="nav-link text-danger  bg-danger text-light"
                  onClick={() => {
                    signout(() => {
                      history.push('/');
                    });
                  }}
                >
                  SignOut
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
