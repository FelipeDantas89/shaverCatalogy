
export enum Category {
  ALL = 'Todos',
  CLASSIC = 'Clássicos',
  MODERN = 'Modernos',
  BEARD = 'Barba',
  MUSTACHE = 'Bigode'
}

export interface HairStyle {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  description?: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
