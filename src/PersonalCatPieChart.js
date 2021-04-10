import { Pie } from 'vue-chartjs'
import { database } from './firebase.js'
import { fbase } from "./firebase.js";

export default {
    extends: Pie,
    data: function () {
        return {
            currUserId: [],
            userData: {},
            existingProducts: [],
            productsSold: [],
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ['blue', 'green', 'pink', 'yellow'],
                    data: []
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: ''
                },
                responsive: true
            }
        }
    },
    methods: {
        fetchItems: function () {
            var totalSum = {
                "Tops": 0,
                "Bottoms": 0,
                "Dresses": 0,
                "Accessories": 0
            }

            const user = fbase.currentUser;
            if (user) {
                database
                    .collection("users")
                    .doc(user.uid)
                    .get()
                    .then((snapshot) => {
                        //run through all products to get category and increase count
                        this.productsSold = snapshot.data().productsSold;
                        this.existingProducts = snapshot.data().productsListed;

                        database
                            .collection("products")
                            .get()
                            .then((snap) => {
                                snap.docs.forEach((doc) => {
                                    if (this.existingProducts.includes(doc.id)) {
                                        console.log(doc.get("category"));
                                        var cat = doc.get("category");
                                        if (cat == 'top') {
                                            totalSum['Tops'] += 1;
                                        } else if (cat == 'bottoms') {
                                            totalSum['Bottoms'] += 1;
                                        } else if (cat == 'dress') {
                                            totalSum['Dresses'] += 1;
                                            //console.log(totalSum['Dresses']);
                                        } else {
                                            totalSum['Accessories'] += 1;
                                        }
                                    }
                                    if (this.productsSold.includes(doc.id)) {
                                        console.log(doc.get("category"));
                                        var cat1 = doc.get("category");
                                        if (cat1 == 'top') {
                                            totalSum['Tops'] += 1;
                                        } else if (cat1 == 'bottoms') {
                                            totalSum['Bottoms'] += 1;
                                        } else if (cat1 == 'dress') {
                                            totalSum['Dresses'] += 1;
                                        } else {
                                            totalSum['Accessories'] += 1;
                                        }
                                    }
                                })

                                console.log(totalSum);
                                for (var info in totalSum) {
                                    this.datacollection.datasets[0].data.push(totalSum[info])
                                    this.datacollection.labels.push(info)
                                }

                                this.renderChart(this.datacollection, this.options)
                            })
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