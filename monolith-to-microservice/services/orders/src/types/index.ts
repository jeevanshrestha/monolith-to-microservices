
export interface CartItemDocument {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
  coverImage: string;
}

export interface CartDocument extends Document {
  userId: string;
  items: CartItemDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemDocument {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface OrderDocument extends Document {
  userId: string;
  items: OrderItemDocument[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo: {
    method: 'credit_card' | 'paypal' | 'bank_transfer';
    transactionId?: string;
    status: 'pending' | 'paid' | 'failed';
  };
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  id: string;
  role: string;
}