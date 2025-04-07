// import axios from "axios";

// const API_URL = `${process.env.REACT_APP_API_BASE_URL}/predict`;

// export const checkUrlSafety = async (url) => {
//   if (!url) {
//     throw new Error("URL is required to check safety.");
//   }

//   try {
//     const response = await axios.post(API_URL, { url }, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.status === 200 && response.data) {
//       return response.data;
//     } else {
//       throw new Error("Invalid response from server.");
//     }
//   } catch (error) {
//     console.error("Error contacting the server:", error.response?.data || error.message);
//     throw error.response?.data || { error: error.message };
//   }
// };


import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/predict`;

export const checkUrlSafety = async (url) => {
  if (!url?.trim()) {
    throw new Error("URL is required to check safety.");
  }

  try {
    const { data, status } = await axios.post(
      API_URL,
      { url },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000, // optional: timeout after 10s
      }
    );

    if (status === 200 && data) {
      return data;
    } else {
      throw new Error("Unexpected response from the server.");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
    console.error("Error contacting the server:", errorMessage);
    throw new Error(errorMessage);
  }
};
