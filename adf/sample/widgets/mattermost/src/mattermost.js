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
            if (config.mattermostchat != null && config.mattermosturl != null){ }
            else
            {
              config.mattermostchat = "gpxucn1bp3ra3ci7k5szte3eow";
              config.mattermosturl = "https://chat.digitaladrenalin.net";
            }

            return mattermostService.get(config.mattermostchat, config.mattermosturl);
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/mattermost/src/mmedit.html'
        }
      });
  }).service('mattermostService', function($q, $http){
    return {
      get: function(mattermostchat, mattermosturl){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: mattermosturl + "/api/v1/channels/" + mattermostchat + "/posts/0/60"
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
