
import IQuestion from "../context/AssistantTypes";
import data from "../data/phishing.json";
export default class DataService {
  constructor() { }

  public async fetchQuestions(groups: string[]): Promise<IQuestion[]> {
    return new Promise((resolve, reject) => {
      return resolve(data);
    });

  }
  public saveQuestions(data: IQuestion[]) {
    this.store(Items.Questions, data);
  }
  public store(item: string, data: any): void {
    if (localStorage.getItem(item)) localStorage.removeItem(item);
    localStorage.setItem(item, JSON.stringify(data));
  }

  public getQuestions(): IQuestion[] {
    const str = localStorage.getItem(Items.Questions);
    if (!str || str.length == 0) return [];
    return JSON.parse(str) as IQuestion[];
  }

}

enum Items {
  Questions = "question",
  Groups = "groups",
  Answers = "answers",
  User = "user"
}