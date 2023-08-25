
import IQuestion from "../context/AssistantTypes";
import data from "../data/phishing.json";

export default class AssistantService {

  public getQuestionsWithOptions(): IQuestion[] {
    data.forEach((ques) => {
      ques.options = ques.options.sort((a, b) => a.id - b.id).filter((v, i, a) => a.findIndex(v2 => (v2.title === v.title)) === i)
    });
    return data;
  }

}
