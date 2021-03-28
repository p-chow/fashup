<template>
<div id="personal">
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
		<h3> Hi {{name}}!</h3> 
		<a>Check out the latest seasonal donation drive that is happening on</a> <b>11th April 2021!</b>
		<h1>FASHUP X SUNLOFT </h1>
		<br>
		<img src="data:image/jpeg;base64,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"  ALIGN ="left">
		<p>A spring collaboration with Sunloft</p>
		<p>Location: 1 Tampines Walk, Singapore 528523 </p>
		<p>Tampines Hub Level 1 Foyer</p>
		<p>From 10am to 8pm, join us in the Fashup community movement by donating your clothings!</p>
		<p>See you there!</p>
		<br>
		<personalDB></personalDB>
	</nav2>
	<div id="products">
		<h3>{{name}}'s Products</h3>
		<ul id="products">
			<li v-for= "product in products" v-bind:key= "product.id">
				<p v-bind:docid= "product[0]" v-on:click= "redirectToProduct($event)">{{product[3]}}</p><br> 
				<img v-bind:src= "product[1]"><br> 
				<p>Price: ${{product[2]}}</p><br> 
				<button type="button" v-bind:docid= "product[0]" v-on:click= "deleteProduct($event); updateProductsListed($event)">Remove product</button> <br>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import {database} from '../firebase.js';
import {fv} from '../firebase.js';
import {EventPassing} from '../passingid.js'
import PersonalDashboard from './PersonalDashboard.vue' 

export default {
	data(){
		return {
			user_id: this.$route.params.id,
			pic: "", 
			name:"",
			productsId: [],
			products: []
		}
	}, 
	components: {
		personalDB: PersonalDashboard
	}, 
	methods: {
		profilepic(){
			database.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					if (doc.id === this.user_id) {
						this.pic = doc.get('ProfilePic')
					}
				})
			});	
		},
		pushtoWish(){
			EventPassing.$emit("documentid", this.user_id)
			console.log(this.user_id)
			this.$router.push({
				name: 'wishlist',
				params: { id: this.user_id} 
			})
			
		}, 
		pushtoPersonal(){
			this.$router.push({
				name: 'personal',
				params: { id: this.user_id} 
			})
		},
		pushtoChange(){
			this.$router.push({
				name: 'change',
				params: { id: this.user_id} 
			})
		},
		getUserName() {
			database.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					if (doc.id === this.user_id) {
						this.name = doc.get('Name')
					}
				})
			});	
		},
		getProductsListed: function() {
			database.collection('users').doc(this.user_id).get().then((snapshot) => {
				this.productsId = snapshot.data().productsListed;
				database.collection('products_sharlene').get().then(snapshot => {
					snapshot.docs.forEach(doc=> {
						if (this.productsId.includes(doc.id)){
							this.products.push([doc.id, doc.get('pic'), doc.get('price'), doc.get('title')])
						}	
					})
				})
			})
		},
		redirectToProduct(event){
			let doc_id = event.target.getAttribute("docid");
			this.$router.push({
				name: 'product',
				params: {docId: doc_id}
			})
		},
		deleteProduct(event) {
			let doc_id = event.target.getAttribute("docid");
			database.collection('products_sharlene').doc(doc_id).delete().then(() => {
				location.reload()
			})
		},
		updateProductsListed(event) {
			let doc_id = event.target.getAttribute("docid");
			database.collection("users").doc(this.user_id).update({
				productsListed: fv.arrayRemove(doc_id)
			})
		}
	},
	created(){
		this.profilepic();
		this.getUserName();
		this.getProductsListed();
	}
}
</script>
<style scoped>
#personal{
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
#wishlist{
	font-size:25px;
	text-decoration-line: none;
	color:rgb(34, 150, 158)
}
img{
	width:300px;
	float:left;
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
	background-color: rgb(140, 228, 255);
	border-color: rgb(140, 228, 255);
	width: 110px;
	height: 40px;
	font-size: 13px;
	float:none;
	right: 10cm;
	max-width: 70%;
	margin: 20px;
	margin-top:10px;
	padding: 0 5px;
	box-sizing: border-box;
	border-radius: 10px;
	border-width: 1px;
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	font-style: italic;
}

</style>