import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { get } from "react-hook-form";

const useWalletStore = create((set) => ({
  walletDetails: null,
  transactions: [],
  pointsDetails: null,
  loading: false,
  error: null,


  fetchTransactions: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/wallet/transactions');
      set({ transactions: response?.data?.data?.transactions, loading: false });
      return response.data.transactions;
    } catch (error) {
      console.error("Fetch transactions error:", error);
      toast.error("Failed to fetch transactions. Please try again.");
        set({ error: error.message, loading: false });
      throw error;
    }
  },

  createManualDeposit: async({ amount }) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.post('/wallet/deposit/manual', { amount });
        set({ loading: false });
        return response.data;
    } catch (error) {
      console.error("Create deposit error:", error);
      toast.error("Deposit failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  verifyManualDeposit: async({ reference }) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.post(`/wallet/deposit/manual/verify/`, { reference });
        /* toast.success("Deposit verified successfully!"); */
        set({ loading: false });
        return response.data;
    } catch (error) {
      toast.error("Deposit verification failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  fetchBalance: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/wallet/wallet-details');
        set({ loading: false, walletDetails: response?.data?.data});
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch wallet details. Please try again.");
        set({ loading: false });
        throw error;
    }
  },

  convertPointsToWallet: async({ points }) => {
    try {
      set({ loading: true });
        const response = await axiosInstance.post('/points/convert-to-wallet', { points });
        toast.success("Points converted successfully!");
        set({ loading: false });
        return response.data;
    } catch (error) {
      toast.error("Points conversion failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  fetchPointsDetails: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/points/point-details');
        set({ loading: false, pointsDetails: response?.data?.data});
        return response.data;
    } catch (error) {
        //console.error("Fetch points details error:", error);
        set({ loading: false });
        throw error;
    }
  },

  addBankAccount: async({ 
    bankName,
    bankCode,
    accountName,
    accountNumber,
   }) => { 
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/bank/add', { 
        bankName,
        bankCode,
        accountName,
        accountNumber,
       });
      console.log("Bank account added successfully:", response.data);
      toast.success("Bank account added successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Add bank account error:", error);
      toast.error("Failed to add bank account. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  validateBankAccount: async({ accountNumber, bankCode }) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/bank/validate', { accountNumber, bankCode });
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Validate bank account error:", error);
      toast.error("Bank account validation failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  getBankAccounts: async() => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/bank');
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Fetch bank accounts error:", error);
      toast.error("Failed to fetch bank accounts. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  deleteBankAccount: async(bankAccountId) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.delete(`/bank/${bankAccountId}`);
      //console.log("Bank account deleted successfully:", response.data);
      toast.success("Bank account deleted successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      //console.error("Delete bank account error:", error);
      toast.error("Failed to delete bank account. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  addBankCard: async({ 
    cardNumber,
    cardHolderName,
    expiryDate,
    cvv,
   }) => { 
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/card/add', { 
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
       });
      console.log("Bank card added successfully:", response.data);
      toast.success("Bank card added successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Add bank card error:", error);
      toast.error("Failed to add bank card. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  

  withdrawalOtpRequest: async() => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/wallet/withdraw/send-otp');
      console.log("Withdrawal OTP requested successfully:", response.data);
      toast.success("Withdrawal OTP requested successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Withdrawal OTP request error:", error);
      toast.error("Withdrawal OTP request failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },

  verifyWithdrawal: async({ otp, amount, bankAccountId }) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/wallet/withdraw/verify', { otp, amount, bankAccountId });
      console.log("Withdrawal verified successfully:", response.data);
      toast.success("Withdrawal verified successfully!");
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Withdrawal verification error:", error);
      toast.error("Withdrawal verification failed. Please try again.");
      set({ loading: false });
      throw error;
    }
  },


}));

export default useWalletStore;