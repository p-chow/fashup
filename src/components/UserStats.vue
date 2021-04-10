<template>
  <div id="dbpage">
    <NavBar></NavBar>
    <div id="graphs">
      <PersonalDashboard></PersonalDashboard>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import PersonalDashboard from "./PersonalDashboard.vue";

export default {
  components: {
    NavBar,
    PersonalDashboard,
  },
};
</script>

<style scoped>
#dbpage {
  height: auto;
}

#graphs {
  padding: 50px;
}
</style>
