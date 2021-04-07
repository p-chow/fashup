<template>
  <div id="wish">
    <NavBar></NavBar>
    <nav2 id="nav2">
      <h1>{{ this.userData.DisplayName }}'s Wishlist</h1>
      <ul id="mywishlist">
        <li v-for="item in productswish" v-bind:key="item.title">
          <button
            type="button"
            v-bind:id="item[0]"
            v-on:click="deleteItem($event)"
          >
            X
          </button>
          <br />
          {{ item[1] }} <br />
          <br />
          <img
            v-bind:id="item[0]"
            v-on:click="redirectToProduct($event)"
            v-bind:src="item[2]"
          />
          <br />
          Price: ${{ item[3] }} Available: {{ available(item[4]) }} <br /><br />
          {{ soldAlready(item[4]) }}
        </li>
      </ul>
    </nav2>
  </div>
</template>

<script>
// import { EventPassing } from '../passingid.js'
import { database } from "../firebase.js";
// import { EventUpdateWl } from '../updatingWishlist.js'
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";
//import {fv} from '../firebase.js'

export default {
  data() {
    return {
      // doc_id:this.$route.params.id,
      wishList: [],
      productswish: [],
      newWL: [],
      userEmail: "",
      delete: false,
      userData: {},
    };
  },
  components: {
    NavBar,
  },
  created() {
    // EventPassing.$on("documentid", data =>{
    // 		this.doc_id = data
    // 		console.log(data)
    // 		console.log("doc_id " + this.doc_id)
    // });
    this.getWishList();
    this.loadUserData();
  },
  methods: {
    getWishList() {
      var user = fbase.currentUser;
      //this.userEmail = user.email
      console.log(user.uid);
      database
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          var curr = snapshot.data().wishlist;
          for (var i = 0; i < curr.length; i++) {
            this.wishList.push(curr[i]);
          }
          console.log(this.wishList);
          database
            .collection("products")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (this.wishList.includes(doc.id)) {
                  this.productswish.push([
                    doc.id,
                    doc.get("title"),
                    doc.get("imgFile"),
                    doc.get("price"),
                  ]);
                }
              });
              console.log(this.productswish);
            });
        });
    },
    // pushtoWish(){
    // 	this.$router.push({
    // 		name: 'wishlist',
    // 		params: { id: this.doc_id}
    // 	})

    // },
    // pushtoPersonal(){
    // 	this.$router.push({
    // 		name: 'personal',
    // 		params: { id: this.doc_id}
    // 	})
    // },
    // pushtoChange(){
    // 	this.$router.push({
    // 		name: 'change',
    // 		params: { id: this.doc_id}
    // 	})
    // },
    redirectToProduct(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({
        name: "product",
        params: { docId: doc_id },
      });
    },
    deleteItem(event) {
      const user = fbase.currentUser;
      if (user) {
        let itemId = event.target.getAttribute("id");
        for (var i = 0; i < this.wishList.length; i++) {
          if (this.wishList[i] != itemId) {
            this.newWL.push(this.wishList[i]);
          }
        }
        console.log(this.newWL);
        database
          .collection("users")
          .doc(user.uid)
          .update({
            wishList: this.newWL,
          });
        this.delete = true;
      }
      //   EventUpdateWl.$emit("new-wishlist", [this.doc_id, this.delete]).then(
      //     this.pushtoPersonal()
      //   );
    },
    available(bool) {
      let isAvail = bool;
      if (isAvail) {
        return "No";
      } else {
        return "Yes";
      }
    },
    soldAlready(bool) {
      if (bool) {
        return "Sorry the item is no longer available";
      } else {
        return "";
      }
    },
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
  },
};
</script>
<style scoped>
#wish {
  color: rgb(34, 150, 158);
  width: 99vw;
  max-width: 100%;
  float: left;
  margin-top: -32px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: rgb(182, 243, 238);
}

#navbar1 {
  float: left;
  width: 20vw;
  font-size: 35px;
  background: rgb(222, 255, 255);
  padding-left: 20px;
  padding-top: 100px;
  height: 100vh;
}
#nav2 {
  font-size: 15px;
  float: right;
  padding: 38px;
  width: 70vw;
  padding-top: 1px;
  background: rgb(182, 243, 238);
  margin-top: 1cm;
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
  float: right;
}
</style>
