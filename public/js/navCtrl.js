angular.module('app').controller('navCtrl', function($scope, service, $state) {

  $scope.getUser = function() {
    service.getUser().then(function(user) {
      console.log("user", user)
      if (user) {
        $scope.user = user.displayName;
        $scope.userid = user.user_id
        console.log("userinfo", $scope.user)
      } else {
        $scope.user = 'LOG IN!';
      }
    })
  }

    $scope.getUser();

})
