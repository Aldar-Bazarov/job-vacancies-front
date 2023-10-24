import Cookies from "js-cookie";

const COOKIE_NAME = "authorize";

export function isAuthenticated(): boolean {
  const authorize = Cookies.get(COOKIE_NAME);
  return authorize === "true";
}

export function setAuthenticate(token: string) {
  Cookies.set(COOKIE_NAME, "true");
  localStorage.setItem("access_token", token);
}

export function clearAuthenticate() {
  Cookies.set(COOKIE_NAME, "false");
  localStorage.removeItem("access_token");
}
