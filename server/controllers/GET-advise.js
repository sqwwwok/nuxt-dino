const mysql = require('mysql'),
  {usersSQL} = require('../backend.config.js'),
  username2user_id = require('../tools/username2user_id.js');

function handleAdvise (req,res,next) {
  var connection = mysql.createConnection(usersSQL);
  var formData = req.query;
  var username = req.cookies.username;
  if(!username) return res.sendStatus(500);
  // 这里把cookie内的username传入
  username2user_id(username,(err,user_ids)=>{
    if(err) {
      res.sendStatus(500);
      next(err);
    }else if(user_ids.length===1){
      connection.query(
        `INSERT INTO suggestions 
        (advice,contact,user_id) VALUE (
        '${formData.advice}','${formData.contact}',${user_ids[0]}
        );`,
        (err,queryResult)=>{
          if(err){
            res.sendStatus(500);
            throw err;
          }
          res.sendStatus(200);
        }
      )
    }else{
      next(new Error(`Expected 1 user_id but ${user_ids.length}`))
    } 
  })

}

module.exports = (opt) => {
  return handleAdvise
}