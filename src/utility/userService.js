import api from "./api";

const BASEURL = import.meta.env.VITE_BASEURL;

export async function registerUser(email, password) {
  const response = await api.post(`${BASEURL}/api/v1/users/register`, {
    email,
    password,
  });
  const token = response.data.token;
  return token;
}

export async function loginUser(email, password) {
  const response = await api.post(`${BASEURL}/api/v1/users/login`, {
    email,
    password,
  });
  const token = response.data.token;
  return token;
}
export async function getNews(token, page) {
  let baseUrl = `${BASEURL}/api/v1/news`;
  if (page) baseUrl = `${BASEURL}/api/v1/news/${page}`;
  const response = await api.get(baseUrl, {
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

export async function postRead(token, id, news) {
  await api.post(`${BASEURL}/api/v1/news/${id}/read`, news, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getFavourites(token) {
  const response = await api.get(`${BASEURL}/api/v1/news/favourite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
export async function getRead(token) {
  const response = await api.get(`${BASEURL}/api/v1/news/read`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteNewsAPI(token, id, type) {
  await api.delete(`${BASEURL}/api/v1/news/${id}/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getPreferences(token) {
  const response = await api.get(`${BASEURL}/api/v1/users/preferences`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Function to put the preferences in Backend

export async function userNewsPreferences(
  token,
  categories,
  languages,
  countries
) {
  await api.put(
    `${BASEURL}/api/v1/users/newspreferences`,
    {
      categories,
      countries,
      languages,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
