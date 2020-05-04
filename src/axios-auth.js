import Axios from "axios";


const instance =Axios.create({
  baseURL:
    'https://firestore.googleapis.com/v1/projects/vuejs-http-9d94e/databases/(default)/documents'
});

export default instance