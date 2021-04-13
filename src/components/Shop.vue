<template>
  <section>
    <NavBar></NavBar>
    <h2 class="title">S H O P</h2>
    <div class="sidenav">
      <h2 id="navi">Filter</h2>
      <div v-on:click="seen1 = !seen1" class="filterTitle">Shop for</div>
      <div v-if="seen1" id="hide" class="filter">
        <input
          type="checkbox"
          id="women"
          value="women"
          v-model="shop"
        />  Women<br />
        <input type="checkbox" id="men" value="men" v-model="shop" />  Men<br />
        <input
          type="checkbox"
          id="kids"
          value="kids"
          v-model="shop"
        />  Kids<br />
      </div>
      <div v-on:click="seen2 = !seen2" class="filterTitle">  Category</div>
      <div v-if="seen2" id="hide" class="filter">
        <input type="checkbox" id="top" value="top" v-model="cat" />  Top<br />
        <input
          type="checkbox"
          id="bottoms"
          value="bottoms"
          v-model="cat"
        />  Bottoms<br />
        <input
          type="checkbox"
          id="dress"
          value="dress"
          v-model="cat"
        />  Dresses<br />
        <input
          type="checkbox"
          id="acc"
          value="acc"
          v-model="cat"
        />  Accessories<br />
      </div>
      <div v-on:click="seen3 = !seen3" class="filterTitle">Occasion</div>
      <div v-if="seen3" id="hide" class="filter">
        <input
          type="checkbox"
          id="formal"
          value="formal"
          v-model="occ"
        />  Formal<br />
        <input
          type="checkbox"
          id="casual"
          value="casual"
          v-model="occ"
        />  Casual<br />
      </div>
      <div v-on:click="seen4 = !seen4" class="filterTitle">Size</div>
      <div v-if="seen4" id="hide" class="filter">
        <input type="checkbox" id="baby" value="baby" v-model="size" />  Baby
        (Preemie, 0-24 months)<br />
        <input
          type="checkbox"
          id="toddler"
          value="toddler"
          v-model="size"
        />  Toddler (2T-6T)<br />
        <input
          type="checkbox"
          id="littleK"
          value="littleK"
          v-model="size"
        />  Little Kid (4-6X)<br />
        <input type="checkbox" id="bigK" value="bigK" v-model="size" />  Big Kid
        or Tween (7-16)<br />
        <input type="checkbox" id="freeA" value="freeA" v-model="size" />  Free
        Size (adults)<br />
        <input type="checkbox" id="XXS" value="XXS" v-model="size" />  XXS / EU 32
        / UK 4 / US 2<br />
        <input type="checkbox" id="XS" value="XS" v-model="size" />  XS / EU 34 /
        UK 6 / US 4<br />
        <input type="checkbox" id="S" value="S" v-model="size" />  S / EU 36 / UK
        8 / US 6<br />
        <input type="checkbox" id="M" value="M" v-model="size" />  M / EU 38 / UK
        10 / US 8<br />
        <input type="checkbox" id="L" value="L" v-model="size" />  L / EU 40 / UK
        12 / US 10<br />
        <input type="checkbox" id="XL" value="XL" v-model="size" />  XL / EU 42 /
        UK 14 / US 12<br />
      </div>
      <div v-on:click="seen5 = !seen5" class="filterTitle">Price Range</div>
      <div v-if="seen5" id="hide" class="filter">
        <div>
          <input
            type="range"
            min="1"
            max="50"
            value="25"
            class="slider"
            v-model="priceRange"
          />
        </div>
        <p>Range: $0 - {{ priceRange }}</p>
      </div>
      <br />
      <button v-on:click="filtered" id="filterButton"> <a id="search">Search!</a></button>
    </div>
    <div class="content">
      <div>
        <p v-show="this.display.length == 0">
          Sorry, no product matched your selection ):
        </p>
        <ul>
          <li v-for="(item, id) in display" :key="id">
            <div class="polaroid">
              <div class="crop"><img v-bind:src="item[1].picURL" /></div>
              <div class="container">
                <ul>
                <li
                  id="click"
                  v-bind:docid="item[0]"
                  v-on:click="pressed($event)"
                >
                  {{ item[1].title }}
                </li>
                <li id="brand">{{ item[1].brand }}</li>
                <li id="price">S${{ item[1].price }}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { database } from "../firebase.js";
import NavBar from "./NavBar.vue";
//import {storage} from '../firebase.js'
import firebase from "firebase";
//import ImgInput from "./ImgInput.vue"

export default {
  name: "Products",
  components: {
    NavBar,
  },
  data() {
    return {
      seen1: false,
      seen2: false,
      seen3: false,
      seen4: false,
      seen5: false,
      priceRange: 50,
      items: [],
      cat: [],
      shop: [],
      occ: [],
      size: [],
      display: [],
      pictureUrl: [],
      picUrlsAndTitle: [],
      showImage: false,
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("products")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (!doc.get("sold")) {
            let data = doc.data();
            let category = data["category"];
            let dressocc = data["dressocc"];
            let pic = data["pic"];
            let price = data["price"];
            let size = data["size"];
            let title = data["title"];
            let brand = data["brand"];
            let shop = data["shop"];
            this.picUrlsAndTitle.push([title, doc.id]);
            /*var storageRef = storage.ref();
			storageRef.child(pic).getDownloadURL().then(function(url) {
				var test = url;
				document.getElementById('imageInStorage').src = test;
			})*/
            //console.log(storageRef.child(pic).getDownloadURL());
            var newitem = [
              doc.id,
              {
                cat: category,
                occ: dressocc,
                price: price,
                size: size,
                title: title,
                picURL: pic,
                brand: brand,
                shop: shop,
              },
            ];
            firebase
              .database()
              .ref("Pictures/")
              .on("value", function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                  if (userSnapshot.val().Name === title) {
                    var urlForPic = userSnapshot.val().Link;
                    newitem[1].picURL = urlForPic;
                  }
                });
              });
            this.items.push(newitem);
            this.display.push(newitem);
            //this.getImages();
            //this.getImages();
            console.log(newitem);
			}
          });
          console.log(this.picUrlsAndTitle);
        });
    },
    pressed(event) {
      let doc_id = event.target.getAttribute("docid");
      console.log(doc_id);
      this.$router.push({
        name: "product",
        params: {
          docId: doc_id,
          // user: this.$route.params.id
        },
      });
    },
    filtered: function () {
      var updateList = [];
      for (var i = 0; i < this.items.length; i++) {
        var temp = this.items[i];
        if (this.occ.length == 0 || this.occ.includes(temp[1].occ)) {
          if (this.shop.length == 0 || this.shop.includes(temp[1].shop)) {
            if (this.size.length == 0 || this.size.includes(temp[1].size)) {
              if (this.cat.length == 0 || this.cat.includes(temp[1].cat)) {
                if (temp[1].price < this.priceRange) {
                  updateList.push(temp);
                }
              }
            }
          }
        }
      }
      this.display = updateList;
    },
    getImages() {
      for (var i = 0; i < this.picUrlsAndTitle.length; i++) {
        firebase
          .database()
          .ref("Pictures/" + this.picUrlsAndTitle[i][0])
          .on("value", function (snapshot) {
            snapshot.forEach(function (userSnapshot) {
              var urlForPic = userSnapshot.val().Link;
              console.log(urlForPic);
              this.items[i][1].picURL = urlForPic;
              console.log(this.items);
            });
            /*var urlForPic= snapshot.val().Link;
						console.log(snapshot.val().Link)*/
          });
      }
    },
  },
  created() {
    this.fetchItems();
    this.getImages();
  },
};
</script>

<style scoped>

.content {
  margin-left: 300px;
  padding-left: 20px;
}

.title{
  border-bottom: 1px solid black;
  padding-top:25px;
  padding-bottom: 50px;
  font-size:25px;
}

.sidenav {
  width: 300px;
  height: 1000px;
  padding: 10px;
  float: left;
  font-size: 20px;
  text-align: left;
  /* border-right: 1px solid #111; */
}

.sidenav h2 {
  color:black;
  text-align: left;
  padding-left: 5px;
}

.filter {
  background-color: #FFFDF2;
  border: 1px solid #FFFDF2;
  color: #111;
  padding: 8px;
  margin-left: 5px;
  font-size: 13px;
}

.filterTitle {
  border: 1px solid #FAEDCD;
  background-color: #FAEDCD;
  color: black;
  padding: 5px;
  margin: 1px;
  font-weight: 800;
  font-size:18px;
}

.filterTitle:hover {
  border: 2px solid #D4A373;
  background-color: #D4A373;
  color: #111;
}

#filterButton {
  /* border: 2px solid #FAEDCD;
  background-color: #FAEDCD;
  color: #111;
  padding: 5px;
  font-weight: 800;
  font-size: 20px; */
  background-color: #faedcd;
	border-color: #faedcd;
	float:left;
	padding: 10px;
	box-sizing: border-box;
	font-size: 15px;
	border-radius: 60px;
	border-width: 1px;
  font-weight: 400;
	/* font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	font-style: italic; */
}

#filterButton:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  box-sizing: unset;
  border-color: #f3cfab;
  font-weight: 500;
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
  padding: 10px;
  margin: 10px;
}

.crop {
  width: 300px;
  height: 300px;
  overflow: hidden;
  object-fit: cover;
}

.crop img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

div.polaroid {
  text-align: center;
}

#brand {
  color: grey;
  text-transform: capitalize;
  font-size:17px;
  padding:1px;
  margin:0px;
  text-align: left;
}

#price {
  display: inline-block;
  padding:1px;
  margin:0px;
  color: #111;
  font-size: 17px;
  text-align: left;
}

#click {
  color: black;
  padding:1px;
  margin:0px;
  padding-top: 10px;
  font-size:18px;
  text-align: left;
}

#click:hover {
  color: #D4A373;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #111;
  cursor: pointer;
}
</style>