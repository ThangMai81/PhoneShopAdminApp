export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    const [key, value] = c.split("=");
    console.log("Value?: ", value);
    if (key === name) return value;
  }
  return null;
}
export function removeCookie(name) {
  document.cookie = `auth-token=${name}; path=/; max-age=86400; SameSite=Lax; Secure`;
}
