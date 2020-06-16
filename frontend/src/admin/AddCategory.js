import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../user/helper/userapicalls';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setSuccess(false);
    setError(null);
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError(null);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(null);
        setName('');
      }
    });
  };

  const successMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-center"
            style={{ display: success ? '' : 'none' }}
          >
            Category is Created Successsfully!
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

  const AddCategoryForm = () => (
    <form>
      <div className="form-group text-left">
        <label className=" " htmlFor="category">
          Enter Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Ex. Summer Collection"
        ></input>
        <button onClick={onSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  const backButton = () => {
    return (
      <Link
        to="/admin/dashboard"
        className=" btn text-white btn-danger my-2 rounded"
      >
        Back
      </Link>
    );
  };

  return (
    <Base
      title="Create category"
      description="create your category"
      className="container "
    >
      <div className="row bg-white rounded mx-5 py-5">
        <div className="col-md-9 offset-md-1  ">
          {successMSG()}
          {errorMSG()}
          {AddCategoryForm()}
          {backButton()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
