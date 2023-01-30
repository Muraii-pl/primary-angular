export interface IPost {
  title?: {
    rendered: string
  };
  name: string;
  slug: string;
  id?: number;
  categories?: number[];
}
