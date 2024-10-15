interface Product {
  id?:number
  pid: string;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  SKU: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  productCategory:string
  productSubCategory:string
  locale: string;
  documentId?:string
  productImage?: {
    id: number;
    alternativeText: string;
    url: string;
  };
}

  
  type PageInfo = {
    totalPages: number;
    currentPage: number;
  };
  
  interface Project {
    projId?: string;
    projTitle: string;
    projHeader: string;
    projSubTitle: string;
    projImage?: {
      id: number;
      alternativeText: string;
      url: string;
    };
    html: string;
    projCategory: string;
    documentId?:string
    // createdAt?: string;
    // updatedAt?: string;
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
  