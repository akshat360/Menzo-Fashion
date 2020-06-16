import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from './helper/adminapicall';
import { isAuthenticated } from '../user/helper/userapicalls';
import { Link } from 'react-router-dom';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [currentCategory, setCurrentCategory] = useState('');

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

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
  const updateHandler = (category) => {
    updateCategory(user._id, token, category._id, currentCategory)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setUpdating(false);
        }
      })
      .catch(console.log('Failed to Update Category'));
  };

  const inputHandler = (event) => {
    setCurrentCategory({ ...currentCategory, name: event.target.value });
  };

  const deleteHandler = (categoryId) => {
    deleteCategory(user._id, token, categoryId)
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          preload();
          setSuccess(true);
        }
      })
      .catch(console.log('cant delete'));
  };

  const successMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-center mt-2"
            style={{ display: success ? '' : 'none' }}
          >
            Operation Performed Successsfully!
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

  const manageCategoriesForm = () => (
    <div>
      {updating && (
        <div>
          <div className="form-group container">
            <input
              type="text"
              placeholder="Update Category Name"
              className="form-control  my-2 "
              onChange={inputHandler}
              value={currentCategory.name}
            ></input>
            <button
              className="btn btn-sm btn-primary rounded mx-1"
              onClick={() => {
                updateHandler(currentCategory);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-danger rounded"
              onClick={() => {
                setUpdating(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {categories.map((cate, index) => (
        <div
          key={index}
          className="form-group text-secondary py-2 bg-light text-left pl-5"
        >
          <span className="text-left">
            {index + 1}.) {cate.name}
          </span>
          {!updating && (
            <span className="float-right pr-3">
              <button
                className="btn-sm btn-info rounded mx-2 "
                onClick={() => {
                  setCurrentCategory(cate);
                  setUpdating(true);
                }}
              >
                EDIT
              </button>
              <button
                className="btn-sm btn-danger rounded "
                onClick={() => {
                  deleteHandler(cate._id);
                }}
              >
                DELETE
              </button>
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Base
      title="Manage Categories Panel"
      description="Manage all Categories here"
    >
      <div className="container bg-white py-3 rounded">
        {successMSG()}
        {errorMSG()}
        {manageCategoriesForm()}
        {backButton()}
      </div>
    </Base>
  );
};
export default ManageCategories;
