<template>
  <div id="pdtPage">
    <NavBar></NavBar>
    <div id="back">
      <!-- <router-link to="/shop" exact> 
        Back to Shop-->
      <!-- <span @click="pushtoShop()">Back to Shop</span> -->
      <!-- </router-link> -->
      <br />
      <br />
      <br />
      <img v-bind:src="this.product[0].imgFile" /><br />
    </div>

    <div id="description">
      <p>Title: {{ this.product[0].title }}</p>
      <p>Description: {{ this.product[0].description }}</p>
      <p>Brand: {{ this.product[0].brand }}</p>
      <p>Size: {{ this.product[0].size }}</p>
      <p>Price: $ {{ this.product[0].price }}</p>

      <p id="tags">
        #{{ this.product[0].shop }} #{{ this.product[0].category }} #{{
          this.product[0].dressocc
        }}
      </p>
      <br />
      <button
        v-show="this.product[0].sold == false && this.belongs == false"
        v-on:click="updateWishList(product[1])"
      >
        Add to Wishlist
      </button>
      <button
        v-show="this.product[0].sold == false && this.belongs == false"
        v-on:click="telehandlePopUp(product[0])"
      >
        Buy it!
      </button>
      <button
        id="edit"
        v-show="this.belongs"
        v-bind:docid="product[1]"
        v-on:click="updateProduct(pressed($event))" 
      >
        Edit
      </button>
      <br />
      <p id="sold" v-show="this.product[0].sold == true">SOLD!</p>
      <br />
    </div>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { fv } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";

export default {
  name: "ProductPage",
  data() {
    return {
      product: [],
      belongs: false,
      //userId: this.$route.params.user,
    };
  },
  components: {
    NavBar,
  },
  props: {
    docId: String,
  },
  methods: {
    fetchProduct: function() {
      const user = fbase.currentUser;
      if (user) {
        //console.log(this.doc_id);
        database
          .collection("products")
          .doc(this.docId)
          .get()
          .then((doc) => {
            this.product = [doc.data(), doc.id];
          });
      }
    },
    updateWishList: function(productId) {
      var user = fbase.currentUser;
      //console.log(this.userId);
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().wishlist.includes(productId) == false) {
              console.log(doc.data().wishlist.includes(productId));
              database
                .collection("users")
                .doc(user.uid)
                .update({
                  wishlist: fv.arrayUnion(productId),
                });
              alert("Added to your wishlist!");
            } else {
              alert("Already in your wishlist.");
            }
          });
      }
      //} else {
      //alert("Please log into your account to add items to your wishlist");
      //}
    },
    telehandlePopUp: function(product) {
      alert(
        "You will be redirected to telegram to start a chat with the seller!"
      );
      window.open(product.telehandle, '_blank').focus()
      //location.href = product.telehandle;
    },
    // pushtoShop() {
    //   this.$router.push({
    //     name: "shop",
    //     params: { id: this.userId },
    //   });
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
            if (this.userData.productsListed.includes(this.docId)) {
              this.belongs = true;
            }
          });
      }
    },
    pressed(event) {
      let doc_id = event.target.getAttribute("docid");
      console.log(doc_id);
      this.$router.push({
        name: "editproduct",
        params: {
          docId: doc_id,
          // user: this.$route.params.id
        },
      });
    },
  },
  created() {
    this.fetchProduct();
    this.loadUserData();
  },
};
</script>

<style scoped>
router-link {
  font-size: 16px;
  color: rgb(127, 255, 148);
  margin-left: 0px;
}

#pdtPage {
  height: 100vh;
}

img {
  height: 400px;
  padding-left: -20px;
  margin-right: 18cm;
  float: left;
}

button {
  background-color: #f3cfab;
  border-color: #f3cfab;
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

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width: 110px;
  cursor: pointer;
}

#back {
  margin-top: 50px;
  float: left;
  padding-left: 20%;
  font-size: 20px;
  text-align: left;
  width: 20vw;
}

#description {
  width: 47vw;
  padding-top: 100px;
  padding-left: 5vw;
  text-align: left;
  float: right;
  font-size: 25px;
  color: black;
}

#tags {
  font-size: 20px;
}

#sold {
  font-weight: 800;
  color: red;
}
</style>
