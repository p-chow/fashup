<template>
  <div class="navbar">
    <nav id="bar">
      <h1>{{ title }}</h1>
      <ul>
		<li>
		<router-link to="/" exact v-show="!notLogged()"> Home </router-link>
		<router-link to="/Personal" exact v-show="notLogged()"> 
		<span @click ="pushtoPersonal()">{{this.user_display[0]}}'s Home</span>
		</router-link>
		</li>
		<li>
		<router-link to="/shop" exact>
		<span @click="pushtoShop()">Shop</span>
		</router-link>
		</li>
		<li>
		<router-link to="/sell" exact> 
		<span @click="pushtoSell()">Sell </span>
		</router-link>
		</li>
		<li>
		<router-link to="/news" exact>
		<span @click="pushtoNews()"> Gaia News </span>
		</router-link>
		</li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { EventListening } from '../listening.js';
import { EventLogout } from '../loggingout.js';
//import { fbase } from '../firebase.js'
//import { database } from '../firebase.js'
export default {
	data(){
		return {
			login:false,
			user_display : [],
			curr_userId: ''
		}
	},
	created(){
		EventListening.$on("Logging-in", data => {
			this.user_display.push(data[0])
			this.curr_userId = data[1]
			this.login = true;
			this.notLogged()
		})
		EventLogout.$on('Logging-out', data => {
			console.log(data)
			this.login = false;
			this.notLogged()
		})
	},
	methods: {
		notLogged() {
			return this.login
		},
		pushtoShop(){
			this.$router.push({
				name: 'shop',
				params: { id: this.curr_userId} 
			})
		},
		pushtoPersonal(){
			this.$router.push({
				name: 'personal',
				params: { id: this.curr_userId} 
			})
		},
		pushtoSell(){
			this.$router.push({
				name: 'sell',
				params: { id: this.curr_userId} 
			})
		},
		pushtoNews(){
			this.$router.push({
				name: 'news',
				params: { id: this.curr_userId} 
			})
		}
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