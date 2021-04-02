<template>
  <div class="chart">
    <h1 id="title">Total Number of products listed/sold</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "../PersonalBarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style scoped>
#title {
  text-align: center;
  font-size: 24px;
  font-style: italic;
  font-family: Verdana;
}
</style>
