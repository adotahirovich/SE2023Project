import baseUrl from "../config";

const create = (user) => {
  return fetch(`${baseUrl}/api/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, token, user) => {
  return fetch(`${baseUrl}/api/posts/${params.postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
    withCredentials: true,

    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const updatePost = (params, token, user) => {
  return fetch(`${baseUrl}/api/postsUpdate/${params.postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
    withCredentials: true,

    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const remove = (params, token) => {
  return fetch(`${baseUrl}/api/posts/${params.postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
// eslint-disable-next-line
export default { create, update, remove, updatePost };
