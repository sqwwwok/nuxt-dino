const mysql = require('mysql'),
  {usersSQL,getExpires} = require('../backend.config.js');
  
function getLogin (req,res,next) {
  // 在数据库查询之前应该先检验数据的可靠性

  var formData = req.cookies.username ? req.cookies : req.query ;
  var user_id;
  var connection = mysql.createConnection(usersSQL);
  // 向客户端返回json数据，设置cookie
  function queryHistorys () {
    connection.query(`SELECT * FROM historys WHERE user_id=${user_id}`,
      (err,HISTORYS)=>{
        if(err){
          res.sendStatus(500);
          next(err);
        }else{
          var username = formData.username,
            password = formData.password,
            historys = HISTORYS.map((history)=>{
              return {time:history.time,score:history.score}
            }),
            cookieConfig = {expires: getExpires(), httpOnly:true};
          // 判断是否有cookie，若无要设置cookie
          if(!req.cookies.username){
            res.cookie('username',username,cookieConfig)
            .cookie('password',password,cookieConfig);
          }
          res.status(200).json({username,historys});
        }
      }
    )
  }
  // 核验formData的用户名，密码
  function queryUserinfo(nextQuery){
    connection.query('SELECT * FROM userinfo',(err,USERS) => {
      if(err){
        res.sendStatus(500);
        next(err);
      }else{
        // 查看username和password是否匹配
        for(let verifyedUser of USERS){
          if(
            verifyedUser.username===formData.username
            && verifyedUser.password===formData.password
          ){
            user_id = verifyedUser.id;
            break;
          }
        }
        // 防止user_id=0
        if(user_id!==undefined){
          nextQuery();
        }else{
          res.sendStatus(205);
        }
      }
    });
  }
  queryUserinfo(queryHistorys)
}

module.exports = (opt) => {
  return getLogin
}