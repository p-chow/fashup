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
  background-color:  #FEFAE0;
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
</style>
