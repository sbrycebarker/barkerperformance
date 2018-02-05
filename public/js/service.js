angular.module('app').service('service', function($http) {
  this.serviceTest = 'Hello, I am a working test!'

  this.users = function(users) {
    return $http({
      method:'GET',
      url: '/getUser'
    })
  }

})
