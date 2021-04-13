<template>
  <section>
    <NavBar></NavBar>
    <h2 class="title" style="text-transform: uppercase">{{ this.userData.DisplayName }}'S PERSONAL DASHBOARD</h2>
    <br />
    <h3>Total Number of products listed/sold</h3>
    <BarChart></BarChart>
    <br />
    <br />
    <h3>Number of products in various categories</h3>
    <PieChart></PieChart>
  </section>
</template>

<script>
import BarChart from "./PersonalBarChart.vue";
import PieChart from "./PersonalCatPieChart.vue";
import { fbase } from "../firebase.js";
import { database } from "../firebase.js";

export default {
  data() {
    return {
      userData: {}
    };
  },
  components: {
    BarChart,
    PieChart,
  },
  methods: {
    loadUserData() {
      const user = fbase.currentUser
      if (user) {
        const uid = user.uid
        console.log("userid " + uid);
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            this.userData.id = doc.id;
          })
      }
    }
  },
  created() {
    this.loadUserData()
  }
};
</script>

<style scoped>
.title {
  border-bottom: 1px solid black;
  padding-bottom: 50px;
  font-size: 25px;
}

h3 {
  font-size: 25px;
}
</style>
