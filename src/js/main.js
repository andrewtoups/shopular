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

    //states:
    this.newItem = {
      "id": null,
      "name": null,
      "price": null,
      "quantity": null,
      "color": null,
      "discount": null
    };

    //general model properties:
    this.ids = this.inventory.map(function(value){
      return value.id;
    });
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
      toggle: function() {
        if (this.symbol === "$") { this.symbol = "£";}
        else {this.symbol = "$";}
        if (this.label === "USD") {this.label = "GBP";}
        else {this.label = "USD";}
        self.localize();
        self.exchange();
      }
    };

    //visible properties:

    this.view = [
      'name', 'quantity', 'color', 'price'
    ];

    this.tableWidth = {
      "width": 100/this.view.length + "%"
    }

    this.header = Object.keys(this.inventory[0]);

    //sort flags:

    this.sortBy = 'name';
    this.sortOrder = true;
    this.toggleSort = function(category){
      this.sortBy = category;
      this.sortOrder = !this.sortOrder;
    }

    //methods:

    // model update methods:

    this.generateId = function() {
      var id = Math.floor(Math.random()*99999);
      if (self.ids.some(function(value){return id === value;})){
        self.generateId();
      } else {
        return id;
      }
    };

    this.addItem = function() {
      if (!self.newItem.id) {
        self.newItem.id = self.generateId();
      }
      var item = {};
      for (var property in self.newItem) {
        item[property] = self.newItem[property];
        self.newItem[property] = null;
      }
      self.inventory.push(item);
    };


    this.updateView = function(views) {
      //sort indices in descending order
      var indices = Object.keys(views).sort(function(a, b) {
        return b - a;
      });
      //remove views
      for (var index = indices.length - 1; index >= 0; index--) {
        self.view.splice(indices[index], 1);
      }
      //add views
      for (var name in views){
        self.view.push(views[name]);
      }
      self.header = Object.keys(self.inventory[0]);
    };

    this.localize = function(){
      var update = false;
      var views = {};
      self.inventory.forEach(function(item){
        for (var key in item) {
          key = key.toString();
          var value = item[key].toString();
          if (self.locales.match(value)) {
            item[key] = self.locales.filter(item[key]);
          }
          if (self.locales.match(key)) {
            update = true;
            var index = self.view.indexOf(key);
            var newKey = self.locales.filter(key);
            views[index] = newKey; // update list of views to change by index
            item[newKey] = item[key];
            delete item[key];
          }
        }
      });
      if (update) {
        self.updateView(views);
      }
    };

    this.exchange = function(price) {
      // change from dollar to pound
      self.inventory.forEach(function(item){
        if (self.currency.symbol === '$'){
          item.price /= 1.5;
          item.discount /= 1.5;
        } else if (self.currency.symbol === '£'){
          item.price *= 1.5;
          item.discount *= 1.5;
        }
      })
    };

    // model display methods:

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

  });
