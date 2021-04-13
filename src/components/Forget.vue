<template>
  <div id="forget">
    <NavBar></NavBar>
    <br /><br />
    <p id="notice">
      We will send you a reset password email to the registered email address
    </p>
    <br />
    <br />
    <label for="email">Email Address: </label>
    <input type="text" id="email" name="email" /> <br />
    <br />
    <button v-on:click="reset()" type="button">Reset Password</button>
    <p id="notice" v-show="this.sent">
      Email has been sent. Click
      <router-link to="/login" exact> here</router-link> to login again!
    </p>
  </div>
</template>

<script>
//import { database } from "../firebase.js";
import NavBar from "./NavBar.vue";
import { fbase } from "../firebase.js";

export default {
  data() {
    return {
      datapacket: "",
      checked: false,
      sent: false,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    reset() {
      var emailAddress = document.getElementById("email").value;
      console.log(emailAddress);
      fbase.sendPasswordResetEmail(emailAddress);
      this.sent = true;
    },
  },
};
</script>
<style scoped>
#forget {
  color: #b88b5e;
  width: 100%;
  height: 100vh;
  float: left;
  right: 100cm;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #fffdf2;
}

label {
  display: flex;
  flex-direction: row;
  float: left;
  clear: left;
  width: 10em;
  max-width: 400%;
  margin-left: 360px;
  justify-content: flex-end;
}

#notice {
  font-size: 20px;
  color: #b88b5e;
}

input {
  float: center;
  border-block-color: rgb(0, 0, 0);
  tab-size: 5px;
  size: 10px;
  height: 20px;
  flex: 0 0 200px;
  margin-right: 400px;
  width: 350px;
  font-size: 20px;
  border-radius: 25px;
  padding: 10px;
}

p {
  color: #b88b5e;
}

#password {
  width: 200px;
}

#confirm {
  width: 230px;
}

button {
  background-color: #f3cfab;
  font-style: italic;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  width: 100px;
  height: 50px;
  float: none;
  right: 10cm;
  max-width: 70%;
  margin: 50px;
  margin-top: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  margin-right: 25px;
  border-radius: 10px;
  font-size: 15px;
  border-color: #f3cfab;
}

button:hover {
  cursor: pointer;
}

p {
  font-size: 15px;
  color: black;
}
</style>
