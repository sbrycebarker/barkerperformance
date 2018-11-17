angular.module('app').controller('mainCtrl', function($scope, $stateParams, service, $state) {
    window.scrollTo(0, 0)

    $scope.home = function() {
        $("html, body").animate({
            scrollTop: "0"
        }, 1000);
        let location = document.getElementById('home');
        $(".nav").css("color", "inherit");
        location.style.color = "#ff2800";
    }


    $scope.about = function() {
        $('main').ready(function() {
            console.log("ready")
            $("html, body").animate({
                scrollTop: "2450"
            }, 1000)
        })
        let location = document.getElementById('home');
        location.style.color = "#ff2800";
        $(".nav").css("color", "inherit");
    }

    function onpage() {
        $("#home").css("color", "inherit");
        $("#products").css("color", "inherit");
        $("#life").css("color", "inherit");
        $("#profile").css("color", "inherit");
        $(document).ready(function() {
            var state = $state.current.name;
            $("#" + state).css("color", "#ff2800");
        })
    }
    onpage();
    $scope.build = function() {
        $("html, body").animate({
            scrollTop: "888"
        }, 500);
    }

    function pizza() {
        console.log('pizza')
        $("html, body").animate({
            scrollTop: "2777"
        }, 1000);
    }

    $scope.menuOpen = function() {
        let menubttn = document.getElementsByClassName('menubttn');
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.width == '0px' || sidebar.style.width == 0) {
            console.log('OPEN');
            sidebar.style.width = '50%';
            menubttn[0].style.visibility = 'visible';
            menubttn[1].style.visibility = 'visible';
            menubttn[2].style.visibility = 'visible';
            menubttn[3].style.visibility = 'visible';
            menubttn[4].style.visibility = 'visible';
            menubttn[5].style.visibility = 'visible';
        } else {
            sidebar.style.width = '0px';
            console.log(menubttn);
            menubttn[0].style.visibility = 'hidden';
            menubttn[1].style.visibility = 'hidden';
            menubttn[2].style.visibility = 'hidden';
            menubttn[3].style.visibility = 'hidden';
            menubttn[4].style.visibility = 'hidden';
            menubttn[5].style.visibility = 'hidden';
        }
    }

    $scope.cartOpen = function() {
        var cartside = document.getElementById('cart-side');
        if (cartside.style.width == '0px' || cartside.style.width == 0) {
            console.log('OPEN');
            cartside.style.width = '500px';
        } else {
            cartside.style.width = '0px';
        }
    }

    $scope.closeCart = function() {
        var cartside = document.getElementById('cart-side');
        cartside.style.width = '0px';
    }
    $scope.user = [];
    $scope.getUser = function() {
        service.getUser().then(function(user) {
            if (user) {
              console.log("getUser()", user);
                $scope.user.push(user);
                $scope.username = user.displayName;
                $scope.user = user;
                $scope.getUsers()
            } else {
                $scope.username = 'LOG IN!';
            }
        })
    }
    $scope.getUser();
    $scope.users = [];
    $scope.currentuser = [];
    $scope.wishlist = [];
    $scope.getUsers = function() {
        service.getUsers().then(function(data) {
            let users = data.data;
            console.log('users', users);
            console.log("USER", $scope.user.user_id);
            $scope.users.push(users);
        let match = users.some( data => data.user_id === $scope.user.user_id)
          if (match) {
            console.log("match", match);
            let wishlist = data.data[0].wishlist
            // console.log("wishlist", wishlist)
            // $scope.wishlist = wishlist;
            // $scope.wishlist.push(wishlist);
          } else {
            service.addUser($scope.user).then(function(newUser) {
                if (newUser) {
                    console.log("newUser", newUser);
                    $scope.newUser = newUser;
                }
            })
          }
        })
    }

    $scope.contact = function(data) {
        if (!data.email) {
            console.error("Please enter valid email!");
            $scope.invalidEmail = "Please enter valid email";
        } else {
            console.log("data", data);
            document.getElementsByClassName('input').value = '';
        }
    }
    $scope.logout = service.logout;

    $scope.sendMail = function(email) {
        if (email.email) {
            service.sendMail(email).then(function(result) {
                if (!result) {
                    console.error('Invalid Email');
                    $scope.error = 'Invalid Email';
                } else {
                    console.log('message sent');
                    $scope.thankYou = "thank you!!";
                    document.getElementById("sec-6-box1").reset();
                }
            })
        } else {
            $scope.error = 'Invalid Email';
            $scope.required = 'required'
        }
    }
    $scope.email_list = 'Email Address';
    $scope.addToList = function(email) {
        service.addToList(email).then(function(result) {
            if (!result) {
                $scope.email_list = 'Invalid Email';
            } else {
                $scope.email_list = "thank you!!";
            }
        })
    }


    let cart = [];
    let total = [];
    $scope.addToCart = (part) => {
        cart.push(part);
        total.push(part.part.price);
        $scope.cart = cart;
        console.log('cart', cart[0]);
        console.log("total $",total);
        let adder = (a, b) => a + b;
        $scope.total = total.reduce(adder);
        console.log($scope.total);
    };

    let wishlist = [];
    $scope.addtoWishList = (part) => {
      wishlist.push(part);
      $scope.wishlist = wishlist;
      userid = $scope.users[0][0]._id;
      userlist = $scope.users[0][0].wishlist;
      console.log("user", userlist);
      console.log("list", wishlist[0].wishlist);
      let partMatch = userlist.some( userlist => userlist === wishlist[0].wishlist)
      if (partMatch) {
        console.log('found in list')
        $scope.wishlist = "Already on wishlist"
      } else {
        let newishlist = [userid, wishlist[0]];
        service.addWishList(newishlist).then((newlist) =>{
          console.log("user + wishilist", newlist);
          $scope.wishlist = "Added to list"
        })
      }
      // console.log("lalala", $scope.users[0]);
      // console.log("wish part", part);

    }
})
