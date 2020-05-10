const mysql = require('mysql'),
  {usersSQL,getExpires} = require('../backend.config.js'),
  username2user_id = require('../tools/username2user_id');

function register (req,res,next) {
  var connection = mysql.createConnection(usersSQL);
  var formData = req.query;
  // 将用户信息插入数据库，写入cookie
  function insertIntoSql (){
    connection.query(
      `INSERT INTO userinfo (username,password,email) VALUES `+
      `('${formData.username}','${formData.password}','${formData.email}');`,
      (err,queryResult)=>{
        if(err) {
          res.sendStatus(500);
          next(err);
        }else{
          var cookieConfig = {expires: getExpires(), httpOnly: true},
            username = formData.username,
            password = formData.password;
          res.cookie('username',username,cookieConfig)
            .cookie('password',password,cookieConfig)
            .status(200)
            .json({username: formData.username,historys: []});
        }
      }  
    )
  }
  // 检查是否已有用户在数据库中
  username2user_id(formData.username,(err,user_ids)=>{
    if(err){
      res.sendStatus(500);
      next(err);
    }else{
      if(user_ids.length) return res.sendStatus(205);
      insertIntoSql();
    }
  });
}

module.exports = (option)=>{
  return register
}