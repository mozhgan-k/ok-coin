export interface IFAQ {
  _id: string;
  category: string;
  name: string;
  children: Array<IChild>;
}

interface IChild {
  rows: Array<IChildRow>;
  _id: string;
  category: string;
}

interface IChildRow {
  _id: string;
  question: string;
  answer: string;
}
