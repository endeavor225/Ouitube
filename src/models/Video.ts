import { Category } from "./Category";

export interface Video {
  title: string;
  description: string;
  poster: string;
  link: string;
  author: string;
  categories: Array<Category>;
  isAvailable: boolean;
  created_at: Date;
  updated_at: Date;
}
