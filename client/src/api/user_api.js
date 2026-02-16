import axios from "axios";

export const countAllResident = async () => {
  const res = await axios.get("http://localhost:4000/api/v1/users/admin", {
    withCredentials: true,
  });

  return res.data.count;
};
