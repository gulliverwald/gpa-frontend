export interface IRequestCreateNews {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}

export interface IRequestUpdateNews {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}

export interface IRequestDeleteNews {
  id: number;
}

export interface IRequestCreateNewsSucess {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}

export interface IRequestUpdateNewsSucess {
  id: number;
  title: string;
  link?: string;
  description: string;
  date: string;
  nutritionist_id: number;
  image_link: string;
  subtitle?: string;
}

export interface IRequestDeleteNewsSucess {
  id: number;
}

export interface INewsError {
  message: string;
}
