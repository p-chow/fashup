<template>
  <section>
    <NavBar></NavBar>
    <h2 class="title">PERSONAL DASHBOARD</h2>
    <h3>Total Number of products listed/sold</h3>
    <BarChart></BarChart>
    <br>
  </section>
</template>

<script>
import BarChart from "./PersonalBarChart.vue";

export default {
  components: {
    BarChart,
  },
};
</script>

<style scoped>
.title{
  border-bottom: 1px solid black;
  padding-bottom: 50px;
  font-size:25px;
}
</style>
