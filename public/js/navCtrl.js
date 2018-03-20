angular.module('app').controller('navCtrl', function($scope, service, $state) {

  $scope.getUser = function() {
    service.getUser().then(function(user) {
      console.log("user", user)
      if (user) {
        $scope.user = user[0].username;
        $scope.userid = user[0].user_id
        console.log("userinfo", $scope.user)
        $scope.getfaveBands();
        $scope.getfaveVenues()
      } else {
        $scope.user = 'LOG IN!';
      }
    })
  }

    // $scope.getUser();

})
