export interface IMedia {
  id: number;
  title?: {
    rendered: string;
  };
  name?: string;
  alt_text: string;
  source_url: string;
  post: number;
}

