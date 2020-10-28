var { createOrder } = require("../services/orders.services");

module.exports = {
  createOrderController: (req, res) => {
    console.log("pro id");
    console.log(req.params.productId);
    console.log(req.user);
    console.log(req.body);
    var body = req;
    console.log("body");
    if (body.body.products.length === 0) {
      res.json({
        message: "please select the products",
      });
    } else {
      createOrder(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "Not able to create new order",
          });
        }
        return res.status(200).json({
          success: true,
          message: result,
        });
      });
    }
  },
};
