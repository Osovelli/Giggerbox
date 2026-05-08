import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

const useFAQStore = create(( set ) => ({
  faqs: [],
  loading: false,
  error: null,

  createFAQ: async (faqData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/faqs", faqData);
        console.log("FAQ created:", data?.data?.faq);
        toast.success("FAQ created successfully!");
        set({ faqs: [...faqs, data?.data?.faq] });
    } catch (error) {
      set({ error: error.message });
        console.error("Create FAQ error:", error);
    }
  },

  fetchFAQs: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/faqs");
      set({ faqs: data?.data || [] });
      console.log("FAQs fetched:", data?.data);
    } catch (error) {
      set({ error: error.message });
      console.error("Fetch FAQs error:", error);
      toast.error("Failed to fetch FAQs. Please try again.");
    } finally {
      set({ loading: false });
    }
  },

}));

export default useFAQStore;