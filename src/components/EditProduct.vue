<template>
  <div id="edit">
    <NavBar></NavBar>
    <h2 class="title">E D I T</h2>
    <div id="info">
      <label> Description: </label><br />
      <textarea
        id="description"
        type="text"
        rows="5"
        cols="40"
        :value="[[this.product.description]]"
      /><br /><br />
      <label> Shop: </label>
        <br />
        <select id="shop" name="shop">
          <option :value="[[this.product.shop]]" disabled selected> 
            {{this.product.shop}}
          </option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <br /><br />
        <label for="category"> Category: </label><br />
        <select
          id="category"
          name="category"
          required
        >
        <option :value="[[this.product.category]]" disabled selected> 
            {{this.product.category}}
          </option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Dress">Dress</option>
          <option value="Accesories">Accesories</option>
        </select>
        <br /><br />
        <label for="dressocc"> Dressing Occasion: </label><br />
        <select
          id="dressocc"
          name="dressocc"
          required
        >
        <option :value="[[this.product.dressocc]]" disabled selected> 
            {{this.product.dressocc}}
          </option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
        </select>
        <br /><br />
      <label> Brand: </label><br />
      <input
        id="brand"
        type="text"
        :value="[[this.product.brand]]"
      /><br /><br />
      <label> Size: </label><br />
      <select id="size" name="size">
        <option :value="[[this.product.size]]" disabled selected>
          {{ this.product.size }}
        </option>
        <option value="Baby (Preemie, 0-24 months)">
          Baby (Preemie, 0-24 months)
        </option>
        <option value="Toddler (2T-6T)">Toddler (2T-6T)</option>
        <option value="Little Kid (4-6X)">Little Kid (4-6X)</option>
        <option value="Big Kid or Tween (7-16)">Big Kid or Tween (7-16)</option>
        <option value="Free Size (adults)">Free Size (adults)</option>
        <option value="XXS / EU 32 / UK 4 / US 2">
          XXS / EU 32 / UK 4 / US 2
        </option>
        <option value="XS / EU 34 / UK 6 / US 4">
          XS / EU 34 / UK 6 / US 4
        </option>
        <option value="S / EU 36 / UK 8 / US 6">S / EU 36 / UK 8 / US 6</option>
        <option value="M / EU 38 / UK 10 / US 8">
          M / EU 38 / UK 10 / US 8
        </option>
        <option value="L / EU 40 / UK 12 / US 10">
          L / EU 40 / UK 12 / US 10
        </option>
        <option value="XL / EU 42 / UK 14 / US 12">
          XL / EU 42 / UK 14 / US 12
        </option>
      </select>
      <br /><br />
      <label> Price: </label><br />
      <input
        id="price"
        type="number"
        min="0"
        step="0.1"
        :value="[[this.product.price]]"
      /><br /><br /><br />
      <button type="button" v-bind:docid="this.docId" v-on:click="updateProduct($event)">Update Product</button>
    </div>
  </div>
</template>


<script>
import { database } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";

export default {
  name: "EditProduct",
  data() {
    return {
      product: {},
    };
  },
  components: {
    NavBar,
  },
  props: {
    docId: String,
  },
  methods: {
    fetchDetails: function () {
      database
        .collection("products")
        .doc(this.docId)
        .get()
        .then((snapshot) => {
          this.product = snapshot.data();
        });
    },
    updateProduct(event) {
      let doc_id = event.target.getAttribute("docid");
      database
        .collection("products")
        .doc(this.docId)
        .update({
          description: document.getElementById("description").value,
          shop: document.getElementById("shop").value,
          category: document.getElementById("category").value,
          dressocc: document.getElementById("dressocc").value,
          brand: document.getElementById("brand").value,
          size: document.getElementById("size").value,
          price: parseInt(document.getElementById("price").value),
        }).then(() => {
          this.$router.push({
            name: "product",
            params: {
              docId: doc_id
            }
          });
        })
    },
    loadUserData() {
      const user = fbase.currentUser;
      if (user) {
        const uid = user.uid;
        // console.log("userid " + uid);
        // console.log("productid " + this.docId);
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
  },
  created() {
    this.fetchDetails();
    this.loadUserData();
  },
};
</script>

<style scoped>
#edit {
  background-color: #fffdf2;
  height: 100vh;
}

.title {
  border-bottom: 1px solid black;
  padding-top: 25px;
  padding-bottom: 50px;
  font-size: 25px;
}

#info {
  float: center;
  margin-top: 60px;
  font-size: 20px;
  color: black;
}

label {
  padding-bottom: 3px;
  margin-bottom: 5px;
}

select {
  border: black solid 1px;
  size: 15px;
  width: 400px;
  height: 28px;
  float: center;
  border-radius: 0px;
  background-color: #faedcd;
}

input {
  border: black solid 1px;
  size: 15px;
  width: 400px;
  height: 28px;
  float: center;
  border-radius: 0px;
  background-color: #faedcd;
}

textarea {
  border: black solid 1px;
  border-radius: 0px;
  width: 400px;
  float: center;
  background-color: #faedcd;
}

button {
  background-color: #faedcd;
  border-color: #faedcd;
  float: center;
  padding: 10px;
  width: 100px;
  box-sizing: border-box;
  font-size: 15px;
  border-radius: 60px;
  border-width: 1px;
  font-weight: 400;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width: 100px;
  cursor: pointer;
}
</style>