import {Bar} from 'vue-chartjs'
//import {database} from '../firebase.js'
//import {EventPassing} from '../passingid.js' //use this to get doc_id


export default {
  extends: Bar,
  data: function () {
    return {
        doc_id:this.$route.params.id,
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
                text: 'Total Number of products listed/sold'
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
        /*var totalSum = {
            "Listings posted": 0,
            "Products sold": 0
        }

        database.collection('user').document('this.doc_id').then(querySnapShot => {
            var listedData = querySnapShot.get('productsListed')
            var soldData = querySnapShot.get('productsSold')
            totalSum["Listings posted"] = listedData.length  
            totalSum["Products sold"] = soldData.length  
        })

        for (var info in totalSum) {
            this.datacollection.datasets[0].data.push(totalSum[info])
            this.datacollection.labels.push(info)
        }*/

        this.renderChart(this.datacollection, this.options)
      }
  },
  created() {
    this.fetchItems()
  }
}