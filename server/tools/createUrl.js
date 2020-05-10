const url = require('url');
const baseURLOption = {
  protocol: 'http',
  hostname: 'localhost',
  port: 3000
};
function createUrl (urlOption) {
  return url.format(
    Object.assign(baseURLOption,urlOption)
  );
}
module.exports = createUrl;