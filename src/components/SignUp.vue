<template>
  <div>
    <NavBar></NavBar>
    <div id="signup">
      <!-- <router-link to="/signup" exact></router-link> -->
      <br />
      <img :src="imageSource" ALIGN="left" id="imagedp" /> <br clear="center" />
      <br />
      <label for="fname">First Name </label>
      <input type="text" id="fname" name="fname" /> <br />
      <br />
      <label for="lname">Last Name </label>
      <input type="text" id="lname" name="lname" /> <br />
      <br />
      <label for="dname">Display Name </label>
      <input type="text" id="dname" name="name" /> <br /><br />
      <label for="email">Email </label>
      <input type="text" id="email" name="email" /> <br /><br />
      <label for="num">Contact No </label>
      <input type="text" id="num" name="num" /> <br /><br />
      <label for="pw">Password </label>
      <input type="password" id="pw" name="pw" v-on:change="check()" />
      <p id="passwordcheck"></p>
      <br />
      <label for="cpw">Confirm Password </label>
      <input type="password" id="cpw" name="cpw" v-on:change="matched()" />
      <p id="matching"></p>
      <br /><br />
      <button v-on:click="colourchange()" type="button" id="bgchange">
        Switch
      </button>
      <button v-on:click="createacc()" type="button" id="account">
        Create
      </button>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";

export default {
  data() {
    return {
      urls: [
        "https://firebasestorage.googleapis.com/v0/b/fashup-6031a.appspot.com/o/Display%20Pictures%2Fwallpaper1.jpg?alt=media&token=00ab8e4f-da3b-42d6-a184-1fd79eb71ac4",
        "https://firebasestorage.googleapis.com/v0/b/fashup-6031a.appspot.com/o/Display%20Pictures%2Fwallpaper2.jpg?alt=media&token=48130241-abe7-4669-99cb-2211ff4883e6",
        "https://firebasestorage.googleapis.com/v0/b/fashup-6031a.appspot.com/o/Display%20Pictures%2Fwallpaper3.jpg?alt=media&token=5fc083e9-eab5-4239-85de-617df5a1ed77",
        "https://firebasestorage.googleapis.com/v0/b/fashup-6031a.appspot.com/o/Display%20Pictures%2Fwallpaper4.jpg?alt=media&token=b9919d3e-e507-49bb-b71f-534d3d0a0c5b",
      ],
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/fashup-6031a.appspot.com/o/Display%20Pictures%2Fwallpaper2.jpg?alt=media&token=48130241-abe7-4669-99cb-2211ff4883e6",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    hasNumber(fieldstring) {
      return /\d/.test(fieldstring);
    },
    containsUppercase(fieldstring) {
      var count = 0;
      for (let i = 0; i < fieldstring.length; i++) {
        if (fieldstring[i] === fieldstring[i].toUpperCase()) {
          count = count + 1;
        }
      }
      return count > 0;
    },
    containsLowerCase(fieldstring) {
      var count = 0;
      for (let i = 0; i < fieldstring.length; i++) {
        if (fieldstring[i] === fieldstring[i].toLowerCase()) {
          count = count + 1;
        }
      }
      return count > 0;
    },
    check() {
      var password = document.getElementById("pw").value;
      console.log(this.containsLowerCase(password));
      console.log(this.containsUppercase(password));
      console.log(this.hasNumber(password));
      if (password.length < 8) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must be more than 8 characters";
        //return false;
      }
      if (this.hasNumber(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 numeric digit";
        //return false;
      }
      if (this.containsUppercase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 uppercase character";
        //return false;
      }
      if (this.containsLowerCase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 lowercase character";
        //return false;
      }
      if (
        password.length >= 8 &&
        this.hasNumber(password) &&
        this.containsUppercase(password) &&
        this.containsLowerCase(password)
      ) {
        document.getElementById("passwordcheck").innerHTML = "";
        //return true;
      }
    },
    matched() {
      var password = document.getElementById("pw").value;
      var confirmedpw = document.getElementById("cpw").value;
      if (password !== confirmedpw) {
        document.getElementById("matching").innerHTML =
          "Password does not match";
        return false;
      } else {
        document.getElementById("matching").innerHTML = " ";
        return true;
      }
    },
    colourchange() {
      var currIndex = this.urls.indexOf(this.imageSource);
      var nextIndex = currIndex + 1;
      if (nextIndex == this.urls.length) {
        nextIndex = 0;
      }
      this.imageSource = this.urls[nextIndex];
    },
    fieldsFilled() {
      var first = document.getElementById("fname").value;
      var last = document.getElementById("lname").value;
      var display = document.getElementById("dname").value;
      var email = document.getElementById("email").value;
      var contact = document.getElementById("num").value;
      var password = document.getElementById("pw").value;
      var confirmedpw = document.getElementById("cpw").value;
      return (
        first.length > 0 &&
        last.length > 0 &&
        display.length > 0 &&
        email.length > 0 &&
        contact.length > 0 &&
        password.length > 0 &&
        confirmedpw.length > 0
      );
    },
    checktwice() {
      var password = document.getElementById("pw").value;
      console.log(this.containsLowerCase(password));
      console.log(this.containsUppercase(password));
      console.log(this.hasNumber(password));
      if (password.length < 8) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must be more than 8 characters";
        return false;
      }
      if (this.hasNumber(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 numeric digit";
        return false;
      }
      if (this.containsUppercase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 uppercase character";
        return false;
      }
      if (this.containsLowerCase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 lowercase character";
        return false;
      }
      if (
        password.length >= 8 &&
        this.hasNumber(password) &&
        this.containsUppercase(password) &&
        this.containsLowerCase(password)
      ) {
        document.getElementById("passwordcheck").innerHTML = "";
        return true;
      }
    },
    createacc() {
      if (this.fieldsFilled() === false) {
        alert("All fields must be filled.");
      } else if (!this.checktwice()) {
        alert(
          "Password requirements not fulfilled. Password needs to have at least 8 characters, with at least 1 lowercase, 1 uppercase and 1 numeric character."
        );
      } else if (!this.matched()) {
        alert("Password do not match");
      } else {
        var firstname = document.getElementById("fname").value;
        var lastname = document.getElementById("lname").value;
        var displayname = document.getElementById("dname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("pw").value;
        var dp = this.imageSource;

        fbase
          .createUserWithEmailAndPassword(email, password)
          .then((data) => {
            database
              .collection("users")
              .doc(data.user.uid)
              .set({
                Name: firstname + " " + lastname,
                DisplayName: displayname,
                Email: email,
                ProfilePic: dp,
                productsSold: [],
                wishlist: [],
                productsListed: [],
              })
              .then(() => {
                this.$router.push({
                  name: "personal",
                  params: { id: data.user.uid },
                });
              });
          })
          .catch(function(err) {
            console.log("signin error", err);
          });
      }
    },
  },
};
</script>
<style scoped>
#signup {
  color: #b88b5e;
  width: 100%;
  height: 80vh;
  float: center;
  max-width: 100%;
  margin-top: 70px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #fffdf2;
}

label {
  display: flex;
  flex-direction: row;
  width: 10em;
  max-width: 400%;
  margin-left: 10px;
  text-align: left;
  justify-content: flex-end;
  display: inline-block;
  text-align: left;
}

input {
  border-color: #f3cfab;
  size: 15px;
  width: 200px;
  height: 23px;
  flex: 0 0 200px;
  margin-right: 200px;
  float: center;
  border-radius: 8px;
  opacity: 0.7;
}

button {
  background-color: #f3cfab;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: italic;
  font-size: 20px;
  width: 100px;
  height: 40px;
  float: none;
  max-width: 70%;
  margin: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border-color: #f3cfab;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width: 100px;
  cursor: pointer;
}

#imagedp {
  height: 430px;
  border-radius: 50%;
  margin-left: 8cm;
}

/* div {
  display: inline-block;
} */

#bgchange {
  margin-right: 30%;
  /* border-radius: 40px; */
  background-color: #f3cfab;
  border-color: #f3cfab;
}

#account {
  margin-right: -5%;
}

p {
  font-size: 10px;
  color: black;
}

h3 {
  color: #b88b5e;
}

a {
  color: #b88b5e;
}

a:hover {
  color: #f3cfab;
}
</style>
