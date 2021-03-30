<template>
  <div>
    <div id="back">
      <router-link to="/shop" exact>
        <span @click="pushtoShop()">Back to Shop</span>
      </router-link>
      <img v-bind:src="this.product[0].pic" /><br />
    </div>

    <div id="description">
      <p>Title: {{ this.product[0].title }}</p>
      <p>Description: {{ this.product[0].description }}</p>
      <p>Brand: {{ this.product[0].brand }}</p>
      <p>Size: {{ this.product[0].size }}</p>
      <p>Price: $ {{ this.product[0].price }}</p>

      <p>
        #{{ this.product[0].shop }} #{{ this.product[0].category }} #{{
          this.product[0].dressocc
        }}
      </p>

      <br />
      <button v-on:click="updateWishList(product[1])">Add to Wishlist</button>
      <button v-on:click="telehandlePopUp(product[0])">Buy it!</button><br />
    </div>
  </div>
</template>

<script>
import { database } from "../firebase.js";
import { fv } from "../firebase.js";
//import {fbase} from '../firebase.js'

export default {
  name: "ProductPage",
  data() {
    return {
      product: [],
      userId: this.$route.params.user,
    };
  },
  props: {
    docId: String,
  },
  methods: {
    fetchProduct: function () {
      console.log(this.doc_id);
      database
        .collection("products_sharlene")
        .doc(this.docId)
        .get()
        .then((doc) => {
          this.product = [doc.data(), doc.id];
        });
    },
    updateWishList: function (productId) {
      //var user = fbase.currentUser;
      console.log(this.userId);
      if (this.userId) {
        database
          .collection("users")
          .doc(this.userId)
          .update({
            wishList: fv.arrayUnion(productId),
          });
        alert("Added to your wishlist!");
      } else {
        alert("Please log into your account to add items to your wishlist");
      }
    },
    telehandlePopUp: function (product) {
      alert("Message me " + product.telehandle + "! :)");
    },
    pushtoShop() {
      this.$router.push({
        name: "shop",
        params: { id: this.userId },
      });
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
router-link {
  font-size: 16px;
  color: rgb(127, 255, 148);
}

img {
  height: 400px;
  margin-left: 10%;
  float: left;
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

.back {
  float: left;
  margin-left: 10%;
}

.description {
  width: 42%;
  padding: 20px 35px 20px 35px;
  text-align: left;
  float: right;
  font-size: 25px;
}
</style>
