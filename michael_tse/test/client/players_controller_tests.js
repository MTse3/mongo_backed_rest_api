require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('Player controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('mlbplayer'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('PlayersController', {$scope:$scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe ('object');
    expect(Array.isArray($scope.players)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('PlayersController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/player').respond(200, [{_id: 1, firstName: 'Jon', lastName: 'Dowd'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.players[0].firstName).toBe('Jon');
      expect($scope.players[0].lastName).toBe('Dowd');
    });

    it('should be able to create a new player', function() {
      $httpBackend.expectPOST('/api/player', {firstName: 'Pablo', lastName: 'Sanchez', position: 'util', number: '0', team: 'free_agent', bat: 'right', throwing: 'right'}).respond(200, {firstName: 'something random', lastName: 'something random'});
      expect($scope.players.length).toBe(0);
      expect($scope.newPlayer).toEqual($scope.defaults);
      $scope.newPlayer.firstName = 'Alex';
      $scope.create($scope.newPlayer);
      $httpBackend.flush();
      expect($scope.players[0].firstName).toBe('something random');
      expect($scope.newPlayer).toEqual($scope.defaults);
    });

    it('should be able to update a player', function() {
      var player = { firstName: 'Jon', lastName: 'Dowd',_id: 1, editing: true};
      $httpBackend.expectPUT('/api/player/1', player).respond(200);
      $scope.updatePlayer(player);
      $httpBackend.flush();
      expect(player.editing).toBe(false);
    })

    it('should be able to delete a player', function() {
      var player = { firstName: 'Jon', lastName: 'Dowd',_id: 1, editing: true};
      $scope.players = [player];
      $httpBackend.expectDELETE('/api/player/1', player).respond(200);
      expect($scope.players.length).toBe(0);
      expect($scope.players.indexOf(player)).toBe(-1);
    });

  });

});
