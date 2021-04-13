<template>
  <section id="changepw">
    <NavBar></NavBar>
    <div id="content">
      <br /><br /><br />
      <label for="email" id="emailaddress">Email Address: </label> 
      <input type="text" id="email" name="email" /> <br>
      <br /><br> <br>
      <label for="pw" id="password">New Password: </label>
      <input type="password" id="pw" name="pw" v-on:change="check()" />
      <br /><br>
      <p id="passwordcheck"></p>
      <br />
      <label for="cpw" id="confirm">Confirm Password: </label>
      <input type="password" id="cpw" name="cpw" v-on:change="matched()" />
      <br /> <br>
      <p id="matching"></p>
      <button v-on:click="reset()" type="button">Change Password</button>
      <p v-show="this.changed">
        Your password has been successfully updated!
      </p>
    </div>
  </section>
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
            //alert("Updated password successfully");
          })
          .catch(function(error) {
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
  height: auto;
  min-height: 100vh;
  color: #b88b5e;
  background-color: #fffdf2;
}

label {
  display: flex;
  width: 10em;
  max-width: 400%;
  margin-left: 280px;
  font-size: 25px;
  text-align: left;
  padding-bottom: 3px;
  margin-bottom: 5px;
}

input {
  tab-size: 5px;
  flex: 0 0 200px;
  width: 350px;
  padding-bottom: 10px;
  border: black solid 1px;
  size: 15px;
  width: 400px;
  height: 28px;
  border-radius: 25px;
  background-color: white;
  margin-left: 280px;
  float: left;
}

#content {
  font-size: 15px;
  padding-left: 20vw;
  padding-top: 1px;
  background: #fffdf2;
  margin-top: 1cm;
}

button {
  background-color: #f3cfab;
  border-block-color: #f3cfab;
  width: 100px;
  height: 50px;
  float: none;
  right: 10cm;
  max-width: 70%;
  margin: 50px;
  padding: 0 5px;
  box-sizing: border-box;
  margin-left: -200px;
  border-radius: 10px;
  font-size: 15px;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width:100px;
}

p {
  font-size: 15px;
  color: darkred;
  text-align: left;
  margin-left: 350px;
}
</style>
