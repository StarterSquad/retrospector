define ['angular-mocks', 'Source/modules/retrospectives/view/retrospectives-view-ctrl'], ->
  xdescribe 'RetrospectivesViewCtrl in app.retrospectives.view', ->
    scope = null
    RetrospectiveResource = null

    beforeEach ->
      module 'app.retrospectives.view', ($provide) ->
        $provide.value 'socket',
          emit: jasmine.createSpy()

      inject ($rootScope, $controller, Retrospective) ->
        scope = $rootScope.$new();

        RetrospectiveResource = Retrospective

        $controller 'RetrospectivesViewCtrl', {
          $scope: scope
          retrospective: new Retrospective({
            _id: '123'
            name: 'Test Team'
          })
        }

    describe 'Initializing', ->
      it 'should have Retrospective instance', ->
        expect(scope.retrospective instanceof RetrospectiveResource).toBe(true)

      it 'should emit user:joinToRetrospective with proper data', inject((socket) ->
        expect(socket.emit).toHaveBeenCalled()
      )