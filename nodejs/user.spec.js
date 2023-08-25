const Client = require("socket.io-client");
const assert = require("jest");
var Info = require('./Info');
var command = {
  CommandType: Info.CommandTypes.StatusService,
  ServiceName: 'My Service'
};
describe('Agent', () => {
  let clientSocket;
  beforeAll((done) => {
    clientSocket = new Client(`http://localhost:${Info.Port}/user`);
    clientSocket.emit("join", JSON.stringify({
      ClientId: clientId
    }));
    clientSocket.on("connect", done);
  })

  afterAll((done) => {
    clientSocket.close();
  });



  // test("receive command:Status Service", (done) => {
  //   clientSocket.on("command", (arg) => {
  //     console.log(arg);
  //     // assert.equal(arg, "world");
  //     done();
  //   });
  // });

  test("send command:Status Service", (done) => {
    clientSocket.emit("command", JSON.stringify(command), done);
  });
})