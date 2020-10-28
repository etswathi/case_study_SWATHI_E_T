const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

var {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateFriend,
  deleteFriend,
} = require("../services/users.services");

module.exports = {
  createUserController: (req, res) => {
    console.log(req.user);
    var body = req.body;
    console.log(req);
    console.log(body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    if (
      body.first_name === "" ||
      body.last_name === "" ||
      body.email === "" ||
      body.password === "" ||
      body.role === ""
    ) {
      return res.json({
        message: "please fill all the fields",
      });
    } else if (!body.email.includes("@")) {
      return res.json({
        message: "email should contain @",
      });
    } else {
      createUser(body, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "Not able to create new user",
          });
        }
        return res.status(200).json({
          success: true,
          message: result,
        });
      });
    }
  },
  loginFriendByEmailController: (req, res) => {
    const body = req.body;
    console.log(body);
    getUserByEmail(body.email, (err, result) => {
      // console.log(result);
      if (err) {
        console.log("in eror");
        console.log(err);
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      } else if (result.length === 0) {
        res.json({
          message: "invalid email",
        });
      } else {
        const resu = compareSync(body.password, result.password);
        if (resu) {
          result.password = undefined;
          const jsontoken = sign({ resu: result }, "hhh8989", {
            expiresIn: "1h",
          });
          return res.json({
            success: true,
            message: "login successful",
            token: jsontoken,
          });
        } else {
          return res.json({
            success: false,
            message: "invalid email or password",
          });
        }
      }
    });
  },
  getUserByIdController: (req, res) => {
    var id = req.params.id;
    getUserById(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Not able to get user",
        });
      }

      if (result.length === 0) {
        res.json({
          message: "no user exists with id " + id,
        });
      }
      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },
  getUsersController: (req, res) => {
    getUsers((err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Not able to get users",
        });
      }
      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },
  updateFriendController: () => {},
  deleteFriendController: () => {},
};
