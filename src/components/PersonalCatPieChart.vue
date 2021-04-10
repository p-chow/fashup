<template>
  <div id="area">
    <PieChart id="pc"></PieChart>
  </div>
</template>

<script>
import PieChart from "../PersonalCatPieChart.js";
export default {
  components: {
    PieChart,
  },
};
</script>

<style scoped>
#pc {
  width: 30vw;
  padding-left: 30vw;
}
</style>
