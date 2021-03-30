<template>
  <div class="chart">
    <h1>Community Dashboard</h1>
    <p>Figures from Data.gov.sg</p>
    <LineChart></LineChart> <br /><br />
    <BarChart></BarChart>
  </div>
</template>

<script>
import LineChart from "./CommunityLineChart.vue";
import BarChart from "./CommunityBarChart.vue";

export default {
  components: {
    LineChart,
    BarChart,
  },
};
</script>

<style scoped>
</style>
