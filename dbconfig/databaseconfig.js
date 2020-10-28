var {createPool} = require('mysql')

var pool = createPool({
    port:process.env.DATABASE_PORT,
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    connectionLimit:8

})

module.exports = pool