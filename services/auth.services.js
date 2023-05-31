import { getHTTPFormat, postHTTPFormat } from "./tools";

export const authLogin = async (newData) =>
  postHTTPFormat({ url: "/auth/login", newData });
export const authLogout = async () => postHTTPFormat({ url: "/auth/logout" });
export const getUser = async () => getHTTPFormat({ url: "/auth/checkAuth" });
