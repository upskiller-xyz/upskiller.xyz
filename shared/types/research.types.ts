export interface ResearchArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export interface ResearchData {
  categories: string[];
  articles: ResearchArticle[];
}
