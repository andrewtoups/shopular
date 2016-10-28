'use strict';

angular
  .module('inventory', [])
  .controller('shopKeeper', function(){
    this.inventory = [
      { "id": 2957, "name": "widget", "price": 32, "quantity": 203, "color": "red", "discount": 31 },
      { "id": 89274, "name": "golf club", "price": 98, "quantity": 10, "color": "black", "discount": 0 },
      { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "white", "discount": 0 },
      { "id": 87363, "name": "bonzai tree", "price": 76, "quantity": 2, "color": "green", "discount": 0 },
      { "id": 1736, "name": "towel", "price": 55, "quantity": 30, "color": "brown", "discount": 10 },
      { "id": 4836, "name": "dog bed", "price": 99, "quantity": 10, "color": "beige", "discount": 50 },
      { "id": 829, "name": "waste basket", "price": 15, "quantity": 40, "color": "silver", "discount": 0 },
      { "id": 46, "name": "guitar", "price": 899, "quantity": 0, "color": "blue", "discount": 150 },
      { "id": 17456, "name": "matcha tea", "price": 42, "quantity": 4, "color": "green", "discount": 11 },
      { "id": 3292, "name": "enlightenment", "price": 99999, "quantity": 1, "color": "red", "discount": 0 },
      { "id": 533, "name": "eggs", "price": 5, "quantity": 12, "color": "brown", "discount": 1 },
      { "id": 683, "name": "pillow", "price": 27, "quantity": 10, "color": "black", "discount": 12 }
    ];

    //general model properties:
    var self = this;
    this.taxRate = 0.0575;
    this.locales = {
      "$": ['rubbish bin', 'colour'], //value to change to if previous currency
      "£": ['waste basket', 'color'],
      match: function (string) {
        return this[self.currency.symbol].some(function(value){
          if (string === value) {return true;}
          else {return false;}
        });
      },
      filter: function(string){
        var index = this[self.currency.symbol].indexOf(string);
        if (self.currency.symbol === "£") {
          string = this["$"][index];
        } else if (self.currency.symbol === "$") {
          string = this["£"][index];
        }
        return string;
      }
    };

    this.currency = {
      symbol: "$",
      label: "USD",
      toggle: function(){
        if (this.symbol === "$") { this.symbol = "£";}
        else {this.symbol = "$";}
        if (this.label === "USD") {this.label = "GBP";}
        else {this.label = "USD";}
      }
    };

    //visible properties:
    this.view = [
      'name', 'quantity', 'color', 'price'
    ];

    //methods:
    this.getHeader = function() {
      return Object.keys(this.inventory[0]);
    };

    this.updateView = function(name) {
      this.view.push(name);
    };

    this.localize = function(string){
      string = string.toString();
      if (self.locales.match(string)) {
        return self.locales.filter(string)
      } else {
        return string;
      }
    }

    this.show = function(type) { // check if item is in view
      return this.view.some(function(value){
        if (value === type)
          { return true; }
        else
          { return false; }
      });
    };

    this.tax = function(price) {
      var taxedValue = price + (price*this.taxRate);
      return taxedValue;
    };

    this.exchange = function(price) {
      // change from dollar to pound
      if (self.currency.symbol === '$'){
        return price;
      } else if (self.currency.symbol === '£'){
        return price * 1.5;
      }
    }
  });
