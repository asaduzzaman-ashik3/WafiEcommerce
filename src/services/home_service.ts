import { supabase } from "@/config/supabase-config";
import { Banner } from "@/types/banner_types";
import { BookCategory } from "@/types/book_category";

export const HomeService = {
async getBanners() : Promise<Banner[]> {
  try {
    console.log("Inside service...");

    const { data, error } = await supabase
      .from("banner")
      .select("*");

    if (error) {
      console.log("Supabase ERROR:", error);
      throw error;
    }

    console.log("Supabase DATA:", data);

    return data as Banner[];
  } catch (err) {
    console.log("Service ERROR:", err);
    throw err;
  }
},

  async getCategories() : Promise<BookCategory[]> {
    try {
      console.log("Inside service...");

      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.log("Supabase ERROR:", error);
        throw error;
      }

      console.log("Supabase DATA:", data);

      return data as BookCategory[];
    } catch (err) {
      console.log("Service ERROR:", err);
      throw err;
    }
  },
};