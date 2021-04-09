<template>
  <div class="navbar">
    <nav id="bar">
      <ul>
        <li>
          <router-link to="/" exact v-show="!this.login" class="label"> 
          <p class="label">Home </p></router-link>
          <div class="dropdown">
          <router-link to="/Personal" exact v-show="this.login" class="label">
            <p class="label">{{ this.userData.DisplayName }}'s Home</p>
			
            <!-- //<span @click="pushtoPersonal()"
              >{{ this.userData.DisplayName }}'s Home</span
            > -->
          </router-link>
          <div class="dropdown-content">
            <a href="#">
				<router-link to="/Personal" id="profile">
                Profile Page
                </router-link>
			</a>
			<a href ="#">
				<router-link to="/userstats">
				Your Dashboard
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
          <router-link to="/shop" exact class="label">
            <p class="label">Shop</p>
            <!-- <span @click="pushtoShop()">Shop</span> -->
          </router-link>
        </li>
        <li>
          <router-link to="/sell" exact class="label"> 
          <p class="label">Sell </p></router-link>
          <!-- <span @click="pushtoSell()">Sell</span> -->
        </li>
        <li>
		<div class="dropdown">
          <router-link to="/news" exact class="label" id="dropbtn">
            <p class="label">Gaia News</p>
            <!-- <span @click="pushtoNews()"> Gaia News </span> -->
          </router-link>
          <div class="dropdown-content">
            <a href="#">
				<router-link to='/news' exact class="droplabel">
				Articles
				</router-link>
			</a>
            <a href="#">
				<router-link to='/communitystats' exact class="droplabel">
				Community Dashboard
				</router-link>
			</a>
            <a href="#">
				<router-link to ='/sales' exact class="droplabel">
				Announcements</router-link>
			</a>
			</div>
          </div>
        </li>
        <li v-show="this.login" @click="logout()" class="label">
          <p clsss="label">Logout</p></li>
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
  background-color: #FAEDCD;
  border-top: 1px solid #111;
  padding: 0;
  padding-top: -32px;

}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  text-align: center;
  background-color: #FAEDCD;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 8px 10px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display:grid;
}

.dropdown:hover #label {
  color:black;
}

/* .dropdown {
  float: left;
  overflow: hidden;
  text-align: center;
} */

.dropdown {
  padding: 1px 12px;
  right:-4cm;
  text-align: center;
}

.navbar a:hover, .dropdown:hover .dropbtn:hover .droplabel:hover {
  font-weight: 400;
  background-color: #D4A373;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  font-size: 15px;
}

.label {
  font-size: 20px;
  color:darkgray;
    padding-top: -32px;

}

.label:hover {
  color:black;
}
</style>
