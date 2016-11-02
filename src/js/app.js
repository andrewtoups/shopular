'use strict';

var app = angular
  .module('inventory', ['LocalStorageModule'])
  .controller('shopKeeper', function(Storage, InventoryManage, User){
    // LOL
    var self = this;

    //states:
    this.newItem = {
      "id": null,
      "name": null,
      "price": null,
      "quantity": null,
      "color": null,
      "discount": null
    };

    this.newUser = {
      'username': null,
      'timestamp': null
    };

    this.users = [];

    //general model properties:

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

    //sort flags:

    this.sortBy = 'name';
    this.sortOrder = true;
    this.toggleSort = function(category){
      this.sortBy = category;
      this.sortOrder = !this.sortOrder;
    }

    //methods:

    this.login = function() {
      self.newUser = User.login(self.newUser.username);
      self.users.push(self.newUser);
    }

    // model update methods:

    this.update = function() {
      Storage.set(self.sessionItems);
    };

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
      self.sessionItems.push(item);
      Storage.set(self.sessionItems);
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
          key = key.toString().toLowerCase();
          var value = item[key].toString().toLowerCase();
          if (self.locales.match(value)) {
            item[key] = self.locales.filter(value);
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

    this.exchange = function(price) { // converts currency between dollars and pounds
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

    this.createTable = function() {
      InventoryManage.load().then(function (response) {
        self.inventory = response.data;
        self.sessionItems = Storage.get();
        self.inventory = self.inventory.concat(self.sessionItems);
        self.header = Object.keys(self.inventory[0]);
        self.ids = self.inventory.map(function(value){
          return value.id;
        });
      });
    };

    this.createTable();

  });
