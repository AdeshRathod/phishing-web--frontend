import axios from "axios";

export const scanImageFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // <-- updated to "file"

  const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/scan-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
