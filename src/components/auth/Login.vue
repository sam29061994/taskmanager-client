
<template>
  <div class="login-form">
    <form action="#" @submit.prevent="login">
      <div class="form-control">
        <label for="email">Username</label>
        <input
          type="email"
          name="username"
          id="username"
          class="login-input"
          v-model="username"
          disabled
        />
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="login-input"
          v-model="password"
          @keyup.enter="login"
          v-focus
        />
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
    <p v-if="error" class="error">Password Incorrect. Try Again!!</p>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import axios from "../../modules/api";

export default defineComponent({
  name: "login",
  props: {
    routeTo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: "Admin",
      password: "",
      error: false,
    };
  },
  methods: {
    async login() {
      let token = null;
      try {
        const { data } = await axios.post("auth/signin", {
          username: this.username,
          password: this.password,
        });
        token = data.token;
      } catch (err) {
        this.error = true;
        return;
      }
      localStorage.setItem("access_token", token);
      this.emitter.emit("user-authorized", true);
      this.$router.push(this.routeTo);
    },
  },
});
</script>


<style lang="scss">
label {
  display: block;
  margin-bottom: 4px;
}
.login-heading {
  position: absolute;
  top: 0px;
  left: 100px;
  font-size:40px;
}
.form-control {
  margin-bottom: 24px;
}
.mb-more {
  margin-bottom: 42px;
}
.login-form {
  max-width: 400px;
  margin: auto;
}
.login-input {
  width: 100%;
  font-size: 16px;
  padding: 12px 16px;
  outline: 0;
  border-radius: 3px;
  border: 1px solid lightgrey;
}
.btn-submit {
  display: inline-block;
  width: 100%;
  padding: 14px 12px;
  font-size: 18px;
  font-weight: bold;
  background: darkcyan;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: darken(#60bd4f, 10%);
  }

  @media screen and (max-width: 600px) {
    font-size: 15px;
    padding: 10px 6px;
  }
}
.error {
  font-size: 20px;
  color: maroon;
}
</style>
