// api/imageScanApi.js
import axios from "axios";

export const scanImageFile = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post("/api/scan-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
