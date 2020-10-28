var express = require("express");
var router = express.Router();
var {
  createUserController,
  loginFriendByEmailController,
  getUserByIdController,
  getUsersController,
  
} = require("./controllers/users.controller");
var {
  createProductController,
  removeProductController,
  updateProductController
} = require("./controllers/products.controller");

var { createOrderController } = require("./controllers/orders.controller");
var { checkToken } = require("../api/auth/token_validation");

router.get("/get", getUsersController);
router.post("/add", createUserController);
router.post("/addorder", checkToken, createOrderController);
router.post("/addproduct", checkToken, createProductController);
router.put("/updateproduct/:id",checkToken, updateProductController);
router.get("/:id", getUserByIdController);
router.post("/login", loginFriendByEmailController);

router.delete("/removeproduct/:id",checkToken, removeProductController);

module.exports = router;
