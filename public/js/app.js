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
        url: "/products",
        templateUrl: "../html/products.html",
        controller: "mainCtrl"
      })
      .state('life', {
        url: "/life",
        templateUrl: "../html/life.html",
        controller: "mainCtrl"
      })
  })
