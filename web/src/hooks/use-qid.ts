import { useCookies } from "react-cookie";

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
}

export function useQID() {
  const [cookies, setCookie, removeCookie] = useCookies(["qid"]);
  const { qid } = cookies;

  return {
    qid,
    setQID: (value: any, options?: CookieSetOptions) =>
      setCookie("qid", value, options),
    removeQID: () => removeCookie("qid"),
  };
}
