import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from './helper/userapicalls';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'a@admin.com',
    password: '12345',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"></Redirect>;
    }
  };

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
    });
  };

  const loadingMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: loading ? '' : 'none' }}
          >
            Loading ....
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
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log('Sign In Request Failed'));
  };

  const signinForm = () => {
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
                value={password}
                type="password"
                onChange={handleChange('password')}
              ></input>
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block ">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In " description="Enter your Credentials">
      {loadingMSG()}
      {errorMSG()}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};
export default Signin;
