<template>
<div>
    <p>back</p>
    <p>Title: {{ this.product[0].title }}</p>
    <p>Description: {{ this.product[0].description }}</p>
    <p>Size: {{ this.product[0].size }} </p>
    <p>Price: $ {{ this.product[0].price }}</p>

    <button v-on:click= "updateWishList(product[1])">Add to Wishlist</button>
    <button v-on:click= "telehandlePopUp(product[0])">Buy it!</button>

</div>
</template>

<script>
import {database} from '../firebase.js'
import {fv} from '../firebase.js'

export default {
    name: 'ProductPage',
    data() {
        return {
            product: []
        }
    },
    methods: {
        fetchProduct: function() {
            database.collection('products_sharlene').doc('7NtdNzVMnH6GXuY23wty').get().then(doc=> {
                this.product = [doc.data(), doc.id]
            })
        },
        updateWishList: function(productId) {
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
