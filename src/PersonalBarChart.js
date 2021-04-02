import {Bar} from 'vue-chartjs'
import {database} from './firebase.js'
import { fbase } from "./firebase.js";
//import {EventPassing} from '../passingid.js' //use this to get doc_id


export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Quantity",
                backgroundColor: [],
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
  props: {
    user_id: {        
      type: String,
    },
  },
  methods: {
    fetchItems: function () {
      console.log(this.user_id)
        var totalSum = {
            "Listings posted": 0,
            "Products sold": 0
        }

        database.collection('user').doc('this.user_id').get().then(querySnapShot => {
            var listedData = querySnapShot.get('productsListed')
            var soldData = querySnapShot.get('productsSold')
            totalSum["Listings posted"] = listedData.length  
            totalSum["Products sold"] = soldData.length  
        })

        for (var info in totalSum) {
            this.datacollection.datasets[0].data.push(totalSum[info])
            this.datacollection.labels.push(info)
        }

        this.renderChart(this.datacollection, this.options)
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