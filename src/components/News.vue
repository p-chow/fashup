<template>
  <section>
        <h1 id="head">News Page</h1>
    <div>
        <ul>
          <li v-for='(item, id) in itemsList' :key='id'>
            <div class="polaroid">
              <div class="fill"><img v-bind:src="item.imageURL"/></div>
              <div class="container"><a v-bind:href="item.url" id="url">{{item.name}}</a></div>
            </div>
          </li>
      </ul>
      </div>
    <div id= "communityDashboard">
      <CommunityDashboard></CommunityDashboard>
    </div>
  </section>
</template>

<script>
import CommunityDashboard from './CommunityDashboard.vue'

export default {
    components: {
      CommunityDashboard
    },
    data(){
        return{
      itemsList: [
        {
          id: "#000",
          name: "Why are fashion brands investing in garment recycling?",
          url: "https://www.greenbiz.com/article/fashions-latest-trend-why-hm-other-big-brands-are-investing-garment-recycling",
          imageURL:"https://i2.wp.com/www.prettylittlelondon.com/wp-content/uploads/2019/09/hm-Cover-2.jpg",
        },
        {
          id: "#025",
          name: "15 recycling efforts that are reshaping the fashion industry",
          url: "https://fashionunited.uk/news/business/15-recycling-efforts-that-are-reshaping-the-fashion-industry/2019051443162",
          imageURL:
            "https://fashionunited.uk/qxKL6QbmjaUWI231hn_zrP1hEsiTEdvvDDJK7_9JVYo/gravity:sm/quality:70/aHR0cHM6Ly9zdGF0aWMuZmFzaGlvbnVuaXRlZC5jb20vMjAxOTA1L1JlY3ljbGluZzIuanBn",
        },
        {
          id: "#067",
          name: "Textiles Wastage In Singapore...  What can we do?",
          url: "https://blogs.ntu.edu.sg/hp3203-2018-27/singapore/",
          imageURL: "https://eco-business.imgix.net/uploads/ebmedia/fileuploads/unnamed-2.jpg?fit=crop&h=960&ixlib=django-1.2.0&w=1440",
        },
        {
          id: "#077",
          name: "Singapore swapping initiatives offer alternative to fast fashion",
          url: "https://fashionunited.uk/news/fashion/singapore-swapping-initiatives-offer-alternative-to-fast-fashion/2021021553581",
          imageURL:
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iZe_k2zn.2dQ/v0/3000x-1.jpg",
        },
        {
          id: "#099",
          name: "Fast fashion, fast trash: Industry needs to arrest carbon impact, find sustainable solutions",
          url: "https://www.todayonline.com/singapore/fast-fashion-fast-trash-industry-needs-arrest-carbon-impact-find-sustainable-solutions",
          imageURL:
            "https://www.todayonline.com/sites/default/files/styles/new_app_article_detail/public/photos/43_images/waldemar-brandt-1408730-unsplash.jpg?itok=3r7extUp",
        },
      ]        }
    },
    methods:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container a {
    color: aliceblue;
    font-weight: 800;
  padding: 16px;
  text-decoration: none;
  display: block;
}

/* Change color on hover */
.container a:hover {
  background-color: #ddd;
  color: black;
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
  padding: 10px;
  margin: 10px;
}

img {
  height: 170px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}

div.polaroid {
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  box-shadow: 10px 10px;
  text-align: center;
  background-color: teal;
}

div.container {
  padding: 10px;
}

</style>
