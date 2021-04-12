<template>
  <div class="chart">
    <h2 class="title">COMMUNITY DASHBOARD</h2>
    <div id="info">
      <h3>
        Singapore is working towards becoming a Zero Waste Nation which we can
        help by reducing our consumption.
        <br />
        <br />Reduce, Reuse, Recycle and Donate.
      </h3>
    </div>
    <div id="video">
      <h3>Learn what you can and cannot recycle in 3 mins!</h3>
      <br />
      <iframe
        width="1120"
        height="630"
        src="https://www.youtube.com/embed/MT0rLhjVEPQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div id="figures">
      <h3>Learn about the recycling stats in Singapore</h3>
      <br />
      <LineChart></LineChart> <br /><br />
      <BarChart></BarChart>
      <p>Figures are from Data.gov.sg</p>
    </div>
    <div id="contacts">
      <h3>Learn where you can donate in Singapore</h3>
      <br />
      <ul>
        <li>
          <a href="https://www.greensquare.com.sg"> Greensquare </a>
          <br />
          <img
            id="greensquare"
            src="https://static1.squarespace.com/static/59f68aef8a02c7be42f11875/t/5a152298e4966b134246bdaa/1618136812231/?format=1500w"
          />
        </li>
        <li>
          <a href="https://www.salvationarmy.org/singapore/dik_fts">
            Salvation Army
          </a>
          <br />
          <br />
          <img
            id="salarmy"
            src="https://s3.amazonaws.com/cache.salvationarmy.org/13a5bf46-3ab9-462d-9059-81f023d3747c_Logo+%28276pixel+x+130pixel%29.jpg"
          />
        </li>
        <li>
          <a href="https://www.se.minds.org.sg/minds-shop"> MINDS </a>
          <br />
          <br />
          <img
            id="minds"
            src="https://static.wixstatic.com/media/768979_d5623fa0420a4d8abc5e410b2e1b5376~mv2.png/v1/fill/w_424,h_102,al_c,usm_0.66_1.00_0.01/768979_d5623fa0420a4d8abc5e410b2e1b5376~mv2.png"
          />
        </li>
        <li>
          <a href="https://www.facebook.com/SSVPSHOPSINGAPORE"> SSVP Shop </a>
          <br />
          <br />
          <img
            id="ssvp"
            src="https://scontent.fsin4-1.fna.fbcdn.net/v/t1.6435-9/70350556_109102727142366_1487951966129618944_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=973b4a&_nc_ohc=ACsf8kfHDnoAX8w4Vxs&_nc_ht=scontent.fsin4-1.fna&oh=a9f85fa250fae159b21f8a5c1f074c3c&oe=609A554C"
          />
        </li>
        <li>
          <a href="https://www.metta.org.sg/"> Metta Welfare Association </a>
          <br />
          <br />
          <img
            id="metta"
            src="https://www.giving.sg/image/organization_logo?img_id=3107065&1543906871000"
          />
        </li>
        <li>
          <a href="www.passiton.org.sg"> Pass It On </a>
          <br />
          <br />
          <img
            id="passiton"
            src="http://www.passiton.org.sg/passiton/slot/u13/pass-it-on-logo-fb3.jpg"
          />
        </li>
      </ul>
    </div>
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
.title {
  border-bottom: 1px solid black;
  padding-top: 25px;
  padding-bottom: 50px;
  font-size: 25px;
}

#video {
  background-color: #e9edc9;
  padding-top: 25px;
  padding-bottom: 50px;
  color: #a3a380;
}

#figures {
  background-color: #fff1e6;
  padding-top: 25px;
  padding-bottom: 50px;
  color: #d8a48f;
}

#contacts {
  background-color: #faedcd;
  padding-top: 25px;
  padding-bottom: 50px;
  color: #d4a373;
}

h3 {
  font-size: 25px;
}

a {
  font-size: 25px;
  color: #d4a373;
}

p {
  float: right;
  font-size: 15px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-basis: 300px;
  text-align: center;
  padding: 5x;
  margin: 5px;
}

#greensquare {
  width: 160px;
  height: 160px;
}

#salarmy {
  width: 180px;
  height: 90px;
}

#minds {
  width: 250px;
  height: 80px;
}

#ssvp {
  width: 140px;
  height: 140px;
}

#metta {
  width: 140px;
  height: 140px;
}

#passiton {
  width: 140px;
  height: 140px;
}
</style>
