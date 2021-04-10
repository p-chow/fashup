<template>
  <div class="chart">
    <h2 class="title">COMMUNITY DASHBOARD</h2>
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
.title{
  border-bottom: 1px solid black;
  padding-top:25px;
  padding-bottom: 50px;
  font-size:25px;
}
</style>
