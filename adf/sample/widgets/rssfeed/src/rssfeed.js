'use strict';

angular.module('adf.widget.rssfeed', ['adf.provider', 'feeds'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('rssfeed', {
        title: 'rssfeed',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/rssfeed/src/view.html',
        controller: 'rssfeedController',
        controllerAs: 'rssfeed',
        edit: {
          templateUrl: '{widgetsPath}/rssfeed/src/edit.html'
        },
        config: {
          height: '420px',
          rssurl: "https://jira.digitaladrenalin.net/activity?maxResults=5&title=undefined"
        }
      });
  })
  .controller('rssfeedController', function($sce, config){
    if (config.rssurl){
      this.rssurl = $sce.trustAsResourceUrl(config.rssurl);
    }
  });
