<template>
  <section>
    <div id="personal">
      <NavBar></NavBar>
      <nav2 id="navbar2">
        <br />
		<img id="profilepic" ALIGN="left" v-bind:src = "this.userData.ProfilePic"> 
		<img id="profilepic2" ALIGN="right" v-bind:src = "this.userData.ProfilePic">
        <h1 id="welcome">
				Welcome {{ this.userData.DisplayName }}! </h1>  
        <br> <div id="products">
          <h1 id = "username">{{ this.userData.DisplayName }}'s Products</h1>
          <ul id="productsListed">
            <li v-for="product in productsListed" v-bind:key="product.id">
              <img v-bind:id="product[0]" v-bind:src="product[1]" /><br />
              <p 
                id= "itemtitle"
                v-bind:docid="product[0]"
                v-on:click="redirectToProduct($event)"
              >
                {{ product[3] }}</p>
              <p>S${{ product[2] }}</p>
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
              
              <button
                type="button"
                v-bind:docid="product[0]"
                v-show="product[4] == false"
                v-on:click="
                  toSold($event);
                  removeProductsListed($event);
                  updateProductsSold($event);
                "
              >
                Mark as Sold
              </button>
            </li>
          </ul>

          <h1 id="username">{{ this.userData.DisplayName }}'s Sold Products</h1>
          <ul id="productsSold">
            <li v-for="product in productsSold" v-bind:key="product.id">
              <img v-bind:id="product[0]" v-bind:src="product[1]" />
              <p
                id= "itemtitle"
                v-bind:docid="product[0]"
                v-on:click="redirectToProduct($event)"
              >
                {{ product[3] }}
              </p>
              <p>S${{ product[2] }}</p>
            </li>
          </ul>
        </div>
      </nav2>
    </div>
  </section>
</template>

<script>
import { database } from "../firebase.js";
import { fv } from "../firebase.js";
import { fbase } from "../firebase.js";
import NavBar from "./NavBar.vue";
//import { EventPassing } from "../passingid.js";
// import { EventLogout } from "../loggingout.js";
// import { EventUpdateWl } from "../updatingWishlist.js";

export default {
  data() {
    return {
      // user_id: this.$route.params.id,
      pic: "",
      //   name: "",
      productsListedId: [],
      productsListed: [],
      productsSoldId: [],
      productsSold: [],
      //currUserId: [],
      userData: {},
    };
  },
  components: {
    NavBar,
  },
  methods: {
    getProductsListed: function() {
      const user = fbase.currentUser;
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.productsListedId = snapshot.data().productsListed;
            database
              .collection("products")
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  if (this.productsListedId.includes(doc.id)) {
                    this.productsListed.push([
                      doc.id,
                      doc.get("imgFile"),
                      doc.get("price"),
                      doc.get("title"),
                      doc.get("sold")
                    ]);
                  }
                });
              });
          });
      }
    },
    getProductsSold: function() {
      const user = fbase.currentUser;
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.productsSoldId = snapshot.data().productsSold;
            database
              .collection("products")
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  if (this.productsSoldId.includes(doc.id)) {
                    this.productsSold.push([
                      doc.id,
                      doc.get("imgFile"),
                      doc.get("price"),
                      doc.get("title")
                    ]);
                  }
                });
              });
          });
      }
    },
    redirectToProduct(event) {
      let doc_id = event.target.getAttribute("docid");
      console.log(doc_id)
      this.$router.push({
        name: "product",
        params: { docId: doc_id },
      });
    },
    deleteProduct(event) {
      let doc_id = event.target.getAttribute("docid");
      database
        .collection("products")
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
    toSold(event) {
      const user = fbase.currentUser;
      if (user) {
        let doc_id = event.target.getAttribute("docid");
        database
          .collection("products")
          .doc(doc_id)
          .update({
             sold: true 
            });
      }
    },
    updateProductsSold(event) {
      const user = fbase.currentUser;
      if (user) {
        let doc_id = event.target.getAttribute("docid");
        database
          .collection("users")
          .doc(user.uid)
          .update({
            productsSold: fv.arrayUnion(doc_id),
          });
      }
    },
    removeProductsListed(event) {
      const user = fbase.currentUser;
      if (user) {
        let doc_id = event.target.getAttribute("docid");
        database
          .collection("users")
          .doc(user.uid)
          .update({
            productsListed: fv.arrayRemove(doc_id),
          }).then(() => location.reload());
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
    this.getProductsSold();
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
  background-color: #fffdf2;
  height: 100%;
}
#products {
	float: center;
}
#navbar2 {
  float: center;
}
#username{
align-self: center;
  /* border-top: #222 solid 1px;
  border-bottom: #222 solid 1px; */
  font-size: 30px;
   background-color: #FAEDCD;
}
/*#wishlist {
  font-size: 25px;
  text-decoration-line: none;
  color: rgb(34, 150, 158);
}*/
#profilepic{
	margin-left: 8cm;
	border-radius: 5px 300px 3px 300px;
	float: left;
  width: 135px;
  height: 135px;
}

#profilepic2{
	float: right;
	border-radius: 5px 300px 3px 300px;
	transform: scaleX(-1);
	margin-right: 8cm;
    width: 135px;
  height: 135px;
}

img {
  width: 250px;
  height: 250px;
  overflow: hidden;
  object-fit: cover;
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
  border: 1px solid #222;
  padding: 10px;
  margin: 10px;
}

p {
  font-size: 18px;
  padding: 0px;
  margin: 0px;
}

#itemtitle:hover {
  color: #D4A373;
}
#welcome{
	vertical-align: middle;
}
button {
  background-color: #f3cfab;
  border-color:  #f3cfab;
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
