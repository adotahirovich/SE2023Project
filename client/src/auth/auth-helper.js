function authenticate(token, callback) {
  if (typeof window !== "undefined")
    sessionStorage.setItem("token", JSON.stringify(token.user));
  document.cookie = `token=${JSON.stringify(
    token.token
  )}; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/`;
  callback();
}

function isAuthenticated() {
  if (typeof window == "undefined") return false;
  if (!sessionStorage.getItem("token")) return false;
  return JSON.parse(sessionStorage.getItem("token"));
}
function clearToken(callback) {
  if (typeof window !== "undefined") sessionStorage.removeItem("token");
  callback();
}
// eslint-disable-next-line
export default { authenticate, isAuthenticated, clearToken };
