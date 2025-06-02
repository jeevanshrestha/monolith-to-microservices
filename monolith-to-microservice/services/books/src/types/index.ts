
export interface BookDocument extends Document {
  title: string;
  author: string;
  isbn: string;
  description: string;
  category: string;
  price: number;
  coverImage: string;
  publisher: string;
  publicationDate: Date;
  stock: number;
  pages: number;
  language: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  id: string;
  role: string;
}