<template>
  <section>
    <NavBar></NavBar>
    <h2 class="title">PERSONAL DASHBOARD</h2>
    <br />
    <h3>Total Number of products listed/sold</h3>
    <BarChart></BarChart>
    <br />
    <br />
    <h3>Number of products in various categories</h3>
    <PieChart></PieChart>
  </section>
</template>

<script>
import BarChart from "./PersonalBarChart.vue";
import PieChart from "./PersonalCatPieChart.vue";

export default {
  components: {
    BarChart,
    PieChart,
  },
};
</script>

<style scoped>
.title {
  border-bottom: 1px solid black;
  padding-bottom: 50px;
  font-size: 25px;
}

h3 {
  font-size: 25px;
}
</style>
