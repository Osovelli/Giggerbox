import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import ForgotPassword from "@/Pages/Auth/forgotPassword";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,

  registerUser: async ({ firstname, lastname, email, password, phone /* referralCode */ }) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        firstname,
        lastname,
        email,
        password,
        phone,
        /* referralCode */
      });

      console.log("Registration successful:", response);
      toast.success("Registration successful! Please verify your email.");

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  },

  verifyToken: async ({ otp, email }) => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', { otp, email });
      console.log("Email verified successfully:", response.data);
      toast.success("Email verified successfully!");

      // Extract user and token from response
      const { user, token } = response.data;

      // Update the store with user data and access token
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
      });

      // Persist access token to localStorage
      localStorage.setItem('accessToken', token);

      return response.data;
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("Email verification failed. Please try again.");
      throw error;
    }
  },

  resendOtp: async ({ otp, email }) => {
    try {
      const response = await axiosInstance.post('/auth/resend-otp', { otp, email });
      console.log("OTP resent successfully:", response.data);
      toast.success("OTP resent successfully!");
      return response.data;
    } catch (error) {
      console.error("Resend OTP error:", error);
      set({ loading: false });
      toast.error("Failed to resend OTP. Please try again.");
      throw error;
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      // Update the store with user data and access token if present
      set({
        loading: false,
        user: response.data,
      });
      localStorage.setItem('accessToken', response.data?.data?.token);
      //set({ isAuthenticated: true });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false });
      toast.error("Login failed. Please try again.");
      throw error;
    }
  },

  resetPassword: async ({ email, newPassword }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/reset-password', { email, newPassword });
      console.log("Password reset email sent successfully:", response.data);
      toast.success("Password reset email sent successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Password reset error:", error);
      set({ loading: false });
      toast.error("Failed to send password reset email. Please try again.");
      throw error;
    }
  },

  forgotPassword: async ({ email }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      console.log("Password reset email sent successfully:", response.data);
      toast.success("Password reset email sent successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Password reset error:", error);
      set({ loading: false });
      toast.error("Failed to send password reset email. Please try again.");
      throw error;
    }
  },

  verifyChangePasswordOtp: async ({ otp, email }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/verify-reset-otp', { otp, email });
      console.log("OTP for password reset verified successfully:", response.data);
      toast.success("OTP for password reset verified successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("OTP verification error:", error);
      set({ loading: false });
      toast.error("Failed to verify OTP. Please try again.");
      throw error;
    }
  },

  changePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/change-password', { currentPassword, newPassword, confirmPassword });
      console.log("Password changed successfully:", response.data);
      toast.success("Password changed successfully!");
      set({ loading: false });
      return response.data;
    }
    catch (error) {
      console.error("Change password error:", error);
      set({ loading: false });
      toast.error("Failed to change password. Please try again.");
      throw error;
    }
  },

  

}));

export default useAuthStore;