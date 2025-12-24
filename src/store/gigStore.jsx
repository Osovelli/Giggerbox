import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { get } from "react-hook-form";

const useGigStore = create((set) => ({
  allGigs: [],
  myGigs: [],
  gigPreferences: [],
  currentGig: null,
  loading: false,
  error: null,

  fetchGigPreferences: async () => {
    try {
      set({ loading: true });
        const response = await axiosInstance.get('/gigs/preferences');
        set({ gigPreferences: response.data, loading: false });
    } catch (error) {
        console.error("Fetch gig preferences error:", error);
        set({ error: "Failed to fetch gig preferences.", loading: false });
        toast.error("Failed to fetch gig preferences. Please try again.");
        throw error;
    }
  },

  postGig: async ({
    title,
    description,
    category,
    location,
    budget,
    maxHires,
    requiredSkills,
    image,
    attachments}) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.post('/gigs', { 
          title, 
          description, 
          category, 
          location, 
          budget, 
          maxHires,
          requiredSkills,
          image,
          attachments,
        });
        console.log("Gig posted successfully:", response.data);
        toast.success("Gig posted successfully!");
        set({ loading: false });
        return response.data;
    } catch (error) {
        console.error("Post gig error:", error);
        toast.error("Failed to post gig. Please try again.");
        set({ loading: false, error: "Failed to post gig." });
        throw error;
    }
  },

  getAllGigs: async () => {
    try {
      set({ loading: true });
        const response = await axiosInstance.get('/gigs');
        //console.log("All gigs fetched successfully:", response.data);
        set({ loading: false, allGigs: response.data?.data?.gigs });
        return response.data;
        } catch (error) {
        console.error("Get all gigs error:", error);
        toast.error("Failed to fetch gigs. Please try again.");
        set({ loading: false, error: "Failed to fetch gigs." });
        throw error;
    }
  },

  getMyGigs: async () => {
    try {
      set({ loading: true });
        const response = await axiosInstance.get('/gigs/my-jobs');
        console.log("My gigs fetched successfully:", response.data);
        set({ loading: false, myGigs: response.data?.data });
        return response.data;
        } catch (error) {
        console.error("Get my gigs error:", error);
        toast.error("Failed to fetch your gigs. Please try again.");
        set({ loading: false, error: "Failed to fetch your gigs." });
        throw error;
    }
  },

  getGigById: async (id) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.get(`/gigs/${id}`);
        console.log("Gig fetched successfully:", response.data);
        set({ loading: false, currentGig: response.data });
        return response.data;
    } catch (error) {
        console.error("Get gig by ID error:", error);
        toast.error("Failed to fetch gig. Please try again.");
        set({ loading: false, error: "Failed to fetch gig." });
        throw error;
    }
  },



  updateGig: async (id, updatedData) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.put(`/gigs/${id}`, updatedData);
        //console.log("Gig updated successfully:", response.data);
        toast.success("Gig updated successfully!");
        set({ loading: false });
        return response.data;
    } catch (error) {
        console.error("Update gig error:", error);
        toast.error("Failed to update gig. Please try again.");
        set({ loading: false, error: "Failed to update gig." });
        throw error;
    }
  },

  deleteGig: async (id) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.delete(`/gigs/${id}`);
        console.log("Gig deleted successfully:", response.data);
        toast.success("Gig deleted successfully!");
        set({ loading: false });
        return response.data;
    } catch (error) {
        console.error("Delete gig error:", error);
        toast.error("Failed to delete gig. Please try again.");
        set({ loading: false, error: "Failed to delete gig." });
        throw error;
    }
  },
      
  
}));

export default useGigStore;