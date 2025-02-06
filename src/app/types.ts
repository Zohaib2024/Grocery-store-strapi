export interface Category {
  id: number;
  attributes: {
    name: string;
  };
}

export interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    discount_price: number;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    category?: {
      data?: Category;
    };
  };
}
