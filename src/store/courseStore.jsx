import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import { get } from "react-hook-form";

const useCourseStore = create(( set ) => ({
  courses: [],
  loading: false,
  error: null,

  createCourse: async (courseData) => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.post("/course", courseData);
        console.log("Course created:", data?.data?.course);
        //set({ courses: [...get().courses, data?.data?.course ] });
        toast.success("Course created successfully!");
    } catch (error) {
        set({ error: error.message });
        console.error("Create course error:", error);
        toast.error("Failed to create course. Please try again.");
    } finally {
        set({ loading: false });
    }
  },



  fetchAllCourses: async () => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get("/course");
        set({ courses: data?.data?.courses });
        console.log("Courses fetched:", data?.data?.courses);
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch courses error:", error);
        toast.error("Failed to fetch courses. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

  fetchUserCourses: async () => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get(`/course/my-courses`);
        //set({ courses: data?.data?.courses });
        console.log("User courses fetched:", data?.data?.courses);
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch user courses error:", error);
        toast.error("Failed to fetch user courses. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

  getCourseBySlug: async (slug) => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get(`/course/${slug}`);
        console.log("Course fetched by slug:", data?.data?.course);
        return data?.data?.course;
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch course by slug error:", error);
        toast.error("Failed to fetch course details. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

  getCourseById: async (id) => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get(`/course/${id}`);
        console.log("Course fetched by ID:", data?.data?.course);
        return data?.data?.course;
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch course by ID error:", error);
        toast.error("Failed to fetch course details. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

  createCourseReview: async (courseId, reviewData) => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.post(`/course/review/${courseId}`, reviewData);
        console.log("Review submitted:", data?.data);
        toast.success("Review submitted successfully!");
    } catch (error) {
        set({ error: error.message });
        console.error("Submit review error:", error);
        toast.error("Failed to submit review. Please try again.");
    } finally {
        set({ loading: false });
    }
  },


})
);

export default useCourseStore;