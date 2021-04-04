<template>
  <div class="chart">
    <BarChart></BarChart>
  </div>
</template>

<script>
import BarChart from "../PersonalBarChart.js";
export default {
  components: {
    BarChart,
  },
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
