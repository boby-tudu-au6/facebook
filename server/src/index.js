const app = require('./app')
let port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`port is listening  at ${port} dnt worry`);
});
module.exports = server

require("./websocket")

//the server object listens on port 8080
// base url https://xbzfz.sse.codesandbox.io/
 