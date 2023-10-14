import api from "./api";

const REGISTER_URL = import.meta.env.VITE_BASEURL;
export async function registerUser(email, password) {
  await api.post(`${REGISTER_URL}/api/v1/users/register`, {
    email,
    password,
  });
}
