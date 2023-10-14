import api from "./api";

const BASEURL = import.meta.env.VITE_BASEURL;

export async function registerUser(email, password) {
  await api.post(`${BASEURL}/api/v1/users/register`, {
    email,
    password,
  });
}

export async function loginUser(email, password) {
  await api.post(`${BASEURL}/api/v1/users/login`, {
    email,
    password,
  });
}
