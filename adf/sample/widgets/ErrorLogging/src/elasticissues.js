'use strict';

angular.module('adf.widget.elasticissue', ['adf.provider', 'ngSanitize'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('elasticissue', {
        title: 'elasticissue',
        description: 'Display Issue Stats for elasticsearch',
        templateUrl: '{widgetsPath}/ErrorLogging/src/elasticissuesview.html',
        controller: 'elasticissueCtrl',
        reload: true,
        resolve: {
          data: function(elasticissueService, config){
            if (config.elasticproject != null && config.elasticserver != null){ }
            else
            {
              config.elasticproject = "IC%20Test%20Application";
              config.elasticserver = "http://localhost:9200/";
              config.elasticloglevel = "Error";
            }

            return elasticissueService.get(config.elasticproject, config.elasticserver, config.elasticloglevel);
          }
        },
        edit: {
          templateUrl: '{widgetsPath}/ErrorLogging/src/elasticissuesedit.html'
        }
      });
  }).service('elasticissueService', function($q, $http){
    return {
      get: function(elasticproject, elasticserver, elasticloglevel){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: elasticserver +"_search/?q=AppName:" + elasticproject + "&q=MessageType:" + elasticloglevel
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
  .controller('elasticissueCtrl', function($scope, data){
    console.log(data);
    $scope.elasticissuemetrics = data;
  });
