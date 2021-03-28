<template>
<div id="login">
	<router-link to="/login" exact></router-link>
	<br>
	<h3>Ready to start shopping/selling?</h3>
	<label for = "email">Email: </label><br> 
	<input type = "text" id = "email" name = "email" required> <br> <br>
	<label for = "pw">Password: </label><br>
	<input type = "password" id = "pw" name = "pw"> <br> <br>
	<button v-on:click="logintoacc()" type ="button">Login</button>
	<button v-on:click="forget()" type ="button">Forget password</button>
	<br><br><br><br>

</div>
</template>
<script>
import {database} from '../firebase.js';
import { EventListening } from '../listening.js';
import { fbase } from '../firebase.js'
export default {
	data(){
		return {
			passwordList: [],
			emailList: [],
			display:[],
			listOfIds:[]
		}
	},
	methods: {
		forget() {
			this.$router.push({
				path: 'Forget'
			})
		},
		emailExists(){
			//var email = document.getElementById("email").value
			database.collection('users').get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					this.emailList.push(doc.get('Email'))
					this.listOfIds.push(doc.id)
				})
			})
		},
		passwordMatch(){
			//var password = document.getElementById("pw").value
			database.collection('users').get().then(snapshot =>{
				snapshot.docs.forEach(doc => {
					this.passwordList.push(doc.get('Password'));
				})
			})
		},
		displayNames(){
			database.collection('users').get().then(snapshot =>{
				snapshot.docs.forEach(doc => {
					this.display.push(doc.get('DisplayName'));
				})
			})
		},
		getIndex(array,field){
			return array.indexOf(field)
		},
		logintoacc(){
			var email = document.getElementById("email").value
			var password = document.getElementById("pw").value
			if (this.emailList.includes(email) === false) {
				alert("The email address does not exist in our system. Please register as new user.")
			} else if (this.passwordList.includes(password)===false) {
				alert("Incorrect password. Please try again.")
			} else {
				EventListening.$emit("Logging-in", this.display[this.getIndex(this.emailList,email)])
				fbase.signInWithEmailAndPassword(email,password)
				var docid = this.listOfIds[this.getIndex(this.emailList, email)]
				this.$router.push({
					name: 'personal',
					params: { id: docid} 
				})
			}
		}
	}, 
	created(){
		this.emailExists();
		this.passwordMatch();
		this.displayNames();
	}
}			
</script>
<style scoped>
#login{
  color:rgb(34, 150, 158);
  width: auto;
  height: 100vh;
  float: center;
  margin-top:135px;
  box-sizing: border-box;
  font-size: 20px;
  margin-left:2px;
  background-color: rgb(182, 243, 238);
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

input{
	float:center;
	border-block-color: rgb(0, 0, 0);
	tab-size: 5px;
	size: 10px;
	height: 25px;
	flex: 0 0 200px;
	width: 350px;
	font-size: 20px;
	border-radius: 25px;
	padding: 8px;
}
</style>