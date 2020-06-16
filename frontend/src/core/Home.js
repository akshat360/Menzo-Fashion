import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { getProducts } from './helper/coreapicalls';
import Card from './Card';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const corousel = () => {
    return (
      <Carousel className="">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/wsS8KLZ/five.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Menzo fashion</h3>
            <p>Fit your Style.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/V9nLZTM/nine.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Get Trendy Tshirt Designs</h3>
            <p>and Make everyone go wow.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ibb.co/W5vnk8j/eleven.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Wear your own Style</h3>
            <p>Be your own Boss.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  };

  const buyContent = () => (
    <div class="jumbotron">
      <h1 class="display-4 text-dark">Welcome to Menzo Fashion!</h1>
      <p class="lead">
        Menzo is a one stop shop for all your fashion and lifestyle needs. Being
        India's New Emerging e-commerce store for fashion and lifestyle
        products, Menzo aims at providing a hassle free and enjoyable shopping
        experience to shoppers across the country with the widest range of
        brands and products on its portal.
      </p>
      <hr class="my-4" />
      <p>Menzo Provides the wide variety of fashion statements.</p>
      <p class="lead">
        <Link className="btn mainColor btn-lg rounded" to="/products">
          Browse All Products
        </Link>
      </p>
    </div>
  );

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

  const showProducts = () => (
    <div className="row justify-content-md-center ">
      {products.map((product, index) => (
        <div key={index} className="col-4 col-md-auto mb-5">
          <Card product={product} addtocart={false}></Card>
        </div>
      ))}
      <div className="col-4 col-md-auto mb-5"></div>
    </div>
  );

  return (
    <Base title="Menzo Fashion" description="Welcome to Menzo Fashion">
      <div className=" ">
        <div className="">{corousel()}</div>
        <div className="my-5">{showProducts()}</div>
        <div className="">{buyContent()}</div>
      </div>
    </Base>
  );
}
