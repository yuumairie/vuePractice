import Axios from "axios";

const instance = Axios.create({
  baseURL:
    "https://identitytoolkit.googleapis.com/v1"
});

export default instance