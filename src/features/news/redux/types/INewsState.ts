export interface INewsState {
  news: INewsInfo[];
  error?: string;
}

export interface INewsInfo {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}
