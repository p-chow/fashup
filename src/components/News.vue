<template>
  <section id="news">
    <NavBar></NavBar>
    <h2 class="title">A R T I C L E S</h2>
    <div>
      <ul>
        <li v-for="(item, id) in itemsList" :key="id">
          <div class="polaroid">
            <div class="fill"><img v-bind:src="item.imageURL" /></div>
            <div class="container">
              <a id="src">{{item.source}}</a>
              <a v-bind:href="item.url" id="url" target="_blank">{{ item.name }}</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
  </section>
</template>

<script>
import NavBar from "./NavBar.vue";
//import CommunityDashboard from "./CommunityDashboard.vue";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      itemsList: [
        {
          id: "#000",
          source:"GreenBiz",
          name: "Why are fashion brands investing in garment recycling?",
          url:
            "https://www.greenbiz.com/article/fashions-latest-trend-why-hm-other-big-brands-are-investing-garment-recycling",
          imageURL:
            "https://i2.wp.com/www.prettylittlelondon.com/wp-content/uploads/2019/09/hm-Cover-2.jpg",
        },
        {
          id: "#001",
          source:"FASHION UNITED",
          name: "15 recycling efforts that are reshaping the fashion industry",
          url:
            "https://fashionunited.uk/news/business/15-recycling-efforts-that-are-reshaping-the-fashion-industry/2019051443162",
          imageURL:
            "https://fashionunited.uk/qxKL6QbmjaUWI231hn_zrP1hEsiTEdvvDDJK7_9JVYo/gravity:sm/quality:70/aHR0cHM6Ly9zdGF0aWMuZmFzaGlvbnVuaXRlZC5jb20vMjAxOTA1L1JlY3ljbGluZzIuanBn",
        },
        {
          id: "#002",
          source:"NTU Blog",
          name: "Textiles Wastage In Singapore...  What can we do?",
          url: "https://blogs.ntu.edu.sg/hp3203-2018-27/singapore/",
          imageURL:
            "https://eco-business.imgix.net/uploads/ebmedia/fileuploads/unnamed-2.jpg?fit=crop&h=960&ixlib=django-1.2.0&w=1440",
        },
        {
          id: "#003",
          source:"FASHION UNITED",
          name:
            "Singapore swapping initiatives offer alternative to fast fashion",
          url:
            "https://fashionunited.uk/news/fashion/singapore-swapping-initiatives-offer-alternative-to-fast-fashion/2021021553581",
          imageURL:
            "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iZe_k2zn.2dQ/v0/3000x-1.jpg",
        },
        {
          id: "#004",
          source:"Today",
          name:
            "Fast fashion, fast trash: Industry needs to arrest carbon impact, find sustainable solutions",
          url:
            "https://www.todayonline.com/singapore/fast-fashion-fast-trash-industry-needs-arrest-carbon-impact-find-sustainable-solutions",
          imageURL:
            "https://www.todayonline.com/sites/default/files/styles/new_app_article_detail/public/photos/43_images/waldemar-brandt-1408730-unsplash.jpg?itok=3r7extUp",
        },
        {
          id: "#005",
          source:"Straits Times",
          name:
            "New forces are reinventing fashion and bringing change to the industry",
          url:
            "https://www.straitstimes.com/life/style/new-forces-are-reinventing-fashion-and-bringing-change-to-the-industry",
          imageURL:
            "https://static.straitstimes.com.sg/s3fs-public/styles/article_pictrure_780x520_/public/articles/2020/12/31/af_marineserre_311220.jpg?itok=46_kJgwo&timestamp=1609394420",
        },
        {
          id: "#006",
          source:"Channel News Asia",
          name:
            "Commentary: Taking Singapore’s green ambitions to new heights with a circular economy",
          url:
            "https://www.channelnewsasia.com/news/commentary/singapore-circular-economy-sustainability-community-climate-14367536",
          imageURL:
            "https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/10599402/16x9/991/557/63325bb76cb1794e6ef64839c158a4f/TI/clothes-on-racks-in-a-thrift-shop.jpg",
        },
      ],
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#news {
  height: auto;
}

.title{
  border-bottom: 1px solid black;
  padding-top:25px;
  padding-bottom: 50px;
  font-size:25px;
}

.container a {
  color: black;
  font-weight: 200;
  padding-bottom: 16px;
  text-decoration: none;
  display: block;
  font-size:20px;
}

.container #src {
  font-size:15px;
  color: darkgray;
}
/* Change color on hover */
/* .container a:hover {
  color: black;
} */

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
  min-height: 100%;
}

div.polaroid {
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  box-shadow: 10px 10px;
  text-align: center;
  background-color: #E9EDC9;
}

div.polaroid:hover {
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  box-shadow: 10px 10px;
  text-align: center;
  background-color: #CCD5AE;
}

div.container {
  padding: 30px;
  text-align:left;
}
</style>
