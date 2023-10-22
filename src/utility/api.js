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
      if (status === 400) {
        toast.error(data.message);
      } else if (status === 401) {
        // Handle 401 Unauthorized (e.g., redirect to login)
        toast.error("Incorrect email or password");
      } else if (status === 403) {
        // Handle 403 Forbidden (e.g., redirect to access denied)
        toast.error("Forbidden");
      } else if (status === 409) {
        // Handle 409 Conflict
        toast.error(data.message);
      } else if (status === 422) {
        toast.error(data.message);
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
