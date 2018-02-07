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

  // this.user = function(user) {
  //   console.log("service user")
  //   return $http({
  //     method: 'GET',
  //     data: user,
  //     url: '/getUser/:id'
  //   })
  // }

})
