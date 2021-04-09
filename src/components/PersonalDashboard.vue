<template>
  <div>
    <h1 id="title">Total Number of products listed/sold</h1>
    <BarChart></BarChart>
    <br>
  </div>
</template>

<script>
import BarChart from "./PersonalBarChart.vue";

export default {
  components: {
    BarChart,
  },
};
</script>

<style scoped></style>
