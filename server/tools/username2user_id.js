const mysql = require('mysql'),
 {usersSQL} = require('../backend.config');

function usernameTOuser_id (username,callback) {
  var connection = mysql.createConnection(usersSQL);
  connection.query(
    `SELECT * FROM userinfo WHERE username='${username}'`,
    (queryError,queryResult)=>{
      var user_ids=[],err;
      if(queryError){
        err = new Error(
          `username-user_id.js sql connection error:${queryError}`
        )
      }else{
        for(let user of queryResult){
          user_ids.push(user.id);
        }
      }
      callback(err,user_ids);
    }
  )
  connection.end();
}

module.exports = usernameTOuser_id