export interface IPost {
  title?: {
    rendered: string
  };
  name: string;
  slug: string;
  id?: number;
  categories?: number[];
  content? : {
    protected: boolean;
    rendered: string;
  };
  formattedContent?: string;
  category?: string;
  date?: string;
  author?: string;
  image?: {
    title: string;
    alt_text: string;
    url: string;
  };
  excerpt?: {
    rendered: string;
  };
  shortedContent?: string;
  _embedded?: {
    author: {
      name
    }[];
    'wp:featuredmedia': {
      link: string,
      alt_text: string,
      source_url: string,
      title: {
        rendered: string
      }
    }[];
  }
}
