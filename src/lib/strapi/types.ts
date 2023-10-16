import StrapiSDK from "strapi-sdk-js";

export interface StrapiInstance extends StrapiSDK {
  auth(authData?: AuthData | boolean): Promise<StrapiSDK>;
}

export interface AuthData {
  user: string;
  password: string;
}

export interface GetInstanceOptions {
  auth?: AuthData | boolean;
  url?: string;
}

export type Product = {
  id: number;
  sku: string;
  title: string;
  model_name: string;
  card_title?: string;
  general_characteristics: string;
  general_description: string;
  short_description?: string;
  slug: string;
  specifications: string;
  crm_id: string;
  is_active: boolean;
  filter_attributes: Record<string, string> | [];
  crm_images: string[];
  createdAt: Date;
  updatedAt: Date;
  crm_videos: string[];
  category?: Category;
  brand?: Brand;
  offers?: {
    id: number;
    url: string;
    store: Store;
  }[];
};

export type Store = {
  id: number;
  name: string;
  logo: Media;
  shipping_zone: string;
  address: string;
  province: string;
  city: string;
  phone: string;
  coords: {
    lat: number;
    lng: number;
  };
  rating: number;
  whatsapp_number: string;
  slug: string;
  value_proposition: string;
  value_proposition_short: string;
  seo?: SeoData;
};

export type ProductHit = {
  title: string;
  slug: string;
  id: string;
  crm_images: string[];
};

export type Category = {
  id: number;
  name: string;
  crm_id: string;
  slug: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  value_proposition?: any;
};

export type CategoryTreeNode = {
  children_categories: CategoryTreeNode[];
  isRoot?: boolean;
  products?: Product[];
} & Category;

export type Brand = {
  id: number;
  name: string;
  accent_color: string;
  crm_id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  value_proposition: string;
  value_proposition_short: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  description: string;
  slug: string;
  cover?: Media;
  seo?: SeoData;
  [k: string]: any;
};

export type BlogCategoryTreeNode = {
  children_categories: BlogCategoryTreeNode[];
  isRoot?: boolean;
  blog_articles: BlogArticle[];
} & BlogCategory;

export type InverseBlogCategoryTreeNode = {
  parent_category: InverseBlogCategoryTreeNode | null;
  isRoot?: boolean;
} & BlogCategory;

export type BlogArticle = {
  id: number;
  title: string;
  short_description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: string;
  tags: string;
  CTAs?: CTA[];
  featured_image?: Media;
  blog_category?: BlogCategory;
  products?: Product[];
  seo?: SeoData;
  [k: string]: any;
};

export type BlogArticleHit = {
  title: string;
  slug: string;
  tags: string;
  short_description: string;
  id: string;
  createdAt: string;
  publishedAt: string;
  featured_image: Pick<
    Media,
    "alternativeText" | "caption" | "width" | "height" | "url"
  >;
};

export type CTA = {
  id: number;
  text: string;
  url: string;
  type: string;
  newTab: boolean;
};

export type Media = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    [k: string]: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: any;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  source?: string;
};

export type SeoData = {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: string;
  metaViewport?: string;
  canonicalURL?: string;
  metaImage: Media;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  company: string;
  phone: string;
  activity: string;
};
