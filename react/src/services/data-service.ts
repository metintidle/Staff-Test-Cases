
import IQuestion from "../context/questionInfo";
import phishing from "../data/phishing.json";
import exfiltration from "../data/data-exfiltration.json";
import jacking from "../data/crypto-jacking.json";
import ddos from "../data/ddos.json";
import ransomware from "../data/ransomware.json";

export default class DataService {

  public getQuestions(): IQuestion[] {

    const categories = [exfiltration, phishing, jacking, ddos, ransomware];

    //generate a random index in categories array
    const rand = Math.floor(Math.random() * categories.length);
    const questions = categories[rand];

    //prepare the questions with ignore duplicate options
    questions.forEach((ques) => {
      ques.options = ques.options.sort((a, b) => a.id - b.id).filter((v, i, a) => a.findIndex(v2 => (v2.title === v.title)) === i)
    });
    return questions;
  }

}
