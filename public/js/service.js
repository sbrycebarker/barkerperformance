angular.module('app').service('service', function($http, $stateParams ) {

  this.getUsers = function(data) {
    return $http({
      method:'GET',
      data: data,
      url: '/getUsers',
      controller: "mainCtrl"
    })
  }

  this.getUser = function(res) {
    console.log("GETUSER")
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {

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

  this.sendMail = function (email) {
    console.log('email', email)
    return $http({
      method: 'POST',
      url: '/feedback',
      data: email
    }).then(function(res) {
      return res.data;
    })
  }

  this.addToList = function (email) {
    console.log('email', email)
    return $http({
      method: 'PUT',
      url: '/addToList',
      data: email
    })
  }

  this.getParts = function (data) {
    return $http({
      method: 'GET',
      url: '/getParts',
      controller: "mainCtrl"
    })
  }

  this.addUser = function (user) {
    console.log('running service')
    return $http({
      method: 'POST',
      url: '/addUser',
      data: user
    })
  }

  this.getPart = function () {
      return $http({
        method: 'GET',
        url: '/getPart/' + $stateParams.part,
        controller: 'mainCtrl',
      }).catch( function () {
        return "nopart"
      })
  }

})
