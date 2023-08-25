// const { before, describe, it, run, todo } = require("node:test");

const Client = require("socket.io-client");
const assert = require("jest");
var Info = require('./Info');
var clientId = 1;
const response = {
  Result: true,
  ClientId: clientId,
  Message: '',
  ResponseType: Info.ResponseTypes.ServiceInstalled,
  ResponseBody: null,
}
describe('Agent', () => {
  let clientSocket;
  beforeAll((done) => {
    clientSocket = new Client(`http://localhost:${Info.Port}/agent`);
    clientSocket.emit("join", JSON.stringify({
      ClientId: clientId
    }));
    clientSocket.on("connect", done);
  })

  afterAll((done) => {
    clientSocket.close();
  });



  test("send command:Status Service", (done) => {
    clientSocket.on("command", (arg) => {
      console.log(arg);
      // assert.equal(arg, "world");
      done();
    });
  });

  // test("send response:Status Service", (done) => {
  //   clientSocket.emit("message", JSON.stringify(response), done);
  // });
})