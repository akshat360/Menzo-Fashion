import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../backend';
import { addItemToCart, removeItemFromCart } from './helper/carthelper';

export default function Card({
  product,
  addtocart = true,
  removefromcart = false,
  count = 1,
  showAdded = false,
}) {
  const pname = product ? product.name : 'Trendy Tshirt';

  const pdescription = product
    ? product.description
    : 'Black solid waist length T-shirt, has a round neck, short sleeves';
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : 'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1739668/2017/2/14/11487057645816-Jack--Jones-Men-Tshirts-7081487057645319-1.jpg';
  const pprice = product ? product.price : 500;

  const [isAdded, setIsAdded] = useState(false);
  const addToCart = () => {
    addItemToCart(product, () => {
      setIsAdded(true);
      showAdded(true);
    });
  };

  const showAddToCart = (addtocart) => {
    return (
      <div>
        {addtocart && !isAdded && (
          <button
            onClick={addToCart}
            className="w-100 btn rounded btn-outline-dark d-block "
          >
            Add to Cart
          </button>
        )}
        {addtocart && isAdded && (
          <div>
            <button className="w-100 btn rounded  btn-dark d-block ">
              Added to Cart
            </button>
          </div>
        )}
      </div>
    );
  };

  const showRemoveFromCart = (removefromcart) => {
    return (
      removefromcart && (
        <div>
          <div className="my-1">Quantity : {count}</div>
          <button
            onClick={() => {
              removeItemFromCart(product._id);
            }}
            className="w-100 d-block btn rounded btn-outline-danger"
          >
            Remove from Cart
          </button>
        </div>
      )
    );
  };
  return (
    <div>
      <div className="card p-1" style={{ width: '18rem' }}>
        <img className="card-img-top" src={imageUrl} alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{pname}</h5>
          <p className=" text-sm-center text-secondary font-weight-lighter ">
            {pdescription}
          </p>
          <p className="">&#8377; {pprice}</p>
          {showAddToCart(addtocart)}
          {showRemoveFromCart(removefromcart)}
        </div>
      </div>
    </div>
  );
}
