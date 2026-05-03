import { supabase } from "@/config/supabase-config";

export const HomeService = {
  async getBanners() {
    try {
      console.log("Inside service...");

      const { data, error } = await supabase.from("banner").select("*");

      if (error) {
        console.log("Supabase ERROR:", error);
        throw error;
      }

      console.log("Supabase DATA:", data);

      return data;
    } catch (err) {
      console.log("Service ERROR:", err);
      throw err;
    }
  },
};