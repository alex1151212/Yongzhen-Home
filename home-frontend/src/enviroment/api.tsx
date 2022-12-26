/* eslint-disable @typescript-eslint/naming-convention */
import { Method as M } from "axios";

const Method = {
  POST: "POST" as M,
  GET: "GET" as M,
  PUT: "PUT" as M,
  PATCH: "PATCH" as M,
  DELETE: "DELETE" as M,
};

export const api = {
  helloWorld: { url: () => "/", method: Method.GET },
  doorOpen: { url: () => `/open`, method: Method.GET },

  //   //login
  //   login: { url: () => "/login", method: Method.POST },
  //   logout: { url: () => "/logout", method: Method.GET },
};
