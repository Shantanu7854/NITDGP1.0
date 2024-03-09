import axios from "axios";

const apiBaseURL = "http://localhost:5000/api/v1";

const COMMON_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const apiInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: COMMON_HEADERS,
  validateStatus: function (status) {
    return status < 300; // Resolve only if the status code is less than 600
  },
});

export const setAuthToken = async (token: string) => {
  if (token) {
    apiInstance.defaults.headers.common["Token"] = `${token}`;
  } else {
    delete apiInstance.defaults.headers.common["Token"];
  }
};
