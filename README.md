# Shopular

A mocked up store inventory manager, designed in angular.

This was my first angular project and I'm very proud of it, despite struggling with it maybe the most. It may not look like much, but there's a lot going on here.

The entire table is generated dynamically from the model. The javascript scans through each item object in the inventory array and generates a header array from the key name of each property. Then each html element gets a class based on that header. The table is sortable via angular's "orderBy" filter.

One of the optional features of this assignment was to allow the user to change between US and GBP currencies. I developed a scaleable translation system that utilizes linked lists to dynamically filter keywords such as "color" vs "colour" and "trash can" vs "waste basket", as well as taking into account the exchange rate. These characteristics are updated in the model itself, so that even the css class for the "color" column will change to "colour" when you change locales. Open up the inspector and try it your self!

There is a dummy "login" system that is not persistent. It just spits back your user name and prints the formatted login time on screen.

The "add item" menu also works dynamically, and creates each property based on what is in the dynamically generated header array. It then pushes a new item object into the model based on those properties.

The controller code is unwieldy and probably could be broken into services, but because of how much of the table is dynamically created, the html is nice and lean!
