import React from 'react';

import Base from './Base';
import { Link } from 'react-router-dom';
export default function AboutUs() {
  const buyContent = () => (
    <div class="jumbotron ">
      <h1 class="display-4 text-dark ">
        Making an impact through innovation, honesty, and thoughtfulness
      </h1>
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
  return (
    <Base title="Menzo Fashion" description="all about style. ">
      {' '}
      <div class="center-content container-fluid w-75">
        <h1>Our Story</h1>
        <div id="shop-img">
          <img
            src="https://i.pinimg.com/280x280_RS/65/3c/2d/653c2d6533c7a9ad457117db8cf819d2.jpg"
            alt="smple"
            className="w-25 m-5"
          />
        </div>

        <div className="text-weight-lighter">
          <h2>
            For us, Menzo is the spirit of looking at things differently. Trying
            new things even when success is not guaranteed. Not stepping on
            others to get ahead. Thinking about the benefit of others just as
            you’d think about your own. This was the spirit on which Menzo was
            founded in 2020. With the belief that a business cannot be about
            financial gain alone. It is about making a positive impact. That’s
            what Menzo is about.
          </h2>
        </div>
      </div>
      {buyContent()}
      <footer>
        <h3>Check us out around social media:</h3>

        <div class="front-page-blocks" id="sm">
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            target="_blank"
          >
            <i
              class="fa fa-3x fa-facebook-official fa-cog"
              aria-hidden="true"
            ></i>
          </a>

          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            target="_blank"
          >
            <i class="fa fa-3x fa-instagram fa-cog" aria-hidden="true"></i>
          </a>

          <a
            href="https://twitter.com/?lang=en"
            aria-label="Twitter"
            target="_blank"
          >
            <i class="fa fa-3x fa-twitter-square fa-cog" aria-hidden="true"></i>
          </a>

          <a
            href="https://www.snapchat.com"
            aria-label="Snapchat"
            target="_blank"
          >
            <i
              class="fa fa-3x fa-snapchat-square fa-cog"
              aria-hidden="true"
            ></i>
          </a>
        </div>
      </footer>
    </Base>
  );
}
