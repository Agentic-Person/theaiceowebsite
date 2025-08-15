export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface ContainerProps {
  children?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
}

export interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  category: string;
}

export interface Resource {
  title: string;
  description: string;
  type: 'guide' | 'calculator' | 'template' | 'checklist';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}