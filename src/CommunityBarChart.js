import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Bar,
    data: function () {
      return {
          datacollection: {
              labels: [],
              datasets: [{
                  label: "Population (millions)",
                  backgroundColor: ["006d77", "83c5be", "edf6f9", "ffddd2", "e29578", "f6bd60", "f7ede2", "f5cac3",
                "84a59d", "f28482", "006d77", "83c5be", "edf6f9"],
                  data: []
                }]
          },
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Recycling rate (%)'
              },
              responsive: true,
              maintainAspectRatio: false
          }
      }
    },
    methods: {
        fetchItems: function () {
          axios.get('https://data.gov.sg/api/action/datastore_search?offset=210&resource_id=4d83d0be-55ba-46de-8430-2ff708fede5c')
            .then(response => {
              for (let i = 0; i < 14; i++) {
                this.datacollection.labels.push(response.data.result.records[i].waste_type)
                this.datacollection.datasets[0].data.push(parseFloat(response.data.result.records[i].recycling_rate))
              }
            this.renderChart(this.datacollection, this.options)
            })
        }
      },
    created () {
      this.fetchItems()
    }
  }