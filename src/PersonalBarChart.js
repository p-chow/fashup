import { Bar } from 'vue-chartjs'
import { database } from './firebase.js'
import { fbase } from "./firebase.js";

export default {
  extends: Bar,
  data: function () {
    return {
      currUserId: [],
      userData: {},
      allProducts: [],
      productsSold: [],
      datacollection: {
        labels: [],
        datasets: [{
          label: "Quantity",
          backgroundColor: ['blue', 'green'],
          data: []
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: ''
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    fetchItems: function () {
      var totalSum = {
        "Listings posted": 0,
        "Products sold": 0
      }

      const user = fbase.currentUser;
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.allProducts = snapshot.data().productsListed;
            totalSum["Listings posted"] = this.allProducts.length;
            console.log(totalSum["Listings posted"]);

            this.productsSold = snapshot.data().productsSold;
            totalSum["Products sold"] = this.productsSold.length;
            console.log(totalSum["Products sold"]);

            for (var info in totalSum) {
              this.datacollection.datasets[0].data.push(totalSum[info])
              this.datacollection.labels.push(info)
            }

            this.renderChart(this.datacollection, this.options)
          })
      }
    },
    loadUserData() {
      const user = fbase.currentUser;
      if (user) {
        this.login = true;
        const uid = user.uid;
        console.log("userid " + uid);
        database
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            this.userData.id = doc.id;
          });
      }
    }
  },
  created() {
    this.loadUserData();
    this.fetchItems();
  }
}