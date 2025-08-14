export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  category: string;
}