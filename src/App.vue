<template>
  <div id="app">
    <h1>Fashup</h1>
    <!-- <NavBar></NavBar> -->
    <router-view></router-view>
  </div>
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
  color: aquamarine;
  background-color: rgb(232, 255, 255);
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-style: italic;
}

h1 {
  margin-top: 0;
  padding-top: 25px;
}
</style>
