angular.module('app',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/')
      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: "../html/main.html",
        controller: "mainCtrl"
      })
      .state('products', {
        url: "/products.html",
        templateUrl: "../html/products.html",
        controller: "mainCtrl"
      })
  })
