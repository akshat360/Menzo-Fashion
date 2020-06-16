import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Products from './core/Products';
import Cart from './core/Cart';
import Order from './core/Order';
import ContactUs from './core/ContactUs';
import Profile from './user/Profile';
import AboutUs from './core/AboutUs';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/aboutus" component={AboutUs} />

        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <PrivateRoute exact path="/user/orders" component={Order} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
