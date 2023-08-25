# About

This test are about a application that is wrote in java script. It is a server that send messages to clients. It's wrote on socket.io, you can read about socket.io at [Socket Doc](https://socket.io/docs/v2/).

There are two types of clients : `users` and `agents`. users send the commands to agents. in [Info.js](./Info.js) file, the all command is declared as `CommandTypes` and in front of `ResponseTypes`are responses tahat agents return.

As mentioned, tow socket server (agent,user) are created for sending and receiving. `SendCommand` function are

## Agent Namespace

This socket response for 3 requests:

- **Join:** this event receive information about agent like id and name and add the agent to a collection(is named `agents`). this collection is used in `SendCommand` function to find specific agent.
- **disconnect:** this event remove agent from socket.
- **message:** receive response from agent then send to `ProcessResponse` for processing.

### Response Message

Response message is a object with properties: `Result`: a flag taht contains information about the response has error or not.`Message`: describe error if `Result` is false.  `ResponseType`: type of response that is defined in [Info File](./Info.js). `ResponseBody`: contains all information of response

```javascript
const response = {
  Result: true,
  ClientId: clientId,
  Message: '',
  ResponseType: Info.ResponseTypes.ServiceInstalled,
  ResponseBody: null,
}
```

## User Namespace



## Instructions

 first create a fork of the repository, then start . you should write the app in typescript and make a structure and design for it.

## Goals

1. Typescript
2. Data Structures
3. Documents
4. Object-oriented programming
5. SOLID,GRASP,DRY,YAGNI,KISS
6. Design Patterns
7. Architecture like onion, hexagon, clean
8. Conventional Commits(Git)
