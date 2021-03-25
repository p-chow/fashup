<template>
<div id="personal">
	<nav id="navbar1">
		<br><br><br>
		<router-link to="/Personal" id = "profile">
		<span @click="pushtoPersonal()">Profile Page</span>
		</router-link>
		<br>
		<router-link to="/change" id="change">
		<span @click="pushtoChange()">Change Password</span>
		</router-link>
		<br>
		<router-link to="/wishlist" id = "wishlist" >
		<span @click="pushtoWish()">Wishlist</span>
		</router-link>
	</nav>
	<nav2>
		<h3> hi there</h3> 
	</nav2>
</div>
</template>

<script>
import {database} from '../firebase.js';
import {EventPassing} from '../passingid.js'
export default {
	data(){
		return {
			user_id: this.$route.params.id,
			pic: "", 
			name:""
		}
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
		}

	},
	created(){
		this.profilepic();
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
</style>