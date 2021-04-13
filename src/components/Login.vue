<template>
  <div id="login">
    <NavBar></NavBar>
    <br /><br /><br />
    <h2>Ready to start shopping/selling?</h2>
    <br />
    <label for="email">Email Address: </label><br />
    <br />
    <input type="text" id="email" name="email" required /> <br />
    <br />
    <label for="pw">Password:</label><br />
    <br />
    <input type="password" id="pw" name="pw" />
    <p v-on:click="forget()">Forget password?</p>
    <button v-on:click="logintoacc()" type="button">Login</button>
    <br /><br /><br /><br />
    <h3>
      <router-link to="/signup">Sign up</router-link> if you don't have an
      account.
    </h3>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { EventListening } from "../listening.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";

export default {
  data() {
    return {
      passwordList: [],
      emailList: [],
      display: [],
      listOfIds: [],
      currID: "",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    forget() {
      this.$router.push({
        path: "forget",
      });
    },
    emailExists() {
      //var email = document.getElementById("email").value
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.emailList.push(doc.get("Email"));
            this.listOfIds.push(doc.id);
          });
        });
      console.log("emails " + this.emailList);
    },
    passwordMatch() {
      //var password = document.getElementById("pw").value
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.passwordList.push(doc.get("Password"));
          });
        });
    },
    displayNames() {
      database
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.display.push(doc.get("DisplayName"));
          });
        });
    },
    getIndex(array, field) {
      return array.indexOf(field);
    },
    logintoacc() {
      var email = document.getElementById("email").value;
      var password = document.getElementById("pw").value;
      var docid = this.listOfIds[this.getIndex(this.emailList, email)];
      EventListening.$emit("Logging-in", [
        this.display[this.getIndex(this.emailList, email)],
        docid,
      ]);
      fbase
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          var errorMessage = error.message;
          if (errorMessage) console.log(errorMessage);
          alert(errorMessage);
          window.location.reload();
        })
        .then(() =>
          this.$router.push({
            name: "personal",
            params: { id: docid },
          })
        );
      console.log(fbase.currentUser.email);
    },
  },
  created() {
    this.emailExists();
    this.passwordMatch();
    this.displayNames();
    this.logintoacc();
  },
};
</script>

<style scoped>
#login {
  color: black;
  width: auto;
  height: 100vh;
  float: center;
  box-sizing: border-box;
  font-size: 18px;
  margin-left: 2px;
  background-color: #fffdf2;
}

button {
  background-color: #f3cfab;
  border-color: #f3cfab;
  font-style: italic;
  width: 100px;
  height: 40px;
  font-size: 20px;
  float: none;
  right: 10cm;
  max-width: 70%;
  margin: 20px;
  margin-top: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border-width: 1px;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width: 100px;
  cursor: pointer;
}

label {
  color: #b88b5e;
}
input {
  float: center;
  border-block-color: rgb(0, 0, 0);
  tab-size: 5px;
  size: 10px;
  height: 25px;
  flex: 0 0 200px;
  width: 350px;
  font-size: 20px;
  border-radius: 25px;
  padding: 8px;
}

h2 {
  color: #b88b5e;
}

a {
  color: #b88b5e;
}

a:hover {
  color: #f3cfab;
}

p {
  font-size: 14px;
  color: rgb(113, 113, 113);
  margin-left: 13%;
}

p:hover {
  font-size: 14px;
  color: black;
  cursor: pointer;
}
</style>
