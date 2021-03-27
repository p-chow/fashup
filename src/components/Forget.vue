<template>
<div id="forget">
	<router-link to="/Forget" exact></router-link>
	<br>
	<label for = "email" >Email Address: </label> <br><br>
	<input type = "text" id = "email" name = "email"> <br> <br>
	<label for = "pw" id="password" >New Password: </label><br><br>
	<input type = "password" id = "pw" name = "pw" v-on:change='check()'>
	<p id="passwordcheck"></p> 
	<label for = "cpw" id="confirm">Confirm Password: </label> <br><br>
	<input type = "password" id = "cpw" name = "cpw" v-on:change='matched()'> 
	<p id="matching"></p>
	<button v-on:click= "reset()" type ="button">Reset Password</button>
</div>
</template>

<script>
import {database} from '../firebase.js';
export default {
	data(){
		return {
			datapacket:'',
			checked: false
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
			this.checked = true;
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
		reset() {
			var newPassword = document.getElementById('pw').value
			var emailAddress = document.getElementById('email').value
			console.log(emailAddress)
			database.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc=> {
					if (doc.get('Email')== emailAddress) {
						this.datapacket = this.datapacket + doc.id;
						console.log(doc.get('Password'))
						console.log(this.datapacket)
						database.collection('users').doc(this.datapacket).update({
							Password: newPassword}).then(location.reload());
					}
				})
			});
			this.$router.push({
				path: 'login'
			})
		}
	}	
}
</script>
<style scoped>
#forget{
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

label {
display: flex;
flex-direction: row;
float: left;
clear:left;
width: 10em;
max-width: 400%;
margin-left:500px;
justify-content: flex-end;
}

input{
	float:center;
	border-block-color: rgb(0, 0, 0);
	tab-size: 5px;
	size: 10px;
	height: 25px;
	flex: 0 0 200px;
	margin-left: 20px;
	width: 350px;
	font-size: 20px;
	border-radius: 25px;
	padding: 10px;
}

#password{
	width: 200px;	
}

#confirm{
	width: 230px;	
}
button{
	background-color: rgb(140, 228, 255);
	font-style: italic;
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	width: 100px;
	height: 50px;
	float:none;
	right: 10cm;
	max-width: 70%;
	margin: 50px;
	margin-top:10px;
	padding: 0 5px;
	box-sizing: border-box;
	margin-right: 25px;
	border-radius: 10px;
	font-size: 15px;
	border-color: rgb(140, 228, 255);
}
p{
	font-size: 15px;
	color:black;
}
</style>