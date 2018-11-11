angular.module('app').controller('partsCtrl', function($scope, service, $state) {
    function createSlick() {
        $('.slick').slick({
            centerMode: !0,
            infinite: !0,
            responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: !0,
                    dots: !0
                }
            }, {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !0
                }
            }]
        })
    }
    createSlick()
    $scope.getParts = function() {
        let newPart = [];
        service.getParts().then(function(parts) {
          console.log("go parts", parts)
            $scope.parts = parts.data
            for (var i = 0; i < parts.data.length; i++) {
                if (parts.data[i].new === !0) {
                    newPart.push(parts.data[i])
                }
            }
            $scope.newpart = newPart
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
})
