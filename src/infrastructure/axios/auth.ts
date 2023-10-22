import Cookies from "js-cookie";

const COOKIE_NAME = "authorize";

export function isAuthenticated(): boolean {
  const authorize = Cookies.get(COOKIE_NAME);
  return Boolean(authorize);
}

export function setAuthenticate() {
  Cookies.set(COOKIE_NAME, "true");
}

export function ClearAuthenticate() {
  Cookies.remove(COOKIE_NAME);
}
