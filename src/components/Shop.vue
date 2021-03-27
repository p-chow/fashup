<template>
    <section>
        <h2>SHOP</h2>
        <div class="sidenav">
        <h2 id="navi">Filter</h2>
        <div v-on:click="seen1 = !seen1" class="filterTitle"> Shop for</div>
        <div v-if="seen1" id="hide" class="filter"> 
            <input type="checkbox" id="shopW" value="women" v-model="shop">Women<br> 
            <input type="checkbox" id="shopM" value="men" v-model="shop">Men<br>
            <input type="checkbox" id="shopC" value="children" v-model="shop">Children<br>
        </div>
        <div v-on:click="seen2 = !seen2" class="filterTitle">Category</div>
        <div v-if="seen2" id="hide" class="filter"> 
            <input type="checkbox" id="top" value="top" v-model="cat">Top<br> 
            <input type="checkbox" id="bottom" value="bottom" v-model="cat">Bottom<br>
            <input type="checkbox" id="full" value="full" v-model="cat">Full<br>
        </div>
        <div v-on:click="seen3 = !seen3" class="filterTitle"> Occasion </div>
        <div v-if="seen3" id="hide" class="filter"> 
            <p>Formal</p>
            <p>Casual</p>
        </div>
        <div v-on:click="seen4 = !seen4" class="filterTitle"> Size </div>
        <div v-if="seen4" id="hide" class="filter"> 
            <p>S / EU 36 / UK 8 / US 4</p>
            <p>M / EU 38 / UK 10 / US 6</p>
        </div>
        <div v-on:click="seen5 = !seen5" class="filterTitle"> Price Range </div>
        <div v-if="seen5" id="hide" class="filter"> 
            <div>
                <input type="range" min="1" max="50" value="25" class="slider" v-model="priceRange">
            </div>
            <p>range: $0 - {{priceRange}}</p>
        </div>
            <button v-on:click="filtered">Search!</button>
        </div>
        <div class="content">
          <div>
        <ul>
          <li v-for='(item, id) in filteredProducts' :key='id'>
            <div class="polaroid" >
              <div class="fill"><img v-bind:src="item[1].picURL"/></div>
              <div class="container" >
                  <p id="brand">{{item[1].brand}}</p>
                  <p id="click" v-bind:docid="item[0]" v-on:click="pressed($event)"> {{item[1].title}} </p>
                  <p id="price">  ${{item[1].price}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
        </div>

    </section>
</template>

<script>
import {database} from '../firebase.js'

    export default {
        name: 'Products',
        data() {
            return {
                seen1: false,
                seen2: false,
                seen3: false,
                seen4: false,
                seen5: false,
                priceRange: 50,
                items:[],
                cat: [],
                shop: [],
            }
        },
        methods:{
          fetchItems: function(){
			database.collection('products_sharlene').get().then(snapshot =>{
				snapshot.docs.forEach(doc => {
            let data = doc.data();
            let category = data["category"];
            let dressocc = data["dressocc"]; 
            let pic = data["pic"]; 
            let price = data["price"];
            let size = data["size"];
            let title = data["title"];
            let brand = data["brand"];
            let newitem = [doc.id,{"cat": category, 
                                     "occ": dressocc, 
                                     "price": price,
                                     "size": size,
                                     "title": title,
                                     "picURL": pic,
                                     "brand": brand}];
            this.items.push(newitem);
            console.log(newitem);
    });
});
          },
          pressed(event){
            let doc_id = event.target.getAttribute("docid");
            console.log(doc_id);
            this.$router.push({
              name: 'product',
              params: {docId: doc_id} 
              })
          },
          filtered: function() {
            this.filteredProducts;
          },
        },
        computed: {
            // filteredProducts() {
            //   console.log("called filter");
            //   if (this.shop !== '') {
            //     return this.items.filter((item) => {
            //       return this.shop.includes(item[1].cat);
            //   });
            //   }
            // return this.items;
            // },
        },
        created(){
            this.fetchItems();
        },
        
    }
</script>

<style scoped>
.content {
  margin-left: 300px;
  padding-left: 20px;
}

.sidenav {
  width: 300px;
  height: 800px;
  background-color: #111;
  padding: 10px;
  float: left;
}

.sidenav h2 {
    color: aliceblue;
    text-align: center;
}

.filter {
    background-color:aliceblue;
    border: 1px solid aliceblue;
    color:#111;
    padding: 3px;
}

.filterTitle {
    background-color:#111;
    border: 1px solid aliceblue;
    color: aliceblue;
    padding: 3px;
    font-weight: 800;
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

img {
  height: 400px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}

div.polaroid {
  text-align: center;
}

#brand {
    color: grey;
}

#price {
    background-color:gainsboro;
   display:inline-block;
   padding: 5px;
   font-weight: 700;
   color: #111;
   font-size: 20px;
}

#click {
    color: aquamarine;
}

#click :hover {
  background-color: #ddd;
  color: black;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%; 
  background:#111;
  cursor: pointer;
}

</style>