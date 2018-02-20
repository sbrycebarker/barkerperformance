angular.module('app').service('service', function($http, $stateParams) {

  this.getUsers = function(data) {
    console.log("service", data)
    return $http({
      method:'GET',
      data: data,
      url: '/getUsers',
      controller: "mainCtrl"
    })
  }

  this.getUser = function(res) {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log("Log In")
    })
  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

})
