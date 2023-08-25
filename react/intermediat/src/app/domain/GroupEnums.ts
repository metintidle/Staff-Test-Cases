
const GroupNames: { [k: string]: boolean } = {
  "Phishing": false,
  "Crypto Jacking": false,
  "DDoS": false,
  "Living off the land": false,
  "Data Exfiltration": false,
  "App vulnerabilities": false,
  "Ransomware": false,
  "Domain Dominance": false,
  "Incident Response": false,
  "Select All": false,
}
export default GroupNames;

export const GroupCount: { [k: string]: number[] } = {
  "Phishing": [1, 3, 4, 5, 7, 10, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  "Crypto Jacking": [1, 3, 4, 5, 7, 15, 34, 37, 38, 47, 48],
  "DDoS": [8, 38, 39, 40],
  "Living off the land": [3, 4, 5, 10, 14, 15, 23, 24, 30, 31, 32, 37, 46],
  "Data Exfiltration": [5, 9, 10, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 30, 32, 35, 41, 42, 43, 44, 45],
  "App vulnerabilities": [2, 5, 14, 19, 28, 33, 34, 35, 36, 37, 38],
  "Ransomware": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  "Domain Dominance": [1, 2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 16, 18, 19, 23, 30, 31, 32, 33, 34, 46],
  "Incident Response": [5, 6, 8, 11, 12, 13, 14, 27, 40, 49, 50, 51],
}
