import { SessionOptions } from "iron-session";

export interface SessionData {
  address: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  address: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session-cookie",
  cookieOptions: {
    secure: true,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
