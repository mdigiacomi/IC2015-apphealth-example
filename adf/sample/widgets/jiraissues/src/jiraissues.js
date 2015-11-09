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
            if (config.jiraproject != null && config.jiraserver != null){ }
            else
            {
              config.jiraproject = "project-10000";
              config.jiraserver = "https://jira.digitaladrenalin.net";
            }

            return jiraissuesService.get(config.jiraproject, config.jiraserver);
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/jiraissues/src/jiraissuesedit.html'
        }
      });
  }).service('jiraissuesService', function($q, $http){
    return {
      get: function(jiraproject, jiraserver){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: jiraserver + "/rest/gadget/1.0/stats/generate?includeResolvedIssues=true&projectOrFilterId=" + jiraproject + "&sortBy=natural&sortDirection=asc&statType=statuses"
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
