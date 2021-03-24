<template>
  <div id="app">
    <shop></shop>
  </div>
</template>

<script>
import Shop from './components/Shop.vue'

export default {
  name: 'App',
  components: {
        'shop': Shop,
  },
  data(){
    return{
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#head {
  text-align: center;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  color: black;
  background-color:skyblue;
  font-size: 60px;
}
</style>
