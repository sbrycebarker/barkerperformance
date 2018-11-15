angular.module('app').controller('partsCtrl', function($scope, service, $state) {

    $scope.getParts = function() {
        let newParts = [];
        service.getParts().then(function(parts) {
          console.log("parts", parts)
            $scope.parts = parts.data
            for (var i = 0; i < parts.data.length; i++) {
                if (parts.data[i].new === !0) {
                    newParts.push(parts.data[i])
                }
            }
            console.log('newParts', newParts)
            $scope.newParts = newParts
        })
    }
    $scope.getParts()

    $scope.productView = function() {
        service.getPart().then(function(partMatch) {
            console.log(partMatch)
            $scope.part = partMatch.data
        })
    }
    $scope.productView()

    function createScroll() {
      $(document).ready(function() {

        $('.owl-carousel').owlCarousel(
          {
            loop: true,
            center: true,
            items: 2,
            autoWidth: true,
            // autoplay: true,
            autoplayHoverPause: true
          }
        );
        var owl = $('.owl-carousel');
        owl.owlCarousel();
        $('#prev-arrow').click(function() {
            console.log('next')
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger('prev.owl.carousel', [300]);
        })
        $('#next-arrow').click(function() {
          console.log('next')
            owl.trigger('next.owl.carousel');
        })

      })
    }
    createScroll()

    // let cart = [];
    // $scope.addToCart = (part) => {
    //     cart.push(part);
    //     $scope.cart = cart
    //     console.log('cart', cart[0])
    // }
    // let things = []
})
