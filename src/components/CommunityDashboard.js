import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
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
        axios.get()
        .then(response => {
            for (let i=0; i < 16; i++) {
                console.log("Records " + response)
        
            }

        })
        this.renderChart(this.datacollection, this.options)
        }
    },
  created () {
    this.fetchItems()
  }
}