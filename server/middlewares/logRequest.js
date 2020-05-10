function logRequest (req,res,next) {
  // 允许8080端口跨域
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  var startTime = Date.now();
  console.log(`${req.method}: ${req.url} at ${startTime}`)
  next();
  console.log(`${startTime} finished: ${Date.now()-startTime} ms` )
}

module.exports = (opt) => {
  return logRequest;
}