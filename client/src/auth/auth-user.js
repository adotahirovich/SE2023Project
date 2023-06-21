import baseUrl from "../config";

const signin = (user) => {
  return fetch(`${baseUrl}/auth/signin`, {
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
// eslint-disable-next-line
export default { signin };
