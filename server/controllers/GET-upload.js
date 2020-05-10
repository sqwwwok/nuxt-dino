var option;
const mysql = require('mysql'),
  {usersSQL} = require('../backend.config'),
  username2user_ids = require('../tools/username2user_id');

function handleUpload (req,res,next) {
  // 这里应有核验
  var username = req.cookies.username,
    time = new Date(),
    score = req.query.score;
  if(!username) return res.sendStatus(500);
  username2user_ids(username,(err,user_ids)=>{
    if(err){
      res.sendStatus(500);
      next(err);
    }else if(user_ids.length===1){
      let connection = mysql.createConnection(usersSQL);
      connection.query(
        `INSERT INTO historys 
        (time,score,user_id) VALUE (
        ${connection.escape(time)},'${score}',${user_ids[0]}
        );`,
        (err,queryResult)=>{
          if(err){
            res.sendStatus(500);
            next(err);
          }else{
            res.sendStatus(200);
          }
          
        }
      )
    }else{
      next(new Error(`Expected 1 user_id but ${user_ids.length}`))
    }
  })
}

module.exports = (opt)=>{
  option = opt;
  return handleUpload;
}