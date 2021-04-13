<template>
  <div id="home">
    <NavBar></NavBar>
    <h1 id="shopname">Fashup</h1>
    <img
      src="http://www.lovetaupo.com/media/2958595/charlie-who-shop-retail-fashion-clothing-rail.png?anchor=center&mode=crop&width=1200&height=630&rnd=132300517360000000"
      
    />
    <h1>Did you know?</h1>
    <p>The fashion industry is responsible for emitting</p>
    <p></p>
    <h1>10%</h1>
    <p>of CO2 on Earth.</p>
    <br />
    <div id="foot">
      <br />
      <p>Join Fashup to be part of the movement to save Gaia</p>
      <p>
        giving these clothes a new breath of life or get involved by
        selling/donating your own!
      </p>
      <button v-on:click="signup()" type="button">Sign Up</button>
      <button v-on:click="login()" type="button">Login</button>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
  },
  methods: {
    signup() {
      this.$router.push({
        path: "signup",
      });
    },
    login() {
      this.$router.push({
        path: "login",
      });
    },
  },
};
</script>

<style scoped>
#shopname {
  font-size: 70px;
  margin-top: 0;
  padding-top: 25px;
  font-style: italic;
  font-family: "Remark";
}

#home {
  font-size: 20px;
  color: black;
  height: 100%;
}
button {
  background-color: #f3cfab;
  border-color: #f3cfab;
  width: 100px;
  height: 40px;
  float: none;
  right: 10cm;
  max-width: 70%;
  margin: 50px;
  margin-top: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 20px;
  border-radius: 10px;
  border-width: 1px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-style: italic;
}

button:hover {
  border: 2px solid #f3cfab;
  background-color: #f3cfab;
  color: white;
  border-color: #f3cfab;
  width:100px;
}

p {
  font-size: 20px;
  font-family: "Arial";
}

img {
  width: 100%;
  height: 700px;
}

#foot {
  background-color: #faedcd;
}
</style>