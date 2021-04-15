<template>
  <div id="wish">
    <NavBar></NavBar>
    <h2 class="title" style="text-transform: uppercase">
      {{ this.userData.DisplayName }}'s WISHLIST
    </h2>
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
        <p id="avail" v-if="item[4] == false">AVAILABLE!</p>
        <p id="sold" v-else>SOLD!</p>
        <br />
        <img v-bind:src="item[2]" />
        <br />
        <p
          class="itemtitle"
          v-bind:id="item[0]"
          v-on:click="redirectToProduct($event)"
        >
          {{ item[1] }}
        </p>
        <p>S${{ item[3] }}</p>
      </li>
    </ul>
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
                    doc.get("sold"),
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
        console.log(itemId);
        for (var i = 0; i < this.wishList.length; i++) {
          if (this.wishList[i] !== itemId) {
            this.newWL.push(this.wishList[i]);
          }
        }
        this.wishList = this.newWL;
        console.log(this.newWL);
        database
          .collection("users")
          .doc(user.uid)
          .update({
            wishlist: this.newWL,
          })
          .then(() => location.reload());
        //this.delete = true;
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
  height: auto;
  min-height: 100vh;
  font-size: 18px;
  background-color: #fffdf2;
}

.title {
  border-bottom: 1px solid black;
  padding-top: 25px;
  padding-bottom: 50px;
  font-size: 25px;
}

#profile {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}

#wishlist {
  font-size: 25px;
  text-decoration-line: none;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-basis: 300px;
  text-align: center;
  border: 1px solid #f3cfab;
  opacity: 0.5px;
  padding: 10px;
  margin: 10px;
}

img {
  width: 250px;
  height: 250px;
  overflow: hidden;
  object-fit: cover;
}

.itemtitle:hover {
  color: #d4a373;
  cursor: pointer;
}

button {
  float: right;
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: black;
  border-color: #f3cfab;
  width: 25px;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width: 25px;
  cursor: pointer;
}

p {
  padding: 0px;
  margin: 4px;
  text-align: left;
  margin-left: 20px;
}

#sold {
  font-weight: 800;
  color: rgb(235, 173, 173);
  text-align: center;
  margin: 0px;
}

#avail {
  margin: 0px;
  font-weight: 800;
  color: rgb(183, 223, 183);
  text-align: center;
}
</style>
