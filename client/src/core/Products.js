import React, { useState, useEffect } from 'react';
import Card from './Card';
import Base from './Base';
import { loadCart } from './helper/carthelper';
import { getProducts } from './helper/coreapicalls';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);
  const [showAdded, setShowAdded] = useState(false);

  const goToCart = () => {
    return (
      <div className="row mb-3 ">
        <span className="col-8 offset-md-2 alert alert-lg alert-success text-lg">
          Product Added to Bag .
          <Link to="/cart" className="text-success">
            {'  '}
            CheckOut Now...
          </Link>
        </span>
      </div>
    );
  };

  return (
    <Base
      title="Products"
      description="All Amazing Products"
      className=" container "
    >
      {showAdded && goToCart()}
      <div className="row justify-content-md-center ">
        {products.map((product, index) => (
          <div key={index} className="col-4 col-md-auto mb-5">
            <Card product={product} showAdded={setShowAdded}></Card>
          </div>
        ))}
        <div className="col-4 col-md-auto mb-5"></div>
      </div>
    </Base>
  );
};

export default Products;
