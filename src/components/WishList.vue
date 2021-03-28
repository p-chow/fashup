<template>
<div id="wish">
	<nav id="navbar1">
		<br><br><br>
		<router-link to="/Personal" id = "profile">
		<span @click="pushtoPersonal()">Profile Page</span>
		</router-link>
		<br>
		<router-link to="/wishlist" id = "wishlist" >
		<span @click="pushtoWish()">Wishlist</span>
		</router-link>
		<br>
		<router-link to="/change" id="change">
		<span @click="pushtoChange()">Change Password</span>
		</router-link>
	</nav>
	<nav2> 
		<ul id="mywishlist">
			<li v-for="item in productswish" v-bind:key="item.title">
				<button type="button" v-bind:id="item[0]" v-on:click ="deleteItem($event)">X</button> <br>
				{{item[1]}} <br> <br> <img v-on:click="redirectToProduct()" v-bind:src = "item[2]"> <br> Price: ${{item[3]}}
				Available: {{available(item[4])}} <br><br>
				{{soldAlready(item[4])}}
			</li>
		</ul>
	</nav2>
</div>
</template>

<script>
import { EventPassing } from '../passingid.js'
import {database} from '../firebase.js';
//import {fv} from '../firebase.js'
export default{
	data(){
		return {
			doc_id:this.$route.params.id,
			wishList:[],
			productswish: [],
			newWL: []
		}
	}, 
	created(){
		EventPassing.$on("documentid", data =>{
				this.doc_id = data
				console.log(data)
				console.log(this.doc_id)
		});
		this.getWishList();
	},
	methods:{
		getWishList(){
			console.log(this.doc_id)
			database.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc=> {
					if (doc.id === this.doc_id) {
						var curr = doc.get("wishList");
						for (var i = 0; i < curr.length; i++){
							this.wishList.push(curr[i])
						}
						console.log(this.wishList)
						database.collection('products_sharlene').get().then(snapshot => {
							snapshot.docs.forEach(doc=> {
								if (this.wishList.includes(doc.id)){
									this.productswish.push([doc.id,doc.get('title'), doc.get('pic'), doc.get('price')])
								}	
							})
							console.log(this.productswish)
						})
					}
				});
			});
		},
		pushtoWish(){
			this.$router.push({
				name: 'wishlist',
				params: { id: this.doc_id} 
			})
			
		}, 
		pushtoPersonal(){
			this.$router.push({
				name: 'personal',
				params: { id: this.doc_id} 
			})
		},
		pushtoChange(){
			this.$router.push({
				name: 'change',
				params: { id: this.doc_id} 
			})
		},
		redirectToProduct(){
			//push to the product page
		},
		deleteItem(event){
			console.log(this.doc_id)
			let itemId = event.target.getAttribute("id")
			for (var i =0; i< this.wishList.length ; i++){
				if (this.wishList[i] != itemId){
					this.newWL.push(this.wishList[i])
				}
			}
			database.collection('users').doc(this.doc_id).update({
				wishList : this.newWL
			})
			
		},
		available(bool){
			let isAvail = bool
			if (isAvail) {
				return 'No'
			} else {
				return 'Yes'
			}
		},
		soldAlready(bool){
			if (bool) {
				return 'Sorry the item is no longer available'
			} else {
				return ''
			}
		}
	}
}
</script>
<style scoped>
#wish{
  color:rgb(34, 150, 158);
  width: 1520px;
  float: left;
  right: 100cm;
  max-width: 100%;
  margin-top:-32px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: rgb(182, 243, 238);
}

nav{
	float: left;
	width: 23.5%;
	font-size:35px;
	background: rgb(222, 255, 255);
	padding-left: 20px;
	padding-top:100px;
	height: 550px; 	
}
nav2{
	font-size: 15px;
	float: right;
	padding: 38px;
	width: 70%;	
	padding-top:1px;
	background:rgb(182, 243, 238);
	margin-top:1cm;
}

#change{
	font-size:25px;
	text-decoration-line: none;
	color:rgb(34, 150, 158)
}
#profile{
	font-size:25px;
	text-decoration-line: none;
	color:rgb(34, 150, 158)
}

#wishlist{
	font-size:25px;
	text-decoration-line: none;
	color:rgb(34, 150, 158)
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
button{
	float:right
}
</style>