
export default interface IQuestion {
  id: number;
  title: string;
  answerType: number;
  options: IOption[];
  suggestion: string;
}

export interface IOption {
  id: number
  title: string
  group: IGroup
  score: number
}

export interface IGroup {
  id: number
  name: string
}

export interface IAnswer {
  questionId: number,
  optionTitle: string,
  optionId: number
}
export type WeakAnswer = {
  question: IQuestion,
  degree: number
};

export type Score = {
  name: string,
  degree: number
}

export type UserInfo = {
  fullName: string,
  businessName: string,
  email: string,
  phone: string,
}