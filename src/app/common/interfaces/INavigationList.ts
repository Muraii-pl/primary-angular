import { INavigationItem } from './INavigationItem';

export interface INavigationList extends INavigationItem{
  link?: string;

  count?:number;
  description?:string;
  id:number;
  meta?: [];
  parent?: number;
  taxonomy?: string;
  _links?:{
    about?: {
      href?:string;
    }[];
    collection?: {
      href?:string;
    }[];
    self?: {
      href?:string;
    }[];
    curies?: {
      href: string;
      name: string;
      templated: boolean;
    }[];
    'wp:post_type'?: {
      href?:string;
    }[];
  }
}
