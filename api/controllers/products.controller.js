var {
  createProduct,
  removeProduct,
  updateProduct,
} = require("../services/products.services");

module.exports = {
  createProductController: (req, res) => {
    var body = req.body;
    console.log("body");
    console.log(body);

    if (
      body.name === "" ||
      body.description === "" ||
      body.price === "" ||
      body.currency === ""
    ) {
      res.
        json({
          message: "please fill all the fields",
        });
    } else {
      createProduct(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "Not able to create new product",
          });
        }
        return res.status(200).json({
          success: true,
          message: result,
        });
      });
    }
  },

  removeProductController: (req, res) => {
    var id = req.params.id;

    removeProduct(id, (err, result) => {
      
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Not able to remove product",
        });
      }
      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },

  updateProductController: (req, res) => {
    var body = req;
    console.log("body");
    console.log(body);
    if (
      body.body.name === "" ||
      body.body.description === "" ||
      body.body.price === "" ||
      body.body.currency === ""
    ) {
      res.json({
        message: "please fill all the fields",
      });
    } else {
      updateProduct(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "not able to update product",
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
