import ky from "ky";

let baseUrl = "http://localhost:5000";
export default {
  doFetch: async (url, body) => {
    const requestURL = baseUrl + url;
    const httpOptions = {
      json: body,
      timeout: 20000,
    };

    try {
      const response = await ky.post(requestURL, httpOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  },
  getUser: async (url) => {
    const requestURL = baseUrl + url;
    try {
      const response = await ky.get(requestURL);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  },
};
