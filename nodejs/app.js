
var httpServer = require('http').createServer();
var io = require('socket.io')(httpServer);
var Info = require('./Info');

var sessions = new Map(),
  agents = new Map(),
  users = new Map(),
  userNameSpace = null;
var port = 3000;
httpServer.listen(Info.Port, () => {
  console.log(`Running on localhost:3000`);
});


//create socket.io server for first Type of clients that is called Agents
(() => {
  io.of('/agent').on('connection', function (socket) {

    //detect client disconnecting
    socket.on('disconnect', function () {

      var clientId = sessions.get(socket.id);
      agents.delete(clientId);
      sessions.delete(sessionId);
    });

    //join clients
    socket.on('join', function (data) {
      const jsonData = JSON.parse(data);
      var clientId = jsonData.ClientId;
      var sessionId = socket.id;

      // socket.join( );

      agents.set(clientId, socket);
      sessions.set(sessionId, clientId);

      //Send client joined to dashboard server
      ProcessResponse({
        Result: true,
        ClientId: clientId,
        Message: '',
        ResponseType: Info.ResponseTypes.ClientJoined,
        ResponseBody: null,
      });
    });

    //received response from agents
    socket.on('message', function (response) {

      if (response.Result)
        ProcessResponse(responseJson);
    });
  });

})();

//create socket.io server for second Type of clients that is called Users

(() => {
  userNameSpace = io.of('/user');
  userNameSpace.on('connection', function (socket) {
    const userId = socket.handshake.query[Config.UserIdQSKey];
    // console.log("user id", userId);

    if (userId != 'null' && !users.has(userId)) {
      users.set(userId, socket);
      console.log("call method to update online state");
      ProcessResponse({
        ResponseType: Info.ResponseTypes.UserStatus,
        Message: userId,
        Result: 1,
      });
    }
    socket.conn.on('heartbeat', function () {
      console.log("call method to update online state");
    });

    socket.on('disconnect', function () {
      const query = socket.handshake.query;
      const userId = query[Config.UserIdQSKey];
      const IsNavigation = query.hasOwnProperty('nav') ? query['nav'] : null;
      users.delete(userId);
      if (!IsNavigation || IsNavigation == 'false') {
        console.log("call method to update online state");
        ProcessResponse({
          ResponseType: Info.ResponseTypes.UserStatus,
          Message: userId,
          Result: 0,
        });
      }
    });

    socket.on('logout', function (userId) {
      users.delete(userId);
      userService.updateOnlineState(userId, false);
      ProcessResponse({
        ResponseType: Info.ResponseTypes.UserStatus,
        Message: userId,
        Result: 0,
      });
    });

    //received command from dashboard
    socket.on('command', function (commandJson) {
      // Update statue of a user that he is isOnline now
      ProcessResponse({
        ResponseType: Info.ResponseTypes.UserStatus,
        Message: userId,
        Result: 1,
      });

      if (commandJson.commandType == Info.CommandTypes.FileInfo && !commandJson.folders) {
        commandDirInfo(commandJson.clientId);
      } else if (commandJson.commandType == Info.CommandTypes.RegistryInfo) {
        commandRegInfo(commandJson.clientId);
      } else {
        //add info of user to request for save user commands log
        commandJson['userData'] = { IP: getIP(socket), id: userId };
        SendCommand(commandJson);
      }
    });
  });
})();

async function SendCommand(cmd) {
  try {

    //find socket by client id
    var socket = agents.get(cmd.clientId);

    if (socket) {
      //prepare body of command

      const cmdObject = {
        CommandType: cmd.commandType,
        DirectoryInfo: !!cmd.DirInfo ? cmd.DirInfo : '',
        ServiceInfo: !!cmd.ServiceName ? cmd.ServiceName : '',
        DeviceInfo: !!cmd.DvcInfo ? cmd.DvcInfo : '',
        RegistryInfo: !!cmd.RegInfo ? cmd.RegInfo : '',
      };
      var message = JSON.stringify(cmdObject);

      //send command to agent
      socket.emit('message', message);

    } else {
      throw new Error('Client not found');
    }
  } catch (error) {
    // console.log(error);
    console.log(error.message);
  }
}

/**
  * @param {Object} response
  * @param {String} response.ClientId
  * @param {String} response.Result
  * @param {String}  response.Message,
  * @param {Info.ResponseTypes}  response.ResponseType
  * @param {Object} response.ResponseBody
  **/
async function ProcessResponse(response) {
  try {
    switch (response.ResponseType) {
      case Info.ResponseTypes.ClientJoined:
        if (!!response.ClientId) {
          const isNewClient = generateRandomBoolean(); // call a method from a service  to check if the client is new
          if (isNewClient) {
            SendCommand({
              clientId: response.ClientId,
              commandType: Info.CommandTypes.RetriveServices,
            });
            commandDirInfo(response.ClientId);
            commandRegInfo(response.ClientId);
          } else {
            broadcastToUsers(response);
          }
          SendCommand({
            clientId: response.ClientId,
            commandType: Info.CommandTypes.SystemInfo,
          });
        } else {
          console.log('ClientId is null');
        }
        break;
      case Info.ResponseTypes.ServicesList:
        if (response.Result) {
          console.log('call a method from a service to save list of services');
        }
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.SystemInfo:
        if (response.Result) {
          console.log('call a method from a service to update system info');
        }
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.FileInfo:
        //#region File Info
        if (response.Result) {
          const files = response.ResponseBody.Files;
          const FileCount = parseInt(response.Message);

          // get file list when one file is del/add
          if (!FileCount && files.length == 1 && files[0].ChangeType != 0) {
            commandDirInfo(response.ClientId);
            break;
          }

          const isUpdateResult = generateRandomBoolean(); // call a method from a service  and return a result
          if (!isUpdateResult) {
            commandDirInfo(response.ClientId);
          }
        }
        broadcastToUsers(response);
        break;
      //#endregion

      case Info.ResponseTypes.ServiceStarted:
      case Info.ResponseTypes.ServiceStoped:
      case Info.ResponseTypes.ServiceInstalled:
      case Info.ResponseTypes.ServiceUninstalled:
        await sendRespToUser(response);
        break;
      case Info.ResponseTypes.ClientDisposed:
        console.log('call a method from a service to dispose client');
        await broadcastToUsers(response);
        break;
      case Info.ResponseTypes.ServiceChanged:
        if (response.Result) {
          const isTarget = generateRandomBoolean(); // call a method from a service to and return a result

          if (isTarget) {
            // do something
            console.log('call a method from a service to save that the service is changed');
            SendCommand({
              clientId: response.ClientId,
              commandType: Info.CommandTypes.RetriveServices,
            });
          } else {
            // set server is online
            console.log("Service Changed");
          }
        }
        break;
      case Info.ResponseTypes.ServiceStatus: // NOTE : Response Commend of Service Status
        if (response.Result) {
          console.log('call a method from a service to update service state');
        }
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.UserStatus:
        await broadcastToUsers(response);
        break;
      case Info.ResponseTypes.VncInfo:
        console.log('call a method from a service to update VNC info');
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.DeviceInfo:
        console.log('call a method from a service to save device info');
        broadcastToUsers(response); //send all because this include scheduler and SNMP
        break;
      case Info.ResponseTypes.SecurityInfo:
        console.log('call a method from a service to save security info');
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.LogInfo:
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.FindDevice:
        sendRespToUser(response);
        console.log('call a method from a service to save devices that are found');
        break;
      case Info.ResponseTypes.SNMPInfo:
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.RegistryInfo:
        console.log('call a method from a service to save registry info');
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.Upload:
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.Install:
        sendRespToUser(response);
        break;
      case Info.ResponseTypes.ChatAsk:
        console.log('call a method from a service to send message info');
        SendCommand({
          clientId: response.ClientId,
          commandType: Info.CommandTypes.ChatReceived,
          MsgInfo: response.ResponseBody.MessageInfo,
        });
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.ChatReceived:
        console.log('call a method from a service to receive message info');
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.Terminal:
        broadcastToUsers(response);
        break;
      case Info.ResponseTypes.CallInfo:
        console.log('call a method from a service to save call information');
        broadcastToUsers(response);
        break;
      default:
        // console.log(response);
        break;
    }
  } catch (error) {
    logger.error(error.message);
  }
}

function broadcastToUsers(response) {
  if (
    response.hasOwnProperty('ResponseBody') &&
    response.ResponseType !== Info.ResponseTypes.ChatReceived &&
    response.ResponseType !== Info.ResponseTypes.Terminal
  ) {
    delete response.ResponseBody; //dont nead body
  }
  if (userNameSpace) {
    userNameSpace.emit('response', response);
  }
}


async function sendRespToUser(response) {

  try {
    const userId = users.keys().next().value; // async call a method from a service to get user id form response
    const userSocket = users.size > 0 && userId ? users.get(userId.toString()) : null;
    if (userSocket) {
      userSocket.emit('response', response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function commandDirInfo(response) {
  // const folders = await folderService.get();
  console.log('call async mehtod find folders');
  if (folders) {
    const DirInfo = {
      Path: Info.DefaultPath[0].Path,
      Extentions: Info.DefaultPath[0].Ext,
    };

    SendCommand({
      clientId: serverId,
      commandType: Info.CommandTypes.FileInfo,
      DirInfo: DirInfo,
    });
  }
  console.log('create command from information of directory');
}

function commandRegInfo(response) {
  SendCommand({
    clientId: serverId,
    commandType: Info.CommandTypes.RegistryInfo,
    userData: null,
    serviceName: null,
    RegInfo: { path: 'HKEY_LOCAL_MACHINE/SOFTWARE/Microsoft/Windows/CurrentVersion/Run', value: 'name' },
  });
}

function generateRandomBoolean() {
  return Math.random() < 0.5;
}

function getIP(socket) {
  try {
    if (socket) {
      const address = socket.handshake.address.split(':');
      return address.length > 3 ? address[3] : address[2];
    }
  } catch (error) {
    logger.error(error.message);
    return 'Unknown';
  }
}