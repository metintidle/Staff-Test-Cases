
//list of question categories
export const CategoryNames: { [k: string]: boolean } = {
  "Phishing": false,
  "Crypto Jacking": false,
  "DDoS": false,
  "Data Exfiltration": false,
  "Ransomware": false
}


//each category has a array of question numbers for example "DDoS" has the question numbers of 8,38,39,40
export const QuestionCount: { [k: string]: number[] } = {
  "Phishing": [1, 3, 4, 5, 7, 10, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  "Crypto Jacking": [1, 3, 4, 5, 7, 15, 34, 37, 38, 47, 48],
  "DDoS": [8, 38, 39, 40],
  "Data Exfiltration": [5, 9, 10, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 30, 32, 35, 41, 42, 43, 44, 45],
  "Ransomware": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}
