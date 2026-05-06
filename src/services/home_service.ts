
import { Banner } from "@/types/banner_types";
import { BookCategory } from "@/types/book_category";
import { Product } from "@/types/product";
import { supabase } from "../../lib/supabase";

export const HomeService = {
  async getBanners(): Promise<Banner[]> {
    try {
      const { data, error } = await supabase.from("banner").select("*");

      if (error) {
        throw error;
      }
      return data as Banner[];
    } catch (err) {
      throw err;
    }
  },

  async getCategories(): Promise<BookCategory[]> {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      return data as BookCategory[];
    } catch (err) {
      throw err;
    }
  },

  async getNewArrivalsProducts(): Promise<Product[]> {
    return this.getProductsByTag("New Arrivals");
  },

  async getBestsellerProducts(): Promise<Product[]> {
    return this.getProductsByTag("Bestseller");
  },

  async getTopRatedProducts(): Promise<Product[]> {
    return this.getProductsByTag("Top Rated");
  },

  async getDiscountedProducts(): Promise<Product[]> {
    return this.getProductsByTag("Discounts");
  },

  async getProductsByTag(tag: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("tags", [tag]);

      if (error) {
        throw error;
      }
      return data as Product[];
    } catch (err) {
      throw err;
    }
  },
};
