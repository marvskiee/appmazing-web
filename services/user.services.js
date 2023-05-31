import {
  deleteHTTPFormat,
  getHTTPFormat,
  postHTTPFormat,
  updateHTTPFormat,
} from "./tools";

export const getAllUser = async (role) =>
  await getHTTPFormat({ url: "/user/role/" + role });

export const changePassword = async (newData) =>
  updateHTTPFormat({ newData, url: "/user/change_password/" + newData?._id });

export const deleteUser = async (id) =>
  deleteHTTPFormat({ url: "/user/delete/" + id });

export const createUser = async (newData) =>
  await postHTTPFormat({ url: "/user", newData });

export const updateUser = async (newData, id) =>
  updateHTTPFormat({ newData, url: "/user/update/" + id });
