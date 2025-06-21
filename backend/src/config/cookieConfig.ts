export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
export const cookieName = "auth_token";
export const cookieDomain = process.env.COOKIE_DOMAIN || "localhost";