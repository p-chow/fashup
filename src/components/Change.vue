<template>
  <div id="changepw">
    <NavBar></NavBar>
    <nav>
      <br /><br /><br />
      <router-link to="/Personal" id="profile">
        Profile Page
        <!-- <span @click="pushtoPersonal()">Profile Page</span> -->
      </router-link>
      <br />
      <router-link to="/wishlist" id="wishlist">
        Wishlist
        <!-- <span @click="pushtoWish()">Wishlist</span> -->
      </router-link>
      <br />
      <router-link to="/change" id="change">
        Change password
        <!-- <span @click="pushtoChange()">Change Password</span> -->
      </router-link>
    </nav>
    <nav2>
      <br /><br /><br />
      <label for="email" id="emailaddress">Email Address: </label> <br />
      <input type="text" id="email" name="email" /> <br />
      <br />
      <label for="pw" id="password">New Password: </label><br />
      <input type="password" id="pw" name="pw" v-on:change="check()" />
      <p id="passwordcheck"></p>
      <label for="cpw" id="confirm">Confirm Password: </label> <br />
      <input type="password" id="cpw" name="cpw" v-on:change="matched()" />
      <p id="matching"></p>
      <button v-on:click="reset()" type="button">Change Password</button>
      <p v-show="this.changed">
        Your password has been successfully updated! Please click
        <router-link to="/login">here</router-link> to login again
      </p>
    </nav2>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";

export default {
  data() {
    return {
      //datapacket: "",
      //id_user: this.$route.params.id,
      checked: false,
      changed: false,
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
      if (password.length < 8) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must be more than 8 characters";
      }
      if (this.hasNumber(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 numeric digit";
      }
      if (this.containsUppercase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 uppercase character";
      }
      if (this.containsLowerCase(password) === false) {
        document.getElementById("passwordcheck").innerHTML =
          "Password must contain at least 1 lowercase character";
      }
      if (
        password.length >= 8 &&
        this.hasNumber(password) &&
        this.containsUppercase(password) &&
        this.containsLowerCase(password)
      ) {
        document.getElementById("passwordcheck").innerHTML = "";
      }
      this.checked = true;
    },
    matched() {
      var password = document.getElementById("pw").value;
      var confirmedpw = document.getElementById("cpw").value;
      if (password !== confirmedpw) {
        document.getElementById("matching").innerHTML =
          "Password does not match";
      } else {
        document.getElementById("matching").innerHTML = " ";
      }
    },
    reset() {
      var user = fbase.currentUser;
      if (user) {
        //console.log(this.id_user);
        var newPassword = document.getElementById("pw").value;
        //var emailAddress = document.getElementById("email").value;
        /*database.collection("users").doc(user.uid).update({
          Password: newPassword,
        });*/
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Updated password successfully");
          })
          .catch(function (error) {
            alert(error);
          });
        //   //database
        //     .collection("users")
        //     .get()
        //     .then((snapshot) => {
        //       snapshot.docs.forEach((doc) => {
        //         if (doc.get("Email") == emailAddress) {
        //           this.datapacket = this.datapacket + doc.id;
        //           database.collection("users").doc(this.datapacket).update({
        //             Password: newPassword,
        //           });
        //         }
        //       });
        //     });
        this.changed = true;
      }
    },
    // pushtoWish(){
    // 	this.$router.push({
    // 		name: 'wishlist',
    // 		params: { id: this.id_user}
    // 	})

    // },
    // pushtoPersonal(){
    // 	this.$router.push({
    // 		name: 'personal',
    // 		params: { id: this.id_user}
    // 	})
    // },
    // pushtoChange(){
    // 	this.$router.push({
    // 		name: 'change',
    // 		params: { id: this.id_user}
    // 	})
    // },
    loadUserData() {
      const user = fbase.currentUser;
      if (user) {
        const uid = user.uid;
        console.log("userid " + uid);
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            this.userData.id = doc.id;
          });
      }
    },
    created() {
      this.loadUserData();
    },
  },
};
</script>

<style scoped>
#changepw {
  color: rgb(34, 150, 158);
  width: 1520px;
  float: left;
  right: 100cm;
  max-width: 100%;
  margin-top: -32px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: rgb(182, 243, 238);
}

label {
  display: flex;
  flex-direction: row;
  clear: left;
  width: 10em;
  max-width: 400%;
  margin-left: 500px;
  font-size: 25px;
  justify-content: flex-end;
}

input {
  border-block-color: rgb(0, 0, 0);
  tab-size: 5px;
  size: 10px;
  height: 25px;
  flex: 0 0 200px;
  margin-left: 20px;
  width: 350px;
  border-radius: 25px;
  padding: 10px;
}
nav {
  float: left;
  width: 23.5%;
  font-size: 35px;
  background: rgb(222, 255, 255);
  padding-left: 20px;
  padding-top: 100px;
  height: 550px;
}
nav2 {
  font-size: 15px;
  float: right;
  padding: 38px;
  width: 70%;
  padding-top: 1px;
  background: rgb(182, 243, 238);
  margin-top: 1cm;
}
#emailaddress {
  margin-left: 270px;
}
#password {
  margin-left: 270px;
}

#confirm {
  margin-left: 320px;
}
button {
  background-color: rgb(140, 228, 255);
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
  border-color: rgb(140, 228, 255);
}
p {
  font-size: 15px;
  color: black;
}

#change {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}
#profile {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}
#wishlist {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}
</style>