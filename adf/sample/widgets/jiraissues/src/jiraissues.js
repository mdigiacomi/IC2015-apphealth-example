'use strict';

angular.module('adf.widget.jiraissues', ['adf.provider', 'ngSanitize'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('jiraissues', {
        title: 'jiraissues',
        description: 'Display Issue Status Metrics for Jira Project',
        templateUrl: '{widgetsPath}/jiraissues/src/jiraissuesview.html',
        controller: 'jiraissuesCtrl',
        reload: true,
        resolve: {
          data: function(jiraissuesService, config){
            config.location=" ";
            if (config.location != null){
              return jiraissuesService.get(config.location);
            }
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/jiraissues/src/jiraissuesedit.html'
        }
      });
  }).service('jiraissuesService', function($q, $http){
    return {
      get: function(location){
        var deferred = $q.defer();
        var url = location;
        $http({
          method: 'GET',
          url: "https://jira.digitaladrenalin.net/rest/gadget/1.0/stats/generate?includeResolvedIssues=true&projectOrFilterId=project-10000&sortBy=natural&sortDirection=asc&statType=statuses"
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
  .controller('jiraissuesCtrl', function($scope, data){
    $scope.jiraissues = data;
  });
