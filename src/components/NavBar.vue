<template>
  <div class="navbar">
    <nav id="bar">
      <h1>{{ title }}</h1>
      <ul>
		<li>
		<router-link to="/" exact v-show="!notLogged()"> Home </router-link>
		<router-link to="/Personal" exact v-show="notLogged()"> {{this.user_display[0]}}'s Home</router-link>
		</li>
		<li>
		<router-link to="/shop" exact> Shop </router-link>
		</li>
		<li>
		<router-link to="/sell" exact> Sell </router-link>
		</li>
		<li>
		<router-link to="/news" exact> Gaia News </router-link>
		</li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { EventListening } from '../listening.js';
export default {
	data(){
		return {
			login:false,
			user_display : []
		}
	},
	created(){
		EventListening.$on("Logging-in", data => {
			this.user_display.push(data)
			this.login = true;
			this.notLogged()
		})
	},
	methods: {
		notLogged() {
			return this.login
		},

	}
}
</script>
<style scoped>
a {
	text-decoration: none;
}
#bar {
  width: 150%;
  float: left;
  right: 5cm;
  max-width: 100%;
  margin: 1px;
  margin-top:1px;
  padding: 0 px;
  box-sizing: border-box;
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
  background-color: rgb(221, 219, 219);
  margin: 1px;
}

</style>