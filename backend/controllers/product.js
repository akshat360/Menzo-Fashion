const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.json({
        Error: 'No Product Found in Inventory ',
      });
    }
    req.product = product;
    next();
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json({
    Product: req.product,
  });
};
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 9;
  let sortBy = req.query.sortBy ? req.query.sortBy : 'updatedAt';

  Product.find({})
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.json({ Error: 'No products in Inventory now' });
      }

      return res.json(products);
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.json({
        Error: 'problem with image',
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.json({ Error: 'Please enter all fields' });
    }

    const product = new Product(fields);
    //handling File
    if (file.photo) {
      if (file.photo.size > 3000000) {
        res.send('size is too large');
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to db
    product.save((err, product) => {
      if (err) {
        return res.json({
          err,
          Error: 'Product is not added in DB',
        });
      }
      product.photo = undefined;
      return res.json({
        Msg: 'Product Added Successfull',
        productDetails: product,
      });
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.json({
        Error: 'problem with image',
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    //handling File
    if (file.photo) {
      if (file.photo.size > 3000000) {
        res.send('size is too large');
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //saving to db
    product.save((err, product) => {
      if (err) {
        return res.json({
          err,
          Error: 'Product is not Updation in DB',
        });
      }
      product.photo = undefined;
      res.json({
        Msg: 'Product Updated Successfull',
        productDetails: product,
      });
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.json({
        err,
        Error: 'Product is not removed from DB',
      });
    }
    product.photo = undefined;
    res.json({
      Msg: 'Product Removed Successfull',
      productDetails: product,
    });
  });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.json({
        Error: 'No Categories Found',
      });
    }
    res.json(categories);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.json({
        Error: 'Updating Inventory Failed',
      });
    }
    next();
  });
};
