angular.module('app', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/')
    $stateProvider.state('home', {
        url: '/',
        templateUrl: "../html/main.html",
        controller: "mainCtrl"
    }).state('products', {
        url: "/products",
        templateUrl: "../html/products.html",
        controller: "partsCtrl"
    }).state('checkout', {
        url: "/checkout",
        templateUrl: "../html/checkout.html",
        controller: "mainCtrl"
    }).state('profile', {
        url: "/profile/:user",
        templateUrl: "../html/profile.html",
        controller: "mainCtrl"
    }).state('view', {
        url: "/view/:part",
        templateUrl: "../html/view.html",
        controller: "partsCtrl"
    })
})
