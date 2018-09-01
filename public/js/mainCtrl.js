angular.module('app').controller('mainCtrl', function($scope,$stateParams, service, $state) {

window.scrollTo(0, 0)

  function createSlick() {
    $('.slick').slick({
      centerMode: true,
      infinite: true,
      // autoplay: true,
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

  $scope.home = function() {
    $("html, body").animate({
      scrollTop: "0"
    }, 1000)
    let location = document.getElementById('home')
    $(".nav").css("color", "inherit")
    location.style.color = "#ff2800"
  }

  // let info = "part-info";
  // function details() {
  //   info.addEventListener('mouseover', function(event) {
  //     details.style.display = block;
  //   })
  // }

  $scope.about = function() {
    // location.home
    $('main').ready(function() {
      console.log("ready")
      $("html, body").animate({
        scrollTop: "2450"
      }, 1000)
    })
    let location = document.getElementById('home')
    location.style.color = "#ff2800"
    $(".nav").css("color", "inherit")
  }

  function onpage() {
    $("#home").css("color", "inherit")
    $("#products").css("color", "inherit")
    $("#life").css("color", "inherit")
    $("#profile").css("color", "inherit")
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
          // $scope.username = 'LOG IN!';
  $scope.getUser = function() {
    service.getUser().then(function(user) {
      console.log("user", user)
      if (user) {
        $scope.user.push(user)
        $scope.username = user.displayName;
        $scope.user = user
        // console.log("userinfo", $scope.user)
        $scope.getUsers()
      } else {
        $scope.username = 'LOG IN!';
      }
    })

  }
  $scope.getUser();

  $scope.getUsers = function() {
    console.log("user", $scope.user)
    service.getUsers().then(function(data){
      let users = data
      console.log('users', users.data)
      // for (var i in users.data) {
        // if (i.user_id === $scope.user_id) {
        //     console.log("match")
        // } else {
            console.log("addUser")
          service.addUser($scope.user).then(function(newUser) {
            if (newUser) {
              console.log("newUser", newUser)
              $scope.newUser = newUser
            }
          })

          // }
          // service.addUser($scope.user).then(function(newUser) {
          //   if (newUser) {
          //     console.log("newUser", newUser)
          //     $scope.newUser = newUser
          //   }
          // })
          // }
    })
  }

  // $scope.getUsers();

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

        $scope.email_list = 'Invalid Email'
      } else {

        $scope.email_list = "thank you"
      }
    })
  }

  // <<====================================== Parts =================================>>
    $scope.getParts = function() {
      let newPart = [];
      service.getParts().then(function(parts) {
        // console.log(parts)
        $scope.parts = parts.data
        for (var i = 0; i < parts.data.length; i++) {
          if (parts.data[i].new === true ) {
            newPart.push(parts.data[i])
          }
        }
        // console.info("newPart",newPart)
        $scope.newpart = newPart
      })
    }
        $scope.getParts()


  // <<================================= SHOPING ==========================================>>
    let cart = [];
    $scope.addToCart = (part) => {
      cart.push(part);
      $scope.cart = cart;
    }
    let things = []

    $scope.getProduct = function() {
      $scope.pizza = "this"
    }

    $scope.productView = function(){
        service.getPart().then(function(partMatch) {
          console.log(partMatch)
            $scope.part = partMatch.data
      })

  }

    $scope.productView()


})
