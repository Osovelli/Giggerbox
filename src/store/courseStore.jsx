import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";
import useUploadStore from "./uploadStore";


const useCourseStore = create(( set ) => ({
  courses: [],
  loading: false,
  error: null,
  createdCourses: [],
  enrolledCourses: [],


  createCourse: async (courseData) => {
    try {
        set({ loading: true });
        const uploadFile = useUploadStore.getState().uploadFile;

        const courseImage = courseData.videoUrl;

        let uploadedCourseImage = "";

        if (courseImage) {
            uploadedCourseImage = await uploadFile(courseImage, "users/profile_image");
        }

        console.log("Uploaded course image:", uploadedCourseImage);

        courseData.videoUrl = uploadedCourseImage;

        const { data } = await axiosInstance.post("/course", { ...courseData, videoUrl: uploadedCourseImage });
        console.log("Course created:", data?.data?.course);
        //set({ courses: [...get().courses, data?.data?.course ] });
        toast.success("Course created successfully!");
        return data;
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

  getCreatedCourses: async () => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get(`/course/my-courses`);
        set({ createdCourses: data?.data?.courses });
        console.log("User courses fetched:", data?.data?.courses);
        return data?.data?.courses;
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch user courses error:", error);
        toast.error("Failed to fetch user courses. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

  getEnrolledCourses: async () => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.get(`/enrollment`);
        set({ enrolledCourses: data?.data?.enrollments });
        //console.log("Enrolled courses fetched:", data?.data?.enrollments);
        return data?.data?.enrollments;
    } catch (error) {
        set({ error: error.message });
        console.error("Fetch enrolled courses error:", error);
        toast.error("Failed to fetch enrolled courses. Please try again.");
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
        toast.error(error?.response?.data?.message || "Failed to fetch course details. Please try again.");
    } finally {
        set({ loading: false });
    }
  },

    updateCourse: async (id, courseData) => {
    try {
        set({ loading: true });
        const { data } = await axiosInstance.put(`/course/${id}`, courseData);
        console.log("Course updated:", data?.data?.course);
        toast.success("Course updated successfully!");
        return data?.data?.course;
    }
    catch (error) {
        set({ error: error.message });
        console.error("Update course error:", error);
        toast.error("Failed to update course. Please try again.");
    }
    finally {
        set({ loading: false });
    }
  },

  createCourseEnrollment: async ({ courseId }) => {
    try {
        set({ loading: true})
        const { data } = await axiosInstance.post('/enrollment', { courseId });
        console.log("Course enrolled:", data?.data?.course);
        toast.success("Course enrolled successfully!");
        return data?.data?.course;
    }
    catch (error) {
        set({ error: error });
        console.error("error course:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "Failed to enroll course. Please try again.");
    }
    finally {
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