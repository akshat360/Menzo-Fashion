import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Base = ({ title = 'Menzo Fashion', description = '', children }) => {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <div className="container-fluid text-center bg-light">
        {/*Header*/}
        <div className="jumbotron py-3 bg-white  ext-center">
          <h3 className="display-6 text-dark">{title}</h3>
          <p className="lead text-sm text-secondary">{description}</p>
        </div>
        {/*BODY*/}
        <div>{children}</div>

        {/*Footer*/}
        <footer className="footer mainColor  mt-5 py-3">
          <div className=" text-sm text-white text-left pl-3">
            <h5>If you got any questions , Need Help? </h5>
            <Link className="btn btn-warning btn-sm my-2" to="/contactus">
              contact us{' '}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Base;
