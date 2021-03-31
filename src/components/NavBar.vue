<template>
  <div class="navbar">
    <nav id="bar">
      <ul>
        <li>
          <router-link to="/" exact v-show="!this.login"> Home </router-link>
          <router-link to="/Personal" exact v-show="this.login">
            {{ this.userData.DisplayName }}'s Home
            <!-- //<span @click="pushtoPersonal()"
              >{{ this.userData.DisplayName }}'s Home</span
            > -->
          </router-link>
        </li>
        <li>
          <router-link to="/shop" exact>
            Shop
            <!-- <span @click="pushtoShop()">Shop</span> -->
          </router-link>
        </li>
        <li>
          <router-link to="/sell" exact> Sell </router-link>
          <!-- <span @click="pushtoSell()">Sell</span> -->
        </li>
        <li>
          <router-link to="/news" exact>
            Gaia News
            <!-- <span @click="pushtoNews()"> Gaia News </span> -->
          </router-link>
        </li>
        <li v-show="this.login" @click="logout()">Logout</li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { database, fbase } from "../firebase.js";
//import { database } from '../firebase.js'
export default {
  data() {
    return {
      login: false,
      //   user_display: [],
      //   curr_userId: "",
      userData: {}
    };
  },
  methods: {
    notLogged() {
      return this.login;
    },
    logout() {
      fbase.signOut().then(() => {
        this.$router.replace({
          name: "home"
        });
      });
    },
    // pushtoShop() {
    //   this.$router.push({
    //     name: "shop",
    //     params: { id: this.curr_userId },
    //   });
    // },
    // pushtoPersonal() {
    //   this.$router.push({
    //     name: "personal",
    //     params: { id: this.curr_userId },
    //   });
    // },
    // pushtoSell() {
    //   this.$router.push({
    //     name: "sell",
    //     params: { id: this.curr_userId },
    //   });
    // },
    // pushtoNews() {
    //   this.$router.push({
    //     name: "news",
    //     params: { id: this.curr_userId },
    //   });
    // },
    loadUserData() {
      const user = fbase.currentUser;
      if (user) {
        this.login = true;
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
  },
  created() {
    this.loadUserData();
    // EventListening.$on("Logging-in", data => {
    // 	this.user_display.push(data[0])
    // 	this.curr_userId = data[1]
    // 	this.login = true;
    // 	this.notLogged()
    // 	this.pushtoPersonal();
    // })
    // EventLogout.$on('Logging-out', data => {
    // 	console.log(data)
    // 	this.login = false;
    // 	this.notLogged()
    // })
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
#bar {
  width: 150%;
  float: left;
  right: 5cm;
  max-width: 100%;
  margin: 1px;
  margin-top: 1px;
  padding: 0 px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  background-color: rgb(221, 219, 219);
  margin: 1px;
}
</style>