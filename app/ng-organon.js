angular.module('plunker', [])

.controller('MainCtrl', function($scope, deckService) {
  $scope.deck = deckService.initDeck();
  $scope.spreadFinished = false;
  $scope.drawnCards = [];
  
  $scope.initSpread = function(spread) {
    $scope.deck = deckService.initDeck();
    if (spread) {
      $scope.placeholders = spread;
    }
  };
  
  $scope.$on('placeholderDrawn', function(evt, id) {
    $scope.drawnCards.push({
      id: id,
      card: deckService.drawCard()
    });
    $scope.isFinished();
  });
  
  $scope.$watchCollection('drawnCards', function(newVal, oldVal) {
  });
  
  $scope.$watch('spreadFinished', function(newVal,oldVal) {
    if (newVal === true) {
      alert("Spread finished.");
    }
  });
  
  $scope.isFinished = function() {
    if ($scope.drawnCards.length === $scope.placeholders.length) {
      $scope.spreadFinished = true;
      $scope.drawnCards.sort(function(a,b) {
        return a.id-b.id;
      });
    }
  };

  $scope.placeholders = [{
    id: 1,
    description: 'The Past',
    drawn: false
  }, {
    id: 2,
    description: 'The Present',
    drawn: false
  }, {
    id: 3,
    description: 'The Future',
    drawn: false
  }];
})

.directive('placeholder', function() {
  return {
    restrict: 'E',
    scope: {
      id: '@placeholderId',
      description: '@placeholderDesc',
      drawn: '=placeholderDrawn'
    },
    template: '<div class="placeholder" ng-class="{inactive:drawn}" ng-click="drawn||fillPlaceholder(id)"><p class="placeholder-id">{{id}}</p><p class="placeholder-description">{{description}}</p><p class="placeholder-description">({{drawn}})</p></div>',
    link: function(scope, element, attributes) {
      scope.fillPlaceholder = function(id) {
        scope.drawn = true;
        scope.$emit('placeholderDrawn', id);
      };
    }
  };
})

.service('deckService', function() {

  this.deck = (function() {
    var arr = [];
    for (var i = 0, len = 77; i <= len; i++) {
      arr.push(i);
    }
    return arr;
  })();

  this.resetDeck = function() {
    this.populateDeck();
    this.shuffleDeck();
  };

  this.populateDeck = function() {
    var incubator = [];
    for (var i = 0, len = 77; i <= len; i++) {
      incubator.push(i);
    }
    this.deck = incubator;
  };

  this.shuffleDeck = function() {
    var j, x, i;
    for (i = this.deck.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = this.deck[i - 1];
      this.deck[i - 1] = this.deck[j];
      this.deck[j] = x;
    }
  };

  this.initDeck = function() {
    this.resetDeck();
    return this.deck;
  };

  this.drawCard = function() {
    return this.deck.pop();
  };
});
