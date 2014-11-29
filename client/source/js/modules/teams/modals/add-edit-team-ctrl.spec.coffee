define ['angular-mocks', 'Source/modules/teams/modals/add-edit-team-ctrl'], ->
  describe 'AddEditTeamCtrl in app.teams', ->
    describe 'Add team', ->
      scope = null
      TeamResource = null

      beforeEach ->
        module 'app.teams'

        inject ($rootScope, $controller, Team) ->
          scope = $rootScope.$new();
          TeamResource = Team
          subject = $controller 'AddEditTeamCtrl', {
            $scope: scope
            allUsers: []
            team: new Team()
          }

      # TODO write tests for Add Team scenario

    describe 'Edit team', ->
      scope = null
      TeamResource = null

      beforeEach ->
        module 'app.teams'

        inject ($rootScope, $controller, Team) ->
          scope = $rootScope.$new();

          # Mock $close method
          scope.$close = ->

          TeamResource = Team
          subject = $controller 'AddEditTeamCtrl', {
            $scope: scope
            allUsers: []
            team: new Team({
              _id: '123'
              name: 'Test Team'
            })
          }

      describe 'Initializing', ->
        it 'should have Team instance', ->
          expect(scope.team instanceof TeamResource).toBe(true)

      describe 'saveTeam()', ->
        it 'should send backend request', inject ($httpBackend) ->
          $httpBackend.expectPUT('/api/teams/123').respond {}

          scope.saveTeam()

          $httpBackend.flush()

        it 'should send backend request with correct payload', inject ($httpBackend) ->
          scope.team.name = 'Foo Team'

          $httpBackend.expectPUT('/api/teams/123', {
            _id: '123'
            name: 'Foo Team'
          }).respond {
            _id: '123'
            name: 'Foo Team'
          }

          scope.saveTeam()

          $httpBackend.flush()

        it 'should close modal window after successful saving',  ->
          spyOn scope, '$close'

          scope.team.$update = (scb, ecb) ->
            scb()

          scope.saveTeam()

          expect(scope.$close).toHaveBeenCalled()