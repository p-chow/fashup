<template>
<div id = "home">
	<NavBar></NavBar>
	<img src = "https://cdn.shopify.com/s/files/1/0140/4046/5508/articles/pasted_image_0_1090x.png?v=1601242462" height="400px"
    width="950px">
	<h1>Did you know?</h1> 
	<p>The fashion industry is responsible for emitting<p> 
	<h1>10%</h1> 
	<p>of CO2 on Earth.</p>
	<br>
	<div id = "foot">
		<br>
	<p>Join Fashup to be part of the movement to save Gaia</p>
	<p> giving these clothes a new breath of life or get involved by selling/donating your own!</p>
	<button v-on:click="signup()" type ="button">SignUp</button>
	<button v-on:click="login()" type ="button">Login</button>
	</div>

</div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
	data(){
		return {
		}
	},
	components: {
		NavBar
	},
	methods: {
		signup() {
			this.$router.push({
				path: 'signup'
			})
		},
		login() {
			this.$router.push({
				path: 'login'
			})
		}
	}
}

</script>

<style scoped>
#home {
	font-size: 20px;
	color: black;
	height: 100%;
}
button {
	background-color: #CCD5AE;
	border-color: #CCD5AE;
	width: 100px;
	height: 40px;
	float:none;
	right: 10cm;
	max-width: 70%;
	margin: 50px;
	margin-top:10px;
	padding: 0 5px;
	box-sizing: border-box;
	font-size: 20px;
	border-radius: 10px;
	border-width: 1px;
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	font-style: italic;
}
p{
	font-size:20px;
	font-family:'Arial';
}
img{
	width:1505px;
	height:500px;
}

#foot {
	background-color: #FAEDCD;
}
</style>