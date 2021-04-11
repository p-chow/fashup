<template>
<div>
	<NavBar></NavBar>
	<div id="communityDashboard">
      <CommunityDashboard></CommunityDashboard>
    </div>
</div>
</template>

<script>
import NavBar from "./NavBar.vue";
import CommunityDashboard from "./CommunityDashboard.vue";

export default {
  components: {
    NavBar,
    CommunityDashboard,
  },
}
</script>
<style scoped>
</style>