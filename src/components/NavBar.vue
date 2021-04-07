<template>
  <div class="navbar">
    <nav id="bar">
      <ul>
        <li>
          <router-link to="/" exact v-show="!this.login"> Home </router-link>
          <div class="dropdown">
          <button class="dropbtn"> <router-link to="/Personal" exact v-show="this.login">
            {{ this.userData.DisplayName }}'s Home
			
            <!-- //<span @click="pushtoPersonal()"
              >{{ this.userData.DisplayName }}'s Home</span
            > -->
          </router-link></button>
          <div class="dropdown-content">
            <a href="#">
				<router-link to="/Personal" id="profile">
                Profile Page
                </router-link>
			</a>
            <a href="#">
				<router-link to="/wishlist" id="wishlist">
                Wishlist
                </router-link>
			</a>
            <a href="#">
				<router-link to="/change" id="change">
                Change Password
                </router-link>
			</a>
          </div>
          </div>
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
		<div class="dropdown">
          <button class="dropbtn"> <router-link to="/news" exact>
            Gaia News
            <!-- <span @click="pushtoNews()"> Gaia News </span> -->
          </router-link></button>
          <div class="dropdown-content">
            <a href="#">
				<router-link to='/news' exact>
				Articles
				</router-link>
			</a>
            <a href="#">
				<router-link to='/communitystats' exact>
				Community Dashboard
				</router-link>
			</a>
            <a href="#">
				<router-link to ='/sales' exact>
				Announcements</router-link>
			</a>
			</div>
          </div>
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
      userData: {},
    };
  },
  methods: {
    notLogged() {
      return this.login;
    },
    logout() {
      fbase.signOut().then(() => {
        this.$router.replace({
          name: "home",
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
  },
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
  flex-basis: 200px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  background-color: rgb(221, 219, 219);
  margin: 1px;
}
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 25px;  
  border: none;
  outline: none;
  color: white;
  padding: 10px 12px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  right:-4cm;
}

.navbar a:hover, .dropdown:hover .dropbtn {
  background-color:rgb(209, 252, 255);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
</style>
