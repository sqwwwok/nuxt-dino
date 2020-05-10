const username2user_ids = require('../tools/username2user_id')
function handleCheck(req,res,next){
  username2user_ids(req.query.username,(err,user_ids)=>{
    if(err){
      res.sendStatus(500);
      throw err;
    }else if(user_ids.length){
      res.sendStatus(205);
    }else{
      res.sendStatus(200);
    }
  })
}  

module.exports = (opt) => {
  return handleCheck
}
