<template>
<div>
    <router-link to="/shop" exact> Back to Shop </router-link><br>
    <img v-bind:src= "this.product[0].pic"/><br>
    <div id="description">
        <p>Title: {{ this.product[0].title }}</p>
        <p>Description: {{ this.product[0].description }}</p>
        <p>Size: {{ this.product[0].size }} </p>
        <p>Price: $ {{ this.product[0].price }}</p><br>
        <button v-on:click= "updateWishList(product[1])">Add to Wishlist</button>
        <button v-on:click= "telehandlePopUp(product[0])">Buy it!</button><br>
    </div>
</div>
</template>

<script>
import {database} from '../firebase.js'
import {fv} from '../firebase.js'
//import {fbase} from '../firebase.js'

export default {
    name: 'ProductPage',
    data() {
        return {
            product: [],
			userId :''
        }
    },
    props: { 
            docId:String
    },
    methods: {
        fetchProduct: function() {
            console.log(this.doc_id);
            database.collection('products_sharlene').doc(this.docId).get().then(doc=> {
                this.product = [doc.data(), doc.id]
            })
        },
        updateWishList: function(productId) {
			//var user = fbase.currentUser;
			database.collection("users").doc('XM8HBLwRH7jX5cm31Kti').update({
                wishList: fv.arrayUnion(productId)
            })
            alert("Added to your wishlist!")
        },
        telehandlePopUp: function(product) {
            alert("Message me " + product.telehandle + "! :)")
        }
    },
    created() {
        this.fetchProduct()
    }
}
</script>

<style scoped>
router-link {
    font-size: 20px;
    color: rgb(127, 255, 148);
}

img {
    height: 400px;
    margin-left: 10%;
    float: left;
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
