export interface Product {
  id: number;
  category_id: number;

  title: string;
  label_tag: string;
  discount_tag: string;

  original_price: number;
  discount_price: number;

  image_url: string[];

  description: string;

  brand_name: string;
  category_name: string;

  tags: string[];
}