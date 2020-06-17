const { Order, ProductCart } = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.json({
          error: 'No order found',
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.json({ Error: 'Order cant be placed' });
    }
    res.json(order);
  });
};

exports.getOrder = (req, res) => {
  return res.json({ orderDetails: req.order });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, orders) => {
      if (err) {
        return res.json({ Error: 'Order cant be Found' });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.ody.orderId },
    {
      $set: {
        status: req.body.status,
      },
    },
    (err, order) => {
      if (err) {
        return res.json({ Error: 'Order cant be Found' });
      }
      res.json(order);
    }
  );
};
