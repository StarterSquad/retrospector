define ['angular-mocks', 'Source/modules/teams/modals/add-edit-team-ctrl'], ->
  describe 'AddEditTeamCtrl in app.teams', ->
    scope = null

    beforeEach ->
      module 'app.teams'

      inject ($rootScope, $controller) ->
        scope = $rootScope.$new();
        subject = $controller 'AddEditTeamCtrl', {
          $scope: scope
          allUsers: []
          team: {}
        }

    # TODO write tests for Add Team scenario

    describe 'Edit team', ->
      describe 'Initializing', ->
        it 'should have Team instance', ->
          expect(scope.team).toEqual(jasmine.any(Object))