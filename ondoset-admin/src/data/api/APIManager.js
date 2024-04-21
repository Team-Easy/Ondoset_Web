import axios from "axios";

const BASE_URL = "https://";

const APIManager = {
  getData: async (path) => {
    try {
      const response = await axios.get(`${BASE_URL}${path}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      throw error;
    }
  },

  postData: async (path, newData) => {
    try {
      const response = await axios.post(`${BASE_URL}${path}`);
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  },
};

export default APIManager;
