import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          backgroundColor: "#006d77",
          data: [],
          fill: false
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Million tonnes of waste recycled per year'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=00fe011e-e4fb-45c5-b23d-a62143048eba')
        .then(response => {
          for (let i = 0; i < 16; i++) {
            this.datacollection.labels.push(response.data.result.records[i].year)
            this.datacollection.datasets[0].data.push(parseFloat(response.data.result.records[i].total_waste_recycled))
          }
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created() {
    this.fetchItems()
  }
}