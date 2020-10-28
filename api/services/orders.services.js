var pool = require("../../dbconfig/databaseconfig");

module.exports = {
  createOrder: (body, callback) => {
    console.log("service");
    console.log(body);

    let payment_total = 0;
    body.body.products.map((p) => {
      payment_total = payment_total + p.price;
      console.log(payment_total);
    });

    payment_id = body.user + 2;

    (query1 =
      "insert into orders (payment_id, payer_id,payment_total,users_id) values (?,?,?,?)"),
      // [body.body.payment_id, body.user, payment_total, body.user];

      (query2 =
        "insert into order_items (orders_id, products_id) values (?,?)"),
      pool.query(
        query1,
        [payment_id, body.user, payment_total, body.user],
        (err, result) => {
          console.log(result);
          if (err) {
            callback(err);
          }
          console.log(body.body);
          console.log(body);
          body.body.products.map((p) => {
            console.log(p.id);
            let id = p.id;
            pool.query(query2, [result.insertId, id], (err, result) => {
              console.log(result);

              if (err) {
                console.log("error order item");
              } else {
                console.log("success order_item");
              }
            });
          });

          return callback(null, result);
        }
      );
  },
};
