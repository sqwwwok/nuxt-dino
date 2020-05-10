const Axios = require('axios');

/**
 * @Description: 测试get请求
 * @Paraments: url [...testResponse]
 ** url: String
 ** ...testFuncs: (Axios.response) => return
 * @Return: 
 */
var option;
function testHttp (axiosConfig,...testFuncs) {
  var consoleInfo = '';
  function add (string){
    consoleInfo = consoleInfo + '\n' +string;
  }
  function handleResponse (res){
    add(`Test for ${axiosConfig.url} begin:`);
    testFuncs.forEach((testFunc,index) => {
      try{
        testFunc(res);
        add(`${index+1} testFunc OK`);
      }catch(e){
        add(`${index+1} testFunc Failed:${e}`);
      }
    });
    add(`Test for ${axiosConfig.url} over.`)
    console.log(consoleInfo);
  }
  Axios(axiosConfig)
    .then(res=>handleResponse(res))
    .catch(err=>console.log(`Test for ${axiosConfig.method} ${axiosConfig.url} error: ${err}`));
  return consoleInfo;
}

module.exports = function(selfOption=true){
  option = selfOption;
  return testHttp;
}