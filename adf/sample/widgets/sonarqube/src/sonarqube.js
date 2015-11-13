'use strict';

angular.module('adf.widget.sonarqube', ['adf.provider', 'ngSanitize'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('sonarqube', {
        title: 'sonarqube',
        description: 'Display Issue Status Metrics for SonarQube',
        templateUrl: '{widgetsPath}/SonarQube/src/sonarqubeview.html',
        controller: 'sonarqubeCtrl',
        reload: true,
        resolve: {
          data: function(sonarqubeService, config){
            if (config.jiraproject != null && config.jiraserver != null){ }
            else
            {
              config.sonarproject = "project-10000";
              config.sonarserver = "https://jenkins.digitaladrenalin.net:9000";
            }

            return sonarqubeService.get(config.sonarproject, config.sonarserver);
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/SonarQube/src/sonarqubeedit.html'
        }
      });
  }).service('sonarqubeService', function($q, $http){
    return {
      get: function(sonarproject, sonarserver){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: sonarserver + "/api/resources/?metrics=ncloc,coverage,sqale_index&resource=" + sonarproject
        }).success(function(data){
              deferred.resolve(data);
          })
          .error(function(error){
            console.log(error);
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  })
  .controller('sonarqubeCtrl', function($scope, data){
    $scope.sonarqubemetrics = data;
  });
