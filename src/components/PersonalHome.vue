<template>
  <div id="personal">
    <NavBar></NavBar>
    <nav id="navbar1">
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
        Change Password
        <!-- <span @click="pushtoChange()">Change Password</span> -->
      </router-link>
      <!-- <br> <br> <br> <br> <br> <br> <br>   -->
      <!-- <button type="button" id='logout' v-on:click= "logout()">Logout</button> -->
    </nav>
    <nav2>
      <br />      
      <personalDB></personalDB>

      <div id="products">
        <h1>{{ this.userData.Name }}'s Products</h1>
        <ul id="products">
          <li v-for="product in products" v-bind:key="product.id">
            <p v-bind:docid="product[0]" v-on:click="redirectToProduct($event)">
              {{ product[3] }}
            </p>
            <br />
            <img  v-bind:id="product[0]" v-bind:src="product[1]" /><br/>
            <p>Price: ${{ product[2] }}</p>
            <br />
            <button
              type="button"
              v-bind:docid="product[0]"
              v-on:click="
                deleteProduct($event);
                updateProductsListed($event);
              "
            >
              Remove product
            </button>
            <br />
          </li>
        </ul>
      </div>
    </nav2>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { fv } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";
import PersonalDashboard from "./PersonalDashboard.vue";
//import { EventPassing } from "../passingid.js";
// import { EventLogout } from "../loggingout.js";
// import { EventUpdateWl } from "../updatingWishlist.js";

export default {
  data() {
    return {
      // user_id: this.$route.params.id,
      pic: "",
      //   name: "",
      productsId: [],
      products: [],
      currUserId: [],
      userData: {},
    };
  },
  components: {
    NavBar,
    personalDB: PersonalDashboard,
  },
  methods: {
    // getUserName() {
    //   database
    //     .collection("users")
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         if (doc.id === this.user_id) {
    //           this.name = doc.get("Name");
    //         }
    //       });
    //     });
    // },
    getProductsListed: function () {
      const user = fbase.currentUser;
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.productsId = snapshot.data().productsListed;
            database
              .collection("products")
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  if (this.productsId.includes(doc.id)) {
                    this.products.push([
                      doc.id,
                      doc.get("imgFile"),
                      doc.get("price"),
                      doc.get("title"),
                    ]);
                  }
                });
              });
          });
      }
    },
    redirectToProduct(event) {
      let doc_id = event.target.getAttribute("docid");
      this.$router.push({
        name: "product",
        params: { docId: doc_id },
      });
    },
    deleteProduct(event) {
      let doc_id = event.target.getAttribute("docid");
      database
        .collection("products_sharlene")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    updateProductsListed(event) {
      const user = fbase.currentUser;
      if (user) {
        let doc_id = event.target.getAttribute("docid");
        database
          .collection("users")
          .doc(user.uid)
          .update({
            productsListed: fv.arrayRemove(doc_id),
          });
      }
    },
    // logout(){
    // 	fbase.signOut()
    // 	EventLogout.$emit('Logging-out', "loggingOutOfAcc")
    // 	this.$router.push({
    // 		path:'/'
    // 	})
    // },
    // profilepic() {
    //   database
    //     .collection("users")
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         if (doc.id === this.user_id) {
    //           this.pic = doc.get("ProfilePic");
    //         }
    //       });
    //     });
    // },
    // pushtoWish() {
    //   EventPassing.$emit("documentid", this.user_id);
    //   console.log(this.user_id);
    //   this.$router.push({
    //     name: "wishlist",
    //     params: { id: this.user_id },
    //   });
    // },
    // pushtoPersonal() {
    //   this.$router.push({
    //     name: "personal",
    //     params: { id: this.user_id },
    //   });
    // },
    // pushtoChange() {
    //   this.$router.push({
    //     name: "change",
    //     params: { id: this.user_id },
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
    // this.profilepic();
    // this.getUserName();
    this.getProductsListed();
    this.loadUserData();
    // EventUpdateWl.$on("new-wishlist", (data) => {
    //   if (data[1]) {
    //     this.pushtoWish();
    //   }
    // });
    /*this.$router.push({
				name:'wishlist',
				params: { id: data[0]} 
			})*/
  },
};
</script>
<style scoped>
#personal {
  color: rgb(34, 150, 158);
  width: 39.8cm;
  float: left;
  right: 100cm;
  margin-top: -32px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: rgb(182, 243, 238);
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
nav {
  float: left;
  width: 23.5%;
  height: 100vh;
  font-size: 35px;
  background: rgb(222, 255, 255);
  padding-left: 20px;
  padding-top: 100px;
  display: table;
}
nav2 {
  font-size: 15px;
  float: right;
  padding: 38px;
  width: 70%;
  padding-top: 1px;
  background: rgb(182, 243, 238);
  margin-top: 1cm;
  display: table-cell;
}
#wishlist {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}
img {
  width: 300px;
  float: left;
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
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

button {
  background-color: rgb(140, 228, 255);
  border-color: rgb(140, 228, 255);
  width: 110px;
  height: 40px;
  font-size: 13px;
  float: none;
  right: 10cm;
  max-width: 70%;
  margin: 20px;
  margin-top: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 10px;
  border-width: 1px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-style: italic;
}
</style>