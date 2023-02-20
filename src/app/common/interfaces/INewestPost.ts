import { IPost } from './IPost';

export interface INewestPost {
  Posts: IPost[];
  Total: number;
  TotalPages: number;
}
