/*global $, document */

var CarFactory = (function () {
    /**
     * Creates a car factory that can build new car objects
     * @constructor Factory
     */
    var Factory = function () {};

    Factory.prototype = {
        /**
         * Builds a car from the provided spec
         * @param  {Object} specs Car details of the form
         * {
         * 		make: {String},
         * 		model: {String},
         * 		year: {Number}
         * }
         * @return {Car}          the built car
         */
        build: function (specs) {
            // validate that specs is an object
            if (specs === null || typeof specs !== "object") {
                throw new Error("CarFactory.setspecs specs parameter is not an object");
            }

            var car = {
                /**
                 * generates the html for a car list item
                 * @return {String} the html string
                 */
                render: function () {
                    var html = "<li>";
                    html += this.make + " ";
                    html += this.model + " ";
                    html += this.year + " ";
                    html += this.country + " ";
                    html += "</li>";
                    return html;
                }
            };

            // validate the existance of specs.make and it's string type
            if (specs.make && typeof specs.make === "string") {
                car.make = specs.make;
            }
            if (specs.model && typeof specs.model === "string") {
                car.model = specs.model;
            }
            if (specs.year && typeof specs.year === "number") {
                car.year = specs.year;
            }
            if (specs.country && typeof specs.country === "string") {
            car.country = specs.country;
            }

            return car;
        },

        /**
         * Builds a separate car based on the spec for each year in
         * the year range
         * @param  {Object} specs     Car details
         * @param  {Number} startYear The starting year
         * @param  {Number} endYear   The ending year
         * @return {Array}            an array of cars
         */
        buildAllYears: function (specs, startYear, endYear) {
            var range = Array.apply(null, Array(endYear - startYear + 1))
                .map(function (_, i) {
                    return i + startYear;
                });

            return range.map(function (year) {
                return this.build({
                    year: year,
                    make: specs.make,
                    model: specs.model,
                    country: specs.country
                });
            }.bind(this));
        }
    };

    return Factory;
}()); //IIFE - immediately invoked function expression

var CarManufacturer = (function () {
    /**
     * Creates an instance of the Manufacturer class
     * @constructor
     * @returns {Manufacturer} A car Manufacturer
     */
    var Manufacturer = function() {};

    Manufacturer.prototype = {
        // need a factory... or two? just one is fine for now.
        init: function(name) {
            this.factory = new CarFactory();
            this.name = name;
            // return this;
        },

        // build models
        build: function() {

        }
    };

    return Manufacturer;
}());

var CarModel = (function ()  {

  var Model = function() {};

  Model.prototype = {

    init: function(name) {
      this.factory = new CarFactory();
      this.name = name;

    }
  }

})

var cars = {
    store: [],

    /**
     * pushes a single car or an array of cars to the
     * cars.store property
     * @param {Car | Array} car the car(s)
     */
    add: function (car) {
        if (car instanceof Array) {
            car.forEach(function(car) {
                this.add(car);
            }.bind(this));
            return;
        }
        this.store.push(car);
    },

    /**
     * generates the html for all the cars in my store
     * @return {String} the html string
     */
    render: function () {
        var html = "<ul>";
        html += this.store.map(function (car) {
            return car.render();
        }).join("");
        html += "</ul>";
        return html;
    }
};

/**
 * generates the html string for the page
 * @return {String} the html
 */
var render = function () {
    var html = "<h1>Cars of the World</h1>";
    html += cars.render();
    return html;
};

/**
 * Creates all the cars
 * @return {undefined} undefined
 */
var makeCars = function () {
    var factory = new CarFactory();
    cars.add(factory.buildAllYears({
        make: "Jeep",
        model: "Cherokee",
        country: "United States"
    }, 1984, 2001));
};

/**
 * This makes cars, renders the html string for listing the cars,
 * and appends that html string to the root element
 * @param  {jQuery} $rootElement The root element of the page
 * @return {undefined}           undefined
 */
var init = function ($rootElement) {
    makeCars();
    var htmlString = render();
    $rootElement.append(htmlString);
};

$(document).ready(function () {
    var $rootElement = $("body");
    init($rootElement);
});

// displaying specific cars
//
