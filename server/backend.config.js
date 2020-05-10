const usersSQL = {
  database: 'users',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306
},
  VALIDITY_TIME=7;

// 接受的参数单位是天
function getExpires(dayCount=VALIDITY_TIME){
  return new Date(Date.now()+dayCount*24*60*60*1000);
}
module.exports = {
  usersSQL,
  getExpires,
}