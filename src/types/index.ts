export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface ContainerProps {
  children?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category: string;
  tags?: string[];
  read_time?: number;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  author?: UserProfile;
  category_info?: BlogCategory;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'editor' | 'user';
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPostData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  featured_image?: string;
  status?: 'draft' | 'published' | 'scheduled';
  published_at?: string;
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string;
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