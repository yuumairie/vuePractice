import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router"
import store from './store/index'

Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/vuejs-http-9d94e/databases/(default)/documents";
// axios.defaults.headers.common['Authorization'] = "fajajfkajdfka";
// axios.defaults.headers.get['Accept'] = "application/json"



const interceptorsRequest = axios.interceptors.request.use(
  config => {
    // console.log("interceptors request", config);
    // config.headers['dfafa'] = 'dfafa'
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
})


