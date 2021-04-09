<template>
  <div id="app">
    <h1 id="shopname">Fashup</h1>
    <!-- <NavBar></NavBar> -->
    <router-view></router-view>
  </div>
  <!-- <div>

  </div> -->
</template>

<script>
// import NavBar from './components/NavBar.vue'
export default {
  // components:{
  // 	"NavBar": NavBar
  // }
};
</script>

<style scoped>
#app {
  text-align: center;
  font-size: 30px;
  color: #111;
  background-color:  #FFFDF2;
  font-family: "Arial", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

#shopname {
  margin-top: 0;
  padding-top: 25px;
  font-style: italic;
  font-family: "Remark";
}

@font-face {
  font-family: "Remark";
  src: local("Remark"),
   url(./assets/fonts/Remark-Regular.ttf) format("truetype");
}

button {
  background-color: #E9EDC9;
	border-color: #E9EDC9;
	float:left;
	padding: 10px;
	box-sizing: border-box;
	font-size: 15px;
	border-radius: 60px;
	border-width: 1px;
  font-weight: 400;
}

button:hover {
  border: 2px solid #CCD5AE;
  background-color: #CCD5AE;
  color: white;
  box-sizing: unset;
  border-color: #CCD5AE;
  font-weight: 500;
}
</style>
