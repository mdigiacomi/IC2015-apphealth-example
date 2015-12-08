/*
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

angular.module('sample', [
  'adf', 'adf.structures.base', 'adf.widget.iframe',
  'adf.widget.randommsg', 'adf.widget.weather', 'adf.widget.rssfeed', 'adf.widget.jiraissues', 'adf.widget.sonarqube', 'adf.widget.elasticissue', 'adf.widget.mattermost',
  'LocalStorageModule',  'ngRoute'
])
.config(function(dashboardProvider, $routeProvider, localStorageServiceProvider, $httpProvider){
  dashboardProvider.widgetsPath('widgets/');
  localStorageServiceProvider.setPrefix('adf');

  $routeProvider.when('/', {
    templateUrl: 'partials/sample.html',
    controller: 'sample01Ctrl'
  })
  .otherwise({
    redirectTo: '/'
  });
  
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

})
.controller('navigationCtrl', function($scope, $location){

  $scope.navCollapsed = true;

  $scope.toggleNav = function(){
    $scope.navCollapsed = !$scope.navCollapsed;
  };

  $scope.$on('$routeChangeStart', function() {
    $scope.navCollapsed = true;
  });

  $scope.navClass = function(page) {
    var currentRoute = $location.path().substring(1) || 'Sample 01';
    return page === currentRoute || new RegExp(page).test(currentRoute) ? 'active' : '';
  };

}).controller('sample01Ctrl', function($scope, localStorageService){

    var name = 'New Dashboard';
    var model = localStorageService.get(name);

    $scope.name = name;
    $scope.model = model;
    $scope.collapsible = false;
    $scope.maximizable = false;

    $scope.$on('adfDashboardChanged', function (event, name, model) {
        localStorageService.set(name, model);
    });
});
