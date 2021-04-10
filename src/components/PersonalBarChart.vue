<template>
  <div>
    <BarChart id="bc"></BarChart>
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
#bc {
  width: 75vw;
  padding-left: 10vw;
}
</style>
