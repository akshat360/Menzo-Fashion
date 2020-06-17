import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../user/helper/userapicalls';
import { Link } from 'react-router-dom';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteHandler = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preload();
        setSuccess(true);
      }
    });
  };

  const successMSG = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-center mt-2"
            style={{ display: success ? '' : 'none' }}
          >
            Product is Deleted Successsfully!
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

  const manageProductForm = () => (
    <div>
      {products && (
        <div className="row form-group bg-light  mx-1">
          <table class="table mt-1 mx-2">
            <thead className="bg-info text-dark ">
              <tr>
                <th scope="col">Product Code</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Sold</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            {products.map((product, index) => (
              <tbody>
                <tr className="text-secondary">
                  <th scope="row">{product._id}</th>
                  <td>{product.name}</td>
                  <td>&#8377;{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold}</td>
                  <td>
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="btn btn-primary btn-sm rounded mx-1"
                    >
                      EDIT
                    </Link>
                    <button
                      className="btn btn-danger btn-sm rounded mx-1"
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );

  return (
    <Base title="Manage Product Panel" description="Manage all Product here">
      <div className="bg-light">
        {successMSG()}
        {errorMSG()}
        {manageProductForm()}
        {backButton()}
      </div>
    </Base>
  );
};
export default ManageProducts;
