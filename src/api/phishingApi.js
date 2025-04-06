import axios from "axios";

const API_URL = "http://localhost:5000/predict";

export const checkUrlSafety = async (url) => {
  if (!url) {
    throw new Error("URL is required to check safety.");
  }

  try {
    const response = await axios.post(API_URL, { url }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    console.error("Error contacting the server:", error.response?.data || error.message);
    throw error.response?.data || { error: error.message };
  }
};
