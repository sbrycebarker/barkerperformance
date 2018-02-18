angular.module('app').controller('mainCtrl', function($scope, service, $state, $http) {
  $scope.test = service.serviceTest
  function createSlick() {
    $('.slick').slick({
      centerMode: true,
      infinite: true,
      autoplay: true,
      responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true
            }
          }
        ]
    });
  }

  createSlick()

  function onpage() {
    $("#" + "home").css("color", "inherit")
    $("#" + "products").css("color", "inherit")
    $("#" + "life").css("color", "inherit")
    // if ($state.current.name === 'products') {
    //   $('html, body').animate({scrollTop:0}, 'slow')
    // }
    $(document).ready(function() {
      var state = $state.current.name
      $("#" + state).css("color", "#ff2800")
    })

  }

  onpage();

  $scope.build = function() {
    $("html, body").animate({ scrollTop: "888" }, 500)
  }


  function pizza() {
    console.log('pizza')
      $("html, body").animate({ scrollTop: "2777" }, 1000)

  }

    $scope.menuOpen =  function() {
      var sidebar = document.getElementById('sidebar');
      if (sidebar.style.width == '0px' || sidebar.style.width == 0 ) {
        console.log('OPEN')
      sidebar.style.width = '100%'
    } else {
      sidebar.style.width = '0px';
    }
  }

// <===========================================JAVASCRIPT==========================================================>

  $scope.getUsers = function() {
    service.getUsers().then(function(result){
      console.log("main", result.data[0])
      if (!result) {
        $scope.users = "Login"
      } else {
      $scope.users = result.data[0].name
    }
    })
  }

  $scope.getUsers();

  $scope.user = function(result) {
    service.user().then(function(result) {
      $scope.user = result
    })
  }

  // $scope.user();

  $scope.createUser = function(data) {
    let user = data;
  }


})
