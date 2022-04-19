interface ISourceNew {
  id: string;
  name: string;
}

interface INews {
  source: ISourceNew;
  author: string;
  title: string;
  description: string;
  url: any;
  urlToImage: any;
  publishedAt: Date;
  content: string;
}

export interface ICrawlDataRes {
  status: string;
  totalResults: number;
  articles: INews[];
}

export interface IErrorData {
  status: string;
  code: string;
  message: string;
}
