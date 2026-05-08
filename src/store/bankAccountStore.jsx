import { create } from "zustand";
import axiosInstance from '../lib/axiosInstance';
import toast from "react-hot-toast";
import axios from "axios";

const useBankAccountStore = create((set) => ({
  users: [],
  accountDetails: null,
  bankAccountData: null,
  singleBankAccountData: null,
  loading: false,
  error: null,


 

  ValidateAccount: async ({bankCode, accountNumber, onSuccess, onFailure}) => {
    set({ loading: true, error: null });
    try {

      const res = await axiosInstance.post('/bank/validate', { bankCode, accountNumber });
        //console.log("token added", res.data.data);
        set({ loading: false, accountDetails: res.data.data})
        const message = res.data.message;
        set({ loading: false, });
        if (onSuccess) onSuccess(res);
        set({ loading: false });
        } catch (error) {
        //console.error("Login failed", error.response.data.message);
        set({ loading: false, error: error.response.data.message});
        if (onFailure) onFailure(error);
        toast.error(error.response.data.message || "An error occurred");
    }
  },

  getAllBanks: async ({ onSuccess, onFailure}) => {
    set({ loading: true });
    
    try {
        const res = await axiosInstance.get(`/bank/get-all-banks`);
      set({  loading: false,  banksData: res.data.data});
      if (onSuccess) onSuccess(res);
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching", loading: false });
      console.log("Single User error",error.response?.data?.message);
      if (onFailure) onFailure(error);
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  createBankAccount: async ({bankName, bankCode, accountNumber, accountName, onSuccess, onFailure}) => {
    set({ loading: true, error: null });
    try {

      const res = await axiosInstance.post('/bank/add', { bankName, bankCode, accountNumber, accountName });
        //console.log("token added", res.data.data);
       // const message = res.data.message;
      set({ loading: false, });
      if (onSuccess) onSuccess(res);
      set({ loading: false });
    } catch (error) {
      //console.error("Login failed", error.response.data.message);
      set({ loading: false, error: error.response.data.message});
      if (onFailure) onFailure(error);
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  getBankAccounts: async ({ onSuccess, onFailure}) => {
    set({ loading: true });
    
    try {
        const res = await axiosInstance.get(`/bank`);
      set({  loading: false,  bankAccountData: res.data.data.accounts});
      if (onSuccess) onSuccess(res);
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching", loading: false });
      console.log("Single User error",error.response?.data?.message);
      if (onFailure) onFailure(error);
      //toast.error(error.response.data.message || "An error occurred");
    }
  },

  getSingleBankAccount: async ({id, onSuccess, onFailure}) => {
    set({ loading: true });
    
    try {
        const res = await axiosInstance.get(`/bank/${id}`);
      set({  loading: false,  singleBankAccountData: res.data.data});
      if (onSuccess) onSuccess();
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching", loading: false });
      console.log("Single User error",error.response?.data?.message);
      if (onFailure) onFailure(error);
      //toast.error(error.response.data.message || "An error occurred");
    }
  },
  
  deleteBankAccount: async ({id, onSuccess, onFailure}) => {
    set({ loading: true });
    
    try {
        const res = await axiosInstance.delete(`/bank/${id}`);
      set({  loading: false,});
      if (onSuccess) onSuccess();
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching", loading: false });
      console.log("Single User error",error.response?.data?.message);
      if (onFailure) onFailure(error);
      //toast.error(error.response.data.message || "An error occurred");
    }
  },

  setDefaultAccount: async ({id, onSuccess, onFailure}) => {
    set({ loading: true });
    
    try {
        const res = await axiosInstance.put(`/bank/set-default/${id}`);
      set({  loading: false,});
      if (onSuccess) onSuccess();
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching", loading: false });
      console.log("Single User error",error.response?.data?.message);
      if (onFailure) onFailure(error);
      //toast.error(error.response.data.message || "An error occurred");
    }
  },

}));

export default useBankAccountStore;
