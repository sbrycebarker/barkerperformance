angular.module('app',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/')
      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: "../html/main.html",
        controller: "mainCtrl"
      })
      .state('about', {
        url: "../html/about.html",
        controller: "mainCtrl"
      })
  })
