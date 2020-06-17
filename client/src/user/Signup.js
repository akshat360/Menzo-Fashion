import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from './helper/userapicalls';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
    });
  };
  const successMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
          >
            Account is Created Successsfully! PLease
            <Link to="/signin"> SignIn Here </Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: true });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in Signup'));
  };
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <img
            className="img mx-auto d-block "
            alt="user Icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
            style={{ width: '15%' }}
          />
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange('name')}
                value={name}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={handleChange('email')}
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange('password')}
                value={password}
              ></input>
            </div>
            <button className="btn btn-success btn-block " onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Create a new account" description="It's quick and easy.">
      {successMSG()}
      {errorMSG()}
      {signupForm()}
    </Base>
  );
};
export default Signup;
