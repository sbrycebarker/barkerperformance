angular.module('app').controller('mainCtrl', function($scope, service, $state) {
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
      $("#" +  state).css("color", "#ff2800")
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

  $scope.cartOpen =  function() {
    var cartside = document.getElementById('cart-side');
    if (cartside.style.width == '0px' || cartside.style.width == 0 ) {
      console.log('OPEN')
    cartside.style.width = '500px'
  } else {
    cartside.style.width = '0px';
  }
}

  $scope.closeCart = function() {
    var cartside = document.getElementById('cart-side');
      cartside.style.width = '0px';
  }

// <=========================================== Data ==========================================================>
  $scope.user = [];

  $scope.getUser = function() {
    service.getUser().then(function(user) {
      console.log("user", user)
      if (user) {
        $scope.user.push(user)
        $scope.username = user.displayName;
        $scope.userid = user.user_id
        console.log("userinfo", $scope.user)
      } else {
        $scope.username = 'LOG IN!';
      }
    })
  }
  $scope.getUser();

  $scope.getUsers = function() {
    service.getUsers().then(function(result){
      console.log(result)
      let users = result
      for (var i = 0; i < users.length; i++) {
        if (i.user_id === $scope.userid) {
          console.log("Welcome")
        } else {
          service.addUser($scope.user)
        }
      }
    })
  }

  $scope.getUsers();

  $scope.contact = function(data) {
    if (!data.email) {
      console.error("Please enter valid email!");
      $scope.invalidEmail = "Please enter valid email";
    } else {
      console.log("data", data)
      document.getElementsByClassName('input').value = ''
    }
  }


    $scope.logout = service.logout;
//<<=================================== Nodemailer =============================>>

  $scope.sendMail = function(email) {
    // console.log('email', email)
    service.sendMail(email).then(function(result) {
      if (!result) {
        console.error('Invalid Email');
        $scope.thankYou = 'Invalid Email'
      } else {
        console.log('message sent')
        $scope.thankYou = "thank you"
      }
    })
  }
  $scope.email_list = 'Email Address'

  $scope.addToList = function(email) {
    service.addToList(email).then(function(result) {
      if (!result) {
        console.error('Invalid Email');
        $scope.email_list = 'Invalid Email'
      } else {
        console.log('message sent')
        $scope.email_list = "thank you"
      }
    })
  }

  // <<====================================== Parts =================================>>
    $scope.getParts = function() {
      service.getParts().then(function(parts) {
        // console.log(parts)
        $scope.parts = parts.data
      })
    }
        $scope.getParts()


  // <<================================= SHOPING ==========================================>>
    let cart = [];
    $scope.addToCart = (part) => {
      cart.push(part);
      $scope.cart = cart
    }

})
