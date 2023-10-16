import api from "./api";

const BASEURL = import.meta.env.VITE_BASEURL;

export async function registerUser(email, password) {
  await api.post(`${BASEURL}/api/v1/users/register`, {
    email,
    password,
  });
}

export async function loginUser(email, password) {
  const response = await api.post(`${BASEURL}/api/v1/users/login`, {
    email,
    password,
  });
  const token = response.data.token;
  return token;
}
export async function getNews(token) {
  const response = await api.get(`${BASEURL}/api/v1/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postFavourite(token, id, news) {
  await api.post(`${BASEURL}/api/v1/news/${id}/favourite`, news, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteNews(token, id, type) {
  await api.delete(`${BASEURL}/api/v1/news/${id}/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
