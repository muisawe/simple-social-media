const {Pool}  = require("pg");


// const connection = new Client({
//     host:"localhost",
//     user:"root",
     
//     password:"root",
//     database:"social"
// });




 
module.exports = new Pool({connectionString:"postgres://root:root@localhost:5432/social",ssl:false });