import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://securetoken.googleapis.com/v1"
});

export default instance
