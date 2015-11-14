'use strict';

angular.module('adf.widget.mattermost', ['adf.provider', 'ngSanitize'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('mattermost', {
        title: 'mattermost',
        description: 'Chat Widget for mattermost',
        templateUrl: '{widgetsPath}/mattermost/src/mmview.html',
        controller: 'mattermostCtrl',
        reload: true,
        resolve: {
          data: function(mattermostService, config){
            if (config.jiraproject != null && config.jiraserver != null){ }
            else
            {
              config.jiraproject = "project-10000";
              config.jiraserver = "https://jira.digitaladrenalin.net";
            }

            return mattermostService.get(config.jiraproject, config.jiraserver);
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/mattermost/src/mmedit.html'
        }
      });
  }).service('mattermostService', function($q, $http){
    return {
      get: function(jiraproject, jiraserver){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: "https://chat.digitaladrenalin.net/api/v1/channels/gpxucn1bp3ra3ci7k5szte3eow/posts/0/60?_=1447463294945"
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
  .controller('mattermostCtrl', function($scope, data){
    $scope.mattermost = data;
  });
