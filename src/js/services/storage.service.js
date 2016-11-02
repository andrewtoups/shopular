angular.module('inventory')
  .service('Storage', function(localStorageService) {
    function store(items){
      localStorageService.set('shopular-inventory', items);
    }

    function load() {
      return localStorageService.get('shopular-inventory') || [];
    }

    return {
      set: store,
      get: load
    };
  });
