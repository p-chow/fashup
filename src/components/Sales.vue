<template>
  <div id="ann">
    <NavBar></NavBar>
    <h2 class="title">A N N O U N C E M E N T</h2>

    <h3>FASHUP X SUNLOFT</h3>
    <section>
      <div id="leftside">
        <img
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ghkguidetogiving-donateclothesindex-1604931160.jpg?crop=0.827xw:0.827xh;0.0846xw,0.0259xh&resize=980:*"
        />
      </div>
      <div id="rightside">
        <a>Check out the latest seasonal donation drive that is happening on</a
        ><br />
        <b>11th April 2021!</b>
        <br />
        <p>A spring collaboration with Sunloft</p>
        <p>Location: 1 Tampines Walk, Singapore 528523</p>
        <p>Tampines Hub Level 1 Foyer</p>
        <p>
          From 10am to 8pm, join us in the Fashup community movement by donating
          your clothings!
        </p>
        <p>See you there!</p>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
#ann {
  height: 100vh;
}

.title {
  border-bottom: 1px solid black;
  padding-top: 25px;
  padding-bottom: 50px;
  font-size: 25px;
}

#leftside {
  width: 300px;
  padding: 10px;
  float: left;
  text-align: left;
}

#rightside {
  margin-left: 300px;
  padding: 50px;
  text-align: left;
}

p {
  font-size: 17px;
  margin-left: 28px;
}

h3 {
  text-align: left;
  margin-left: 20px;
}

#leftside img {
  height: 280px;
}

section {
  padding: 40px;
  padding-top: 0px;
}
</style>
