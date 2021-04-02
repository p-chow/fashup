<template>
  <div id="sell">
    <NavBar></NavBar>
    <router-link to="/sell" exact></router-link>
    <h1>Sell</h1>
    <div id="left">
      <div id="imgArea">
        <imgInput v-model="imgFile"></imgInput>
      </div>
      <br />
      <br />
      <div id="buttonArea">
        <button id="send" v-on:click.prevent="submit()">Submit</button>
		<button id = "confirm" v-show='this.callsubmit' v-on:click.prevent ="callingSubmit()">Confirm submission</button>
		<button id = "reload"  v-on:click.prevent = "reloadPage()">Click to sell another item!</button>
      </div>
    </div>
    <div id="info">
      <form>
        <label for="title"> Title: </label>
        <input
          id="title"
          name="title"
          type="text"
          v-model.lazy="product.title"
          required
        />
        <br /><br />

        <label for="shop"> Shop: </label>
        <select id="shop" name="shop" v-model.lazy="product.shop" required>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <br /><br />

        <label for="category"> Category: </label>
        <select
          id="category"
          name="category"
          v-model.lazy="product.category"
          required
        >
          <option value="top">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="dress">Dress</option>
          <option value="accesories">Accesories</option>
        </select>
        <br /><br />

        <label for="dressocc"> Dressing Occasion: </label>
        <select
          id="dressocc"
          name="dressocc"
          v-model.lazy="product.dressocc"
          required
        >
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
        <br /><br />

        <label for="brand"> Brand: </label>
        <input
          id="brand"
          name="brand"
          type="text"
          v-model.lazy="product.brand"
          required
        />
        <br /><br />

        <label for="description"> Description: </label> <br />
        <textarea
          id="description"
          name="description"
          v-model.lazy="product.description"
          placeholder="Describe your product."
          rows="5"
          cols="40"
          required
        ></textarea>
        <br /><br />

        <label for="size"> Size: </label>
        <select id="size" name="size" v-model.lazy="product.size" required>
          <option value="S">S / EU 36 / UK 8 / US 4</option>
          <option value="M">M / EU 38 / UK 10 / US 6</option>
          <option value="L">L / EU 40 / UK 12 / US 8</option>
        </select>
        <br /><br />

        <label for="price"> Price: </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          v-model.lazy.number="product.price"
          step="0.1"
          required
        />
        <br /><br />

        <label for="telehandle"> Telegram Handle: </label>
        <input
          id="telehandle"
          name="telehandle"
          v-model.lazy="product.telehandle"
          type="text"
          placeholder="@"
          required
        />
      </form>
    </div>
  </div>
</template>

<script>
import ImgInput from "./ImgInput.vue";
import { database } from "../firebase.js";
import { fv } from "../firebase.js";
import firebase from "firebase";
import { EventPassing } from "../passingid.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";
export default {
  data() {
    return {
      //user_id: this.$route.params.id,
      callsubmit: false,
      fileneeded: [],
      imgFile: "",
      product: {
        brand: "",
        category: "",
        dressocc: "",
        description: "",
        imgFile: null,
        price: 0,
        shop: "",
        size: "",
        sold: false,
        telehandle: "",
        title: "",
      },
    };
  },
  components: {
    imgInput: ImgInput,
    NavBar,
  },
  methods: {
    submit: function () {
      const user = fbase.currentUser;
      if (user) {
        //var user = fbase.currentUser
        firebase
          .storage()
          .ref()
          .child(this.imgFile.name)
          .put(this.imgFile)
          .then(() =>
            firebase
              .storage()
              .ref()
              .child(this.imgFile.name)
              .getDownloadURL()
              .then((url) => {
                this.product["imgFile"] = url;
                console.log("Image Url " + this.product["imgFile"]);
              })
              .then(() => {
                const sortProduct = (obj) =>
                  Object.keys(obj)
                    .sort()
                    .reduce((res, key) => ((res[key] = obj[key]), res), {});
                const sortedProduct = sortProduct(this.product);
				var uploadTask = firebase.storage().ref('Images/' + this.product["title"] + '.jpeg').put(this.fileneeded)
				uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
					var imgUrl = url;
				firebase.databagitse().ref('Pictures/' + sortedProduct['title']).set({
					Name: sortedProduct['title'],
					Link : imgUrl
				});
				})
				console.log(sortedProduct['title'])
                database
                  .collection("products")
                  .add(sortedProduct)
                  .then(function (docRef) {
                    database
                      .collection("users")
                      .doc(user.uid)
                      .update({
                        productsListed: fv.arrayUnion(docRef.id),
                      })//.then(() => location.reload());
                  });
              })
          );
			
            if (this.callsubmit === false) {
				this.callsubmit = !this.callsubmit
			} else {
				this.callsubmit = !this.callsubmit
			}
      } else {
        alert("Please login to your Fashup account to start selling");
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
	callingSubmit(){
		this.submit().then(()=>this.reloadPage())
	},
	reloadPage(){
		window.location.reload()
	}
  },
  created() {
    // EventPassing.$on("documentid", (data) => {
    //   this.user_id = data;
    //   console.log(data);
    //   console.log(this.user_id);
    // });
	EventPassing.$on('pass-files', data => {
		this.fileneeded = data
	})
	console.log(this.fileneeded)
    this.loadUserData();
  },
};
</script>

<style scoped>
#sell {
  height: 100vh;
}

h1 {
  font-size: 50px;
}

#imgArea {
  height: 300px;
  margin-left: 30%;
}
#buttonArea {
  margin-left: 30%;
}

#left {
  float: left;
  padding: 20px;
  width: 48%;
  font-size: 22px;
  position: relative;
}

#send {
  font-size: 20px;
  background-color: rgb(127, 255, 148);
}
#info {
  width: 42%;
  padding: 20px 35px 20px 35px;
  text-align: left;
  float: right;
  font-size: 25px;
  color: black;
}
</style>