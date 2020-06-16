var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_KEY,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(response);
    }
  });
};

exports.makePayment = (req, res) => {
  let paymentMethodNonce = req.body.paymentMethodNonce;
  let amount = req.body.amountFromClient;

  gateway.transaction.sale(
    {
      amount: req.body.amountFromClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    }
  );
};
