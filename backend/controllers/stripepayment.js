const stripe = require('stripe')(process.env.STRIPE_KEY);
const { isAuthenticate } = require('./auth');
const { v4: uuid } = require('uuid');

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  let amount = 0;
  products.map((product) => (amount += product.price));

  idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Payment from E commerce Store',
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};
