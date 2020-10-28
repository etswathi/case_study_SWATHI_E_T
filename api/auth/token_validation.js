const { verify } = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    // console.log(req)
    let token = req.get("authorization");
    console.log("token" + token);
    if (token) {
      token = token.slice(7);
      console.log(token);
      verify(token, "hhh8989", (err, decoded) => {
        console.log(decoded);
        // console.log(decoded.resu.role);
        if (decoded === undefined) {
          res.json({
            message: "invalid token",
          });
        }

        if (req.url === "/addorder") {
          if (decoded.resu.role === "user") {
            if (err) {
              console.log("errrorrr");
              res.json({
                success: false,
                message: "invalid token",
              });
            } else {
              console.log("jii");
              req.user = decoded.resu.id;
              console.log("req");
              console.log(req.user);
              next();
            }
          } else if (decoded.resu.role === "admin") {
            res.json({
              success: false,
              message: "sorry,you are not allowed to access this page",
            });
          }
        }

        if (
          req.url === "/addproduct" ||
          req.url === "/removeproduct/"+req.params.id ||
          req.url === "/updateproduct/"+req.params.id
        ) {
          if (decoded.resu.role === "admin") {
            if (err) {
              console.log("errrorrr");
              res.json({
                success: false,
                message: "invalid token",
              });
            } else {
              console.log("jii");
              req.user = decoded.resu.id;
              console.log("req");
              console.log(req.user);
              next();
            }
          } else if (decoded.resu.role === "user") {
            res.json({
              success: false,
              message: "sorry,you are not allowed to access this page",
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        message: "access denied",
      });
    }
  },
};
