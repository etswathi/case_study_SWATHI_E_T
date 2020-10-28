var pool = require("../../dbconfig/databaseconfig");

module.exports = {
  createProduct: (body, callback) => {
    console.log("service");
    console.log(body);
    pool.query(
      "insert into products (name, description,price,currency) values (?,?,?,?)",
      [body.name, body.description, body.price, body.currency],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },
  removeProduct: (id, callback) => {
    console.log("service");

    pool.query("delete from products where id=?", [id], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },

  updateProduct: (body, callback) => {
    console.log("service");
    console.log(body);
    pool.query(
      "update products set name = '" +
        body.body.name +
        "', description='" +
        body.body.description +
        "',price='" +
        body.body.price +
        "',currency='" +
        body.body.currency +
        "' where id = " +
        body.params.id,

      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
