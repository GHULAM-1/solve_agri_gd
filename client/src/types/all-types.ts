type Product = {
    _id?: string;
    title: string;
    description: string;
    price: number | null;
    SKU: string;
    image: string;
    category: string;
    subcategory: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  type PageInfo = {
    totalPages: number;
    currentPage: number;
  };
  
  type Project = {
    _id?: string;
    title: string;
    header: string;
    subtitle: string;
    html: string;
    images: string[];
    category: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  
  type Comment = {
    _id: string;
    productId: string;
    text: string;
    email?: string;
    name: string;
    createdAt: string;
    type: string;
    isModerated: boolean;
  };
  
  type ServiceData = {
    image: string;
    hero: {
      image: string;
      heading: string;
    };
    content: string;
    advertisement: string;
    about: string;
  };
  
  export type { Product, User, Comment, Project, PageInfo, ServiceData };
  