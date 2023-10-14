// api.js (Axios setup)
import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Extract error status and data from the API response
      const { status, data } = error.response;
      if (status === 401) {
        // Handle 401 Unauthorized (e.g., redirect to login)
        toast.error("Incorrect email or password");
      } else if (status === 403) {
        // Handle 403 Forbidden (e.g., redirect to access denied)
        toast.error("Forbidden");
      } else if (status === 409) {
        // Handle 409 Conflict (e.g., email already registered)
        toast.error("This email is already registered.");
      } else {
        // Handle other errors
        toast.error("An error occurred. Please try again.");
      }
    } else {
      // Network error or other unhandled errors
      toast.error("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default axios;
