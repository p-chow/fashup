<template>
<div id="signup">
	<router-link to="/SignUp" exact></router-link>	
	<br>	
	<img :src="imageSource" ALIGN ="left" id="imagedp"> <br clear="center"> <br>
	<label for = "fname">First Name : </label> 
	<input type = "text" id = "fname" name = "fname"> <br> <br>
	<label for = "lname">Last Name  : </label> 
	<input type = "text" id = "lname" name = "lname"> <br> <br>
	<label for = "dname">Display Name: </label>
	<input type = "text" id = "dname" name = "name"> <br><br>
	<label for = "email">Email: </label>
	<input type = "text" id = "email" name = "email"> <br><br>
	<label for = "num">Contact No: </label>
	<input type = "text" id = "num" name = "num"> <br><br>
	<label for = "pw">Password: </label>
	<input type = "password" id = "pw" name = "pw" v-on:change='check()'>
	<p id="passwordcheck"></p>
	<label for = "cpw">Confirm Password: </label>
	<input type = "password" id = "cpw" name = "cpw" v-on:change='matched()'> 
	<p id="matching"></p> <br><br>
	<button v-on:click='colourchange()' type = "button" id="bgchange">Switch Background</button> <br>
	<button v-on:click="createacc()" type ="button" id="account">Create My FashUp!</button> <br> <br>

</div>
</template>

<script>
import {database} from '../firebase.js';
export default {
	data(){
		return {
			urls:["https://www.publicdomainpictures.net/pictures/40000/nahled/purple-polka-dot-background.jpg","https://www.publicdomainpictures.net/pictures/40000/velka/aqua-polka-dot-background.jpg","https://www.publicdomainpictures.net/pictures/40000/nahled/hot-pink-polka-dot-background.jpg" ,"https://i.pinimg.com/originals/96/3d/da/963dda7bc7cbdd94c798fa120dc42444.jpg", "https://www.publicdomainpictures.net/pictures/40000/velka/blue-polka-dot-background.jpg", "https://i.pinimg.com/originals/80/1d/6e/801d6e859437958416507dc9e3c09f22.jpg"],
			imageSource: "https://www.publicdomainpictures.net/pictures/40000/nahled/purple-polka-dot-background.jpg",
		}
	},
	methods: {
		hasNumber(fieldstring) {
			return /\d/.test(fieldstring);
		},
		containsUppercase(fieldstring) {
			var count = 0;
			for (let i =0;i < fieldstring.length; i++){
				if (fieldstring[i] === fieldstring[i].toUpperCase()) {
					count = count + 1;
				}
			}
			return count > 0
		},
		containsLowerCase(fieldstring){
			var count = 0;
			for (let i =0;i < fieldstring.length; i++){
				if (fieldstring[i] === fieldstring[i].toLowerCase()) {
					count = count + 1;
				}
			}
			return count > 0
		},
		check(){
			var password = document.getElementById('pw').value
			if (password.length < 8) {
				document.getElementById("passwordcheck").innerHTML = "Password must be more than 8 characters";
			} 
			if (this.hasNumber(password) === false) {
				document.getElementById("passwordcheck").innerHTML = "Password must contain at least 1 numeric digit";
			} 
			if (this.containsUppercase(password) === false) {
				document.getElementById("passwordcheck").innerHTML = "Password must contain at least 1 uppercase character";
			}
			if (this.containsLowerCase(password) === false) {
				document.getElementById("passwordcheck").innerHTML = "Password must contain at least 1 lowercase character";
			}
			if (password.length >= 8 && this.hasNumber(password) && this.containsUppercase(password) && this.containsLowerCase(password)) {
				document.getElementById("passwordcheck").innerHTML = "";
			}
		},
		matched(){
			var password = document.getElementById('pw').value
			var confirmedpw = document.getElementById('cpw').value
			if (password !== confirmedpw) {
				document.getElementById("matching").innerHTML = "Password does not match";
			} else {
				document.getElementById("matching").innerHTML = " ";
			}
		},
		colourchange(){
			var currIndex = this.urls.indexOf(this.imageSource);
			var nextIndex = currIndex + 1;
			if (nextIndex == this.urls.length) {
				nextIndex = 0;
			}
			this.imageSource = this.urls[nextIndex];
		},
		fieldsFilled(){
			var first = document.getElementById("fname").value
			var last = document.getElementById("lname").value
			var display = document.getElementById("dname").value
			var email = document.getElementById("email").value
			var contact = document.getElementById("num").value
			var password = document.getElementById('pw').value
			var confirmedpw = document.getElementById('cpw').value
			return first.length > 0 && last.length > 0 && display.length > 0 && email.length > 0 && contact.length > 0 && password.length > 0 && confirmedpw.length > 0
		},
		createacc() {
			if (this.fieldsFilled() === false) {
				alert("All fields must be filled.")
			} else {
				var firstname = document.getElementById("fname").value
				var lastname = document.getElementById("lname").value
				var displayname = document.getElementById("dname").value
				var email = document.getElementById("email").value
				var password = document.getElementById("pw").value
				var dp = this.imageSource
				database.collection("users").add({
					Name: firstname + " " + lastname,
					DisplayName: displayname,
					Email: email,
					Password: password,
					ProfilePic: dp,
					productsSold:[],
					wishlist:[],
					productsListed:[]
				}).then(this.$router.push({
				path: 'Login'
				}));
			}
		}
	}
}
</script>
<style scoped>
#signup{
	color:blue;
	width: 100%;
	float: center;
	max-width: 100%;
	margin-top:-30px;
	box-sizing: border-box;
	font-size: 20px;
	background-color: rgb(209, 233, 255);
}

label {
	display: flex;
	flex-direction: row;
	width: 10em;
	max-width: 400%;
	margin-left:10px;
	text-align: left;
	justify-content: flex-end;
	display: inline-block;
	text-align: left;
}

input{
	border-block-color: rgb(0, 0, 0);
	size: 15px;
	width:200px;
	height: 23px;
	flex: 0 0 200px;
	margin-right: 200px;
	float: center;
	border-radius: 25px;
}

button{
	background-color: rgb(140, 228, 255);
	font-style: italic;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	width: 100px;
	height: 40px;
	float:none;
	right:10cm;
	max-width: 70%;
	margin: 10px;
	margin-top:5px;
	box-sizing: border-box;
	border-radius: 10px;
	border-color: rgb(140, 228, 255);
}

#imagedp {
	height: 410px;
	border-radius:50%;
	margin-left:8cm;
}

div{
	display:inline-block;
}
 
#bgchange{
	margin-right: 13cm;
	border-radius: 40px;
	background-color:rgb(177, 234, 236);
	border-color:rgb(177, 234, 236);
}

p{
	font-size: 10px;
	color:black;
}
</style>