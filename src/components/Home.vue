<template>
<div id = "home">
	<img src = "https://cdn.shopify.com/s/files/1/0140/4046/5508/articles/pasted_image_0_1090x.png?v=1601242462" height="400px"
    width="950px">
	<p>Did you know that the fashion industry is responsible for emitting 10% of CO2 on Earth?</p> 
	<p>Join Fashup to be part of the movement to save Gaia by giving these clothes a new breath of life or get involved by selling/donating your own!</p>
	<button v-on:click="signup()" type ="button">SignUp</button>
	<button v-on:click="login()" type ="button">Login</button>

</div>
</template>

<script>
export default {
	data(){
		return {
		}
	},
	methods: {
		signup() {
			this.$router.push({
				path: 'SignUp'
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
	background-color:azure;
}
button {
	background-color: rgb(140, 228, 255);
	border-color: rgb(140, 228, 255);
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
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
img{
	width:1505px;
	height:500px;
}
</style>