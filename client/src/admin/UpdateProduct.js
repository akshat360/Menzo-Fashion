import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import {
  getCategories,
  updateProduct,
  getProduct,
} from './helper/adminapicall';
import { isAuthenticated } from '../user/helper/userapicalls';

const UpdateProduct = ({ computedMatch }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    createdProduct,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    updateProduct(computedMatch.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            name: '',
            description: '',
            price: '',
            stock: '',
            photo: '',
            createdProduct: true,
          });
        }
      })
      .catch(console.log('cant add product'));
  };
  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };
  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,

          formData: new FormData(),
          name: data.Product.name,
          description: data.Product.description,
          stock: data.Product.stock,
          price: data.Product.price,
          category: data.Product.category._id,
        });

        preloadCategories();
      }
    });
  };
  /* eslint-disable */

  useEffect(() => {
    preload(computedMatch.params.productId);
  }, []);

  const successMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-center"
            style={{ display: createdProduct ? '' : 'none' }}
          >
            Product is Updated Successsfully!
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

  const updateProductForm = () => (
    <form>
      <div className="form-group">
        <span className="text text-md">Enter Product Detail</span>

        <div className="text-left px-3">upload a photo</div>
        <label className="btn btn-block btn-light">
          <input
            type="file"
            name="photo"
            accept="image"
            onChange={handleChange('photo')}
            className="form-control "
            placeholder="choose a image"
          ></input>
        </label>
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-light">
          <input
            type="text"
            onChange={handleChange('name')}
            value={name}
            className="form-control "
            placeholder="Enter Name "
          ></input>
        </label>
      </div>
      <div className="form-group"></div>
      <label className="btn btn-block btn-light">
        <textarea
          type="text"
          value={description}
          onChange={handleChange('description')}
          placeholder="Enter Description"
          className="form-control"
        ></textarea>
      </label>
      <div className="form-group">
        <label className="btn btn-block btn-light">
          <input
            type="number"
            onChange={handleChange('price')}
            value={price}
            placeholder="Enter Price"
            className="form-control"
          ></input>
        </label>
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-light">
          <input
            type="number"
            onChange={handleChange('stock')}
            value={stock}
            placeholder="Enter Stock"
            className="form-control"
          ></input>
        </label>
      </div>
      <div className="form-group">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
        >
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <button className="btn btn-primary rounded " onClick={onSubmit}>
          Update
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Product "
      description="Edit Product details"
      className="container"
    >
      <div className="col-8 bg-light py-3 offset-md-2 mb-5">
        {successMSG()}
        {errorMSG()}
        {updateProductForm()}
        {backButton()}
      </div>
    </Base>
  );
};
export default UpdateProduct;
