
import IQuestion, { IAnswer, Score, WeakAnswer } from "../domain/AssistantTypes";
import DataService from './DataService'

export default class AssistantService {
  private dataService: DataService;
  constructor() {
    this.dataService = new DataService();
  }
  public getQuestionsWithOptions(): IQuestion[] {
    const dataService = new DataService();
    const questions = dataService.getQuestions();
    questions.forEach((ques) => {
      ques.options = ques.options.sort((a, b) => a.id - b.id).filter((v, i, a) => a.findIndex(v2 => (v2.title === v.title)) === i)
    });
    return questions;
  }

}
