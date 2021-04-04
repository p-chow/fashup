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
          backgroundColor: ['blue', 'red'],
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
      //console.log(user.uid);
      if (user) {
        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.allProducts = snapshot.data().productsListed;
          })

        console.log(this.allProducts.length);
        totalSum["Listings posted"] = this.allProducts.length;

        database
          .collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.productsSold = snapshot.data().productsSold;
          })

        console.log(this.productsSold.length);
        totalSum["Products sold"] = this.productsSold.length;
      }


      for (var info in totalSum) {
        this.datacollection.datasets[0].data.push(totalSum[info])
        this.datacollection.labels.push(info)
      }

      this.renderChart(this.datacollection, this.options)

      /*database.collection('user').doc('this.user_id').get().then(querySnapShot => {
        var listedData = querySnapShot.get('productsListed')
        var soldData = querySnapShot.get('productsSold')
        totalSum["Listings posted"] = listedData.length
        totalSum["Products sold"] = soldData.length
      })*/

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
    this.fetchItems();
    this.loadUserData();
  }
}