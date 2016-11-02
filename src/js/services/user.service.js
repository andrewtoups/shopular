angular.module('inventory')
  .service('User', function(){

    var users = [];

    function login(username){
      var date = utils.formatDate(new Date());
      var user = {
        username: username,
        timestamp: date
      };
      users.push(username);
      return user;
    }

    function getUser(username){
      var index = users.indexOf(username);
      if (index !== -1){
        return users[index];
      } else {
        return null;
      }
    }

    return {
      login: login,
      get: getUser
    };
  });
