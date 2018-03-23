const myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller("DeliveryController", ['$http', function ($http) {
    console.log('controller loaded');

    let self = this;

    self.allDeliveries;
    self.deliveriesPerDay;

    self.date = new Date();
    self.weekday = new Array(7);
    self.weekday[0] = "Sunday";
    self.weekday[1] = "Monday";
    self.weekday[2] = "Tuesday";
    self.weekday[3] = "Wednesday";
    self.weekday[4] = "Thursday";
    self.weekday[5] = "Friday";
    self.weekday[6] = "Saturday";

    self.currentDay = self.weekday[self.date.getDay()];
    
    self.getDeliveries = function () {
        $http.get('/delivery')
            .then((response) => {
                console.log('get response', response.data);
                self.allDeliveries = response.data;
                self.deliverySchedule(self.currentDay, self.allDeliveries)
            })
            .catch((error) => {
                console.log('error on get', error);
            })
    }
    
    self.getDeliveries();

    // loops through the Response from the JSON file which gives us access to days and delivery details 
    self.deliverySchedule = function (day, allDeliveries) {
        for (let i = 0; i < allDeliveries.length; i++) {
            // whatever todays date is it will display the corresponding deliveries.
            if (self.currentDay === "Saturday" || self.currentDay === "Sunday") {
                alert("there are no deliveries today!");
            }
            if (day === self.currentDay ) {
                self.deliveriesPerDay = allDeliveries[i].deliveries;
            }
            if(day === allDeliveries[i].day) {
                self.deliveriesPerDay = allDeliveries[i].deliveries;
            }
        }
    }
}]);