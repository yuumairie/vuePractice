<template>
  <div>
    <h2>登録</h2>
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email" />
    <br />
    <br />
    <label for="password">パスワード:</label>
    <input type="password" id="password" v-model="password" />
    <br />
    <br />
    <button @click="register">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      });
      this.email = "";
      this.password = "";
    }
  }
};
</script>


<style>
</style>
