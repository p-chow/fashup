<template>
    <div>
        <bar-chart></bar-chart>
    </div>
</template>

<script>
import BarChart from "./PersonalBarChart.vue";

export default {
    components: {
        BarChart
    },
    props: {
        user_id: {
            type: String,
        },
    },
}
</script>

<style scoped>
</style>