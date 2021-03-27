<template>
    <div>
        <router-link to="/sell" exact></router-link>
        <h1> Sell </h1>
        <div id="left">
            <div id="imgArea">
            <imgInput v-model="imgFile"></imgInput>
            </div>
            <br> <br>
            <div id="buttonArea"><button id="send" v-on:click="submit()"> Submit </button></div>
        </div>
        <div id="info">
            <form>
                <label for="title"> Title: </label>
                <input id="title" name="title" type="text" v-model="title" required> <br><br>

                <label for="cat"> Category: </label> 
                <select id="cat" name="cat" v-model="cat" required>
                    <option value="top"> Tops </option>
                    <option value="bottoms"> Bottoms </option>
                    <option value="accesories"> Accesories </option>
                </select> <br><br>

                <label for="desc"> Description: </label> <br>
                <textarea id="desc" name="desc" v-model="desc" placeholder="Describe your product." rows="5" cols="40" required></textarea> <br><br>

                <label for="size"> Size: </label>
                <select id="size" name="size" v-model="size" required>
                    <option value="freesize"> Free Size </option>
                    <option value="uk4"> UK4 </option>
                    <option value="uk6"> UK6 </option>
                    <option value="uk8"> UK8 </option>
                    <option value="uk10"> UK10 </option>
                    <option value="uk12"> UK12 </option>
                    <option value=">uk14"> UK14 and above </option>
                </select> <br><br>

                <label for="occasion"> Dressing Occasion: </label>
                <select id="occasion" name="occasion" v-model="occasion" required>
                    <option value="casual"> Casual </option>
                    <option value="smart casual"> Smart Casual </option>
                    <option value="formal"> Formal </option>
                    <option value="work"> Work </option>
                </select> <br><br>

                <label for="px"> Price: </label>
                <input id="px" name="px" type="number" min="0" v-model="px" required> <br><br>

                <label for="tele"> Telegram Handle: </label>
                <input id="tele" name="tele" v-model="tele" type="text" value="@" required>
            </form>
        </div>
    </div>
</template>

<script>
import ImgInput from './ImgInput.vue';
import {database} from "../firebase.js";
import firebase from "firebase";
import {EventPassing} from '../passingid.js'

export default {
    data() {
        return {
            user_id: this.$route.params.id,
            prodListed:[],
            imgFile: "",
            title: "",
            px: 0,
            cat: "",
            desc: "",
            size: "",
            occasion: "",
            tele: ""
        };
    },
    components: {
        imgInput: ImgInput
    },
    methods: {
        submit: function() {
            console.log(this.imgFile.name); //name of image file
            var pdtInfo = {
                imgFile: null,
                title: this.title,
                px: this.px,
                cat: this.cat,
                desc: this.desc,
                size: this.size,
                occasion: this.occasion,
                tele: this.tele
            }
            this.prodListed.push(pdtInfo);

            let imgURL;
            firebase.storage().ref().child(this.imgFile.name).put(this.imgFile).then(() =>
            firebase.storage().ref().child(this.imgFile.name).getDownloadURL()
                .then((url) => {
                    console.log(pdtInfo['tele']),
                    imgURL = url;
                    pdtInfo['imgFile'] = imgURL;
                    console.log(pdtInfo['imgFile']);}
                )).then(() => {
                    database.collection('products').add(pdtInfo); //send to products db
                }).then(() => location.reload()); 
            
            //add into user info array pdtlisted
            database.collection('users').document(this.user_id).update({productsListed: this.prodListed});

        },
        getProdListed: function() {
            database.collection('users').document(this.user_id).then(userInfo => { 
                var curr = userInfo.get("wishList");
                this.prodListed = curr;
            })
        }
    },
    created(){
		EventPassing.$on("documentid", data =>{
				this.user_id = data
				console.log(data)
				console.log(this.user_id)
		});
		this.getProdListed();
	},
    
}
</script>

<style scoped>
h1 {
    margin-left: 10%;
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
    background-color: white;
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
    background-color: white;
}
</style>