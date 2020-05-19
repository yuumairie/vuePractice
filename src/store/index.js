import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth";
import router from "../router";
import axiosRefresh from "../auth-refresh";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        return;
      }
      const expiryTimeMs = localStorage.getItem("expiryTimeMs");
      const now = new Date();
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem("refreshToken");
      if (isExpired) {
        dispatch("refreshIdToken", refreshToken);
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch("refreshIdToken", refreshToken);
        }, expiresInMs);
        commit("updateIdToken", idToken);
      }
      this.commit("updateIdToken", idToken);
    },
    login({ dispatch }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyBpeF2U3X7IQkLNqjJLIyLDEEopKjiO-e0",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          dispatch("setAuthData", {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
          router.push("/");
        });
    },
    register({ dispatch }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyBpeF2U3X7IQkLNqjJLIyLDEEopKjiO-e0", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          dispatch("setAuthData", {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
          router.push("/");
        });
    },
    async refreshIdToken({ dispatch }, refreshToken) {
      axiosRefresh
        .post("/token?key=AIzaSyBpeF2U3X7IQkLNqjJLIyLDEEopKjiO-e0", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        })
        .then(response => {
          dispatch("setAuthData", {
            idToken: response.data.id_token,
            expiresIn: response.data.expires_in,
            refreshToken: response.data.refresh_token
          });
        });
    },
    setAuthData({ commit, dispatch }, authData) {
      commit("updateIdToken", authData.data.idToken);
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      localStorage.setItem("idToken", authData.idToken);
      localStorage.setItem("expiryTimeMs", expiryTimeMs);
      localStorage.setItem("refreshToken", authData.refreshToken);
      setTimeout(() => {
        dispatch("refreshIdToken", authData.refreshToken);
      }, authData.data.expiresIn * 1000);
    },
    logout({ commit }) {
      commit("updateIdToken", null);
      localStorage.removeItem("idToken");
      localStorage.removeItem("expiryTimeMs");
      localStorage.removeItem("refreshToken");
      router.replace("/login");


      
    }
  }
});
