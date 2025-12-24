import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

const useUserStore = create((set) => ({
  /*   accessToken: null,
  isAuthenticated: false, */
  user: null,
  loading: false,
  error: null,


  
  /* loginUser: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      // Update the store with user data and access token
      set({ 
        user: response.data.user, 
        accessToken: response.data.accessToken, 
        isAuthenticated: true 
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  }, */

  updateUserRole: async ({ roles }) => {
    try {
        set({ loading: true })
        const response = await axiosInstance.put('/onboarding/roles', { roles })
        console.log("User role updated successfully:", response.data);
        console.log({roles})
        toast.success("User role updated successfully!");
        set({ loading: false })
        return response.data;
    } catch (error) {
        console.error("User role update error:", error);
        toast.error("User role update failed. Please try again.");
        set({ loading: false })
        throw error;
    }
  },

  updateUserGigPreferences: async ({ gigPreferences }) => {
    try {
        set({loading: true})
        const response = await axiosInstance.put('/onboarding/gig-preference', { gigPreferences })
        console.log("User gig preferences updated successfully:", response.data);
        toast.success("User gig preferences updated successfully!");
        set({loading: false})
        return response.data;
    } catch (error) {
        console.error("User gig preferences update error:", error);
        toast.error("User gig preferences update failed. Please try again.");
        set({loading: false})
        throw error;
    }
  },

  updateProfile: async ({ dob, address, nationality }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.put('/onboarding/profile', { dob, address, nationality })
      console.log("User profile is updated successfully", response.data)
      toast.success("User profile is updated successfully")
      set({ loading: false, user: response.data?.data?.user || null })
      return response.data
    } catch (error) {
      console.error("User profile update error:", error)
      toast.error("User profile update failed. Please try again.")
      set({ loading: false })
      throw error
    }
  },

  identityVerification: async({ payload }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.post('/onboarding/identity', { ...payload })
      console.log("Identity verification submitted successfully:", response.data);
      toast.success("Identity verification submitted successfully!");
      set({ loading: false })
      return response.data;
    } catch (error) {
      console.error("Identity verification error:", error);
      toast.error("Identity verification failed. Please try again.");
      set({ loading: false })
      throw error;
    }
  },

  selfieVerification: async({ payload }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.post('/onboarding/selfie', { ...payload })
      console.log("Selfie verification submitted successfully:", response.data);
      toast.success("Selfie verification submitted successfully!");
      set({ loading: false })
      return response.data;
    } catch (error) {
      console.error("Selfie verification error:", error);
      toast.error("Selfie verification failed. Please try again.");
      set({ loading: false })
      throw error;
    }
  },

  userOnboarding: async () => {
    try {
      set({ loading: true })
      const response = await axiosInstance.get('/onboarding/me')
      console.log("User onboarding status fetched successfully:", response.data);
      set({ loading: false, user: response.data })
      return response.data;
    } catch (error) {
      /* console.error("User onboarding status fetch error:", error); */
      /* toast.error("Failed to fetch onboarding status. Please try again."); */
      set({ loading: false })
      throw error;
    }
  },

  changeProfile: async ({ payload }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.put('/user/profile', { ...payload })
      console.log("User profile changed successfully:", response.data);
      toast.success("User profile changed successfully!!");
      set({ loading: false, user: response.data?.data?.user || null })
      return response.data;
    } catch (error) {
      console.error("User profile change error:", error);
      toast.error("User profile change failed. Please try again.");
      set({ loading: false })
      throw error;
    }
  },

  updateNotificationPreferences: async ({ preferences }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.put('/user/notification-preference', { preferences })
      console.log("User notification preferences updated successfully:", response.data);
      toast.success("User notification preferences updated successfully!");
      set({ loading: false })
      return response.data;
    } catch (error) {
      console.error("User notification preferences update error:", error);
      toast.error("User notification preferences update failed. Please try again.");
      set({ loading: false })
      throw error;
    }
  },

  updateWorkSamples: async ({ workSamples }) => {
    try {
      set({ loading: true })
      const response = await axiosInstance.put('/user/work-experience', { workSamples })
      console.log("User work samples updated successfully:", response.data);
      toast.success("User work samples updated successfully!");
      set({ loading: false, user: response.data?.data?.user || null })
      return response.data;
    } catch (error) {
      console.error("User work samples update error:", error);
      toast.error("User work samples update failed. Please try again.");
      set({ loading: false })
      throw error;
    }
  },

})
)

export default useUserStore;