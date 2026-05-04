import { supabase } from "@/config/supabase-config";
import { Banner } from "@/types/banner_types";
import { BookCategory } from "@/types/book_category";

export const HomeService = {
  async getBanners(): Promise<Banner[]> {
    try {
      console.log("Inside service...");

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
};
