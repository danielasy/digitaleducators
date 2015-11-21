'use strict';

angular.module('digitaleducatorsApp')
  .controller('QuestionsCtrl', function ($scope, $http, $location, socket) {
    
    $scope.newQuestion = '';
    $scope.tags = [{ name: '' }];

    $http.get('/api/questions').success(function (questions){
      $scope.questions = questions;
      console.log($scope.questions);
    });

    $scope.addComment = function(){
      var tagsArray = [];
      cleanEmptyTags().map(function(value){
        tagsArray.push(value.name);
      });

      $http.post('/api/questions', {
        title: $scope.title,
        text: $scope.newQuestion,
        tags: tagsArray
      });
      $scope.newQuestion = "";
      $scope.tags = [{ name: '' }];

      $location.path('/questions');
      //TODO
      //redirect to the question
    };

    $scope.addTag = function($event){
      $event.preventDefault;

      $scope.tags = cleanEmptyTags();
      $scope.tags.push({
        name: ''
      });

    };

    function cleanEmptyTags(){
      return $scope.tags.filter(function (tag){
        if (tag.name.length <= 0) return false;
        return true;
      });
    }

  });
