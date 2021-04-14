<template>
  <section id="sell">
    <NavBar></NavBar>
    <router-link to="/sell" exact></router-link>
    <h2 class="title">S E L L</h2>
    <div id="left">
      <div id="imgArea">
        <imgInput v-model="imgFile"></imgInput>
      </div>
      <br />
      <br />
    </div>
    <div id="info">
      <form>
        <label for="title"> Title: </label>
        <br />
        <input
          id="title"
          name="title"
          type="text"
          v-model.lazy="product.title"
          required
        />
        <br /><br />
        <label for="shop"> Shop: </label>
        <br />
        <select id="shop" name="shop" v-model.lazy="product.shop" required>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
        <br /><br />
        <label for="category"> Category: </label><br />
        <select
          id="category"
          name="category"
          v-model.lazy="product.category"
          required
        >
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Dress">Dress</option>
          <option value="Accessories">Accessories</option>
        </select>
        <br /><br />
        <label for="dressocc"> Dressing Occasion: </label><br />
        <select
          id="dressocc"
          name="dressocc"
          v-model.lazy="product.dressocc"
          required
        >
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
        </select>
        <br /><br />
        <label for="brand"> Brand: </label><br />
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
        <label for="size"> Size: </label><br />
        <select id="size" name="size" v-model.lazy="product.size" required>
          <option value="Baby (Preemie, 0-24 months)">Baby (Preemie, 0-24 months)</option>
          <option value="Toddler (2T-6T)">Toddler (2T-6T)</option>
          <option value="Little Kid (4-6X)">Little Kid (4-6X)</option>
          <option value="Big Kid or Tween (7-16)">Big Kid or Tween (7-16)</option>
          <option value="Free Size (adults)">Free Size (adults)</option>
          <option value="XXS / EU 32 / UK 4 / US 2">XXS / EU 32 / UK 4 / US 2</option>
          <option value="XS / EU 34 / UK 6 / US 4">XS / EU 34 / UK 6 / US 4</option>
          <option value="S / EU 36 / UK 8 / US 6">S / EU 36 / UK 8 / US 6</option>
          <option value="M / EU 38 / UK 10 / US 8">M / EU 38 / UK 10 / US 8</option>
          <option value="L / EU 40 / UK 12 / US 10">L / EU 40 / UK 12 / US 10</option>
          <option value="XL / EU 42 / UK 14 / US 12">XL / EU 42 / UK 14 / US 12</option>
        </select>
        <br /><br />
        <label for="price"> Price: </label><br />
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
        <label for="telehandle"> Telegram Link: </label><br />
        <input
          id="telehandle"
          name="telehandle"
          v-model.lazy="product.telehandle"
          type="text"
          placeholder="https://t.me/[yourusername] "
          required
        />
      </form>
      <br /><br />
      <div id="buttonArea">
        <button
          v-show="!this.callsubmit && !this.sellAnother"
          v-on:click.prevent="checkInput()"
        >
          Submit
        </button>
        <button
          id="confirm"
          v-show="this.callsubmit && !this.sellAnother"
          v-on:click.prevent="callingSubmit()"
        >
          Confirm submission
        </button>
        <p v-show="this.sellAnother">Item successfully posted!</p>
        <br />
        <button
          id="reload"
          v-show="this.sellAnother"
          v-on:click.prevent="reloadPage()"
        >
          Click to sell another item!
        </button>
      </div>
    </div>
  </section>
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
      sellAnother: false,
      newupload: null,
      sortedProductCurr: [],
      imgFile: "",
      product: {
        brand: "",
        category: "",
        dressocc: "",
        description: "",
        imgFile: null,
        price: null,
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
    checkInput: function() {
      //console.log(this.imgFile);
      if (
        this.product.title.length == 0 ||
        this.product.shop.length == 0 ||
        this.product.category.length == 0 ||
        this.product.dressocc.length == 0 ||
        this.product.brand.length == 0 ||
        this.product.description.length == 0 ||
        this.product.size.length == 0 ||
        this.product.telehandle.length == 0 ||
        this.imgFile.length == 0 ||
        this.product.price == null
      ) {
        alert("Please fill in all fields before submitting.");
      } else {
        this.submit();
      }
    },
    submit: function() {
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
                this.sortedProductCurr = sortedProduct;
                var uploadTask = firebase
                  .storage()
                  .ref("Images/" + this.product["title"] + ".jpeg")
                  .put(this.fileneeded);
                this.newupload = uploadTask;
                uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                  var imgUrl = url;
                  firebase
                    .database()
                    .ref("Pictures/" + sortedProduct["title"])
                    .set({
                      Name: sortedProduct["title"],
                      Link: imgUrl,
                    });
                });
                if (this.callsubmit === false) {
                  this.callsubmit = !this.callsubmit;
                  console.log(sortedProduct["title"]);
                  database
                    .collection("products")
                    .add(sortedProduct)
                    .then(function(docRef) {
                      database
                        .collection("users")
                        .doc(user.uid)
                        .update({
                          productsListed: fv.arrayUnion(docRef.id),
                        }); //.then(() => location.reload());
                    });
                } else {
                  this.callsubmit = !this.callsubmit;
                }
              })
          );
        /*if (this.callsubmit === false) {
 				this.callsubmit = !this.callsubmit
 			} else {
 				this.callsubmit = !this.callsubmit
			}*/
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
    callingSubmit() {
      this.sellAnother = true;
      this.submit();
    },
    reloadPage() {
      window.location.reload();
    },
  },
  created() {
    // EventPassing.$on("documentid", (data) => {
    //   this.user_id = data;
    //   console.log(data);
    //   console.log(this.user_id);
    // });
    EventPassing.$on("pass-files", (data) => {
      this.fileneeded = data;
    });
    console.log(this.fileneeded);
    this.loadUserData();
  },
};
</script>

<style scoped>
#sell {
  background-color: #fffdf2;
  height: 180vh;
}

.title {
  border-bottom: 1px solid black;
  padding-top: 25px;
  padding-bottom: 50px;
  font-size: 25px;
}

#imgArea {
  height: 350px;
  margin-left: 30%;
}

#left {
  float: left;
  padding: 20px;
  width: 48vw;
  font-size: 22px;
  position: relative;
}

#info {
  width: 42vw;
  padding: 20px 35px 20px 35px;
  text-align: left;
  float: right;
  font-size: 20px;
  color: black;
}

label {
  padding-bottom: 3px;
  margin-bottom: 5px;
}

input {
  border: black solid 1px;
  size: 15px;
  width: 400px;
  height: 28px;
  flex: 0 0 200px;
  margin-right: 200px;
  float: center;
  border-radius: 0px;
  background-color: #faedcd;
}

select {
  border: black solid 1px;
  size: 15px;
  width: 400px;
  height: 28px;
  flex: 0 0 200px;
  margin-right: 200px;
  float: center;
  border-radius: 0px;
  background-color: #faedcd;
}

textarea {
  border: black solid 1px;
  border-radius: 0px;
  width: 400px;
  background-color: #faedcd;
}

button {
  background-color: #faedcd;
  border-color: #faedcd;
  float: left;
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

#reload {
  width: 18em;
}
</style>
