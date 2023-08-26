
import IQuestion from "../context/questionInfo";
import phishing from "../data/phishing.json";
import exfiltration from "../data/data-exfiltration.json";
import jacking from "../data/crypto-jacking.json";
import ddos from "../data/ddos.json";
import ransomware from "../data/ransomware.json";

export default class DataService {

  public getQuestions(): IQuestion[] {

    const questions = [exfiltration, phishing, jacking, ddos, ransomware];

    //find a random number between 0 through 4
    const rand = Math.floor(Math.random() * questions.length);

    const data = questions[rand];
    data.forEach((ques) => {
      ques.options = ques.options.sort((a, b) => a.id - b.id).filter((v, i, a) => a.findIndex(v2 => (v2.title === v.title)) === i)
    });
    return data;
  }

}
