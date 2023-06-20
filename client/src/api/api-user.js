import baseUrl from "../config";

const create = (user) => {
  return fetch(`${baseUrl}/api/users`, {
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
  return fetch(`${baseUrl}/api/users/${params.userId}`, {
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
// eslint-disable-next-line
export default { create, update };
