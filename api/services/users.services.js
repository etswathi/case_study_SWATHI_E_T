var pool = require("../../dbconfig/databaseconfig");

module.exports = {
  createUser: (body, callback) => {
    pool.query(
      "insert into users (first_name, last_name,email,password,role) values (?,?,?,?,?)",
      [body.first_name, body.last_name, body.email, body.password, body.role],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    console.log("hiiiiii");

    pool.query("select * from users where email=?", [email], (err, result) => {
      console.log(result);
      console.log(err);
      if (result.length === 0) {
        console.log("erorrrrr");
        callback(null, result);
      } else if (err) {
        callback(err);
      } else {
        console.log("else");
        return callback(null, result[0]);
      }
    });
  },
  getUserById: (id, callback) => {
    pool.query(`select * from users where id = ?`, [id], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },
  getUsers: (callback) => {
    pool.query(
      "select * from users",

      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },
  updateFriend: () => {},
  deleteFriend: () => {},
};
