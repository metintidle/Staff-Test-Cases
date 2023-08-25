var CommandTypes = {
  RetrieveServices: 0,
  StartService: 1,
  StopService: 2,
  StatusService: 3,
  SystemInfo: 4,
  FileInfo: 5,
  AppUpdate: 6,
  DeviceInfo: 7,
  VncInfo: 8,
  DeviceScheduler: 9,
  SecurityInfo: 10,
  LogInfo: 11,
  FindDevice: 12,
  RegistryInfo: 13,
  Upload: 14,
  Install: 15,
  ChatReceived: 16,
  ChatResponse: 17,
  Terminal: 18,
  // User Activity
  UserStatus: 102,

};

var ResponseTypes = {
  ServicesList: 0,
  ServiceStarted: 1,
  ServiceStopped: 2,
  ServiceStatus: 3,
  ServiceInstalled: 4,
  ServiceUninstalled: 5,
  ServiceChanged: 6,
  SystemInfo: 7,
  FileInfo: 8,
  VncInfo: 9,
  DeviceInfo: 10,
  SecurityInfo: 11,
  LogInfo: 12,
  FindDevice: 13,
  SNMPInfo: 14,
  RegistryInfo: 15,
  Upload: 16,
  Install: 17,
  ChatReceived: 18,
  ChatAsk: 19,
  Terminal: 20,

  // under types must be End of list
  ClientJoined: 100,
  ClientDisposed: 101,
  UserStatus: 102,
  Amazon: 103,
  Fusion: 104
};

const Port = 3000;
// const DefaultOID = { "sysDescr": "1.3.6.1.2.1.1.1.0", "Location": "1.3.6.1.2.1.1.6.0", "UpTime": "1.3.6.1.2.1.1.3.0" };

const DefaultPath = [{
  ProgramName: '1',
  Service: 'MDCommServices',
  Path: 'C:\\Program Files (x86)\\Health Communication Network\\Messages\\In\\',
  Ext: ['hl7', 'oru'],
  RepeatedService: false,
},
{ ProgramName: '2', Service: 'BpService', Path: 'C:\\BPResults\\', Ext: ['hl7', 'oru'], RepeatedService: false },
{
  ProgramName: '3',
  Service: 'BpService',
  Path: 'C:\\ProgramData\\Best Practice\\Unprocessed\\',
  Ext: ['hl7', 'oru'],
  RepeatedService: true,
},
];

module.exports = {
  CommandTypes,
  ResponseTypes,
  DefaultPath,
  Port
};