/* jshint -W117, -W030 */
describe('users routes', function() {
  describe('state', function() {
    var view = 'app/users/users.html';

    beforeEach(function() {
      module('app.users', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state users to url /users ', function() {
      expect($state.href('users', {})).to.equal('/users');
    });

    it('should map /users route to users View template', function() {
      expect($state.get('users').templateUrl).to.equal(view);
    });

    it('of users should work with $state.go', function() {
      $state.go('users');
      $rootScope.$apply();
      expect($state.is('users'));
    });
  });
});
