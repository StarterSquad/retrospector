describe('Teams', function () {
  "use strict";

  // Login user once
  browser.get('/#/signin');
  element(by.model('email')).sendKeys('max@startersquad.com');
  element(by.model('password')).sendKeys('test');
  element(by.css('form')).submit();

  beforeEach(function () {
    // Go to testing page
    browser.get('/#/teams');
  });

  describe('Add new team', function () {

    beforeEach(function () {
      element(by.css('.team-card.__add-team')).click();
    });

    // TODO write test for Add Team
    /*it('', function () {

     });*/

  });

  describe('Edit team', function () {
    var teamName, editTeamModal;

    beforeEach(function () {
      var teamCardElement = element(by.css('.team-card'));

      teamName = teamCardElement.element(by.binding('team.name')).getText();
      teamCardElement.click();
    });

    it('should open Edit Team modal window', function () {
      editTeamModal = element(by.css('.modal'));

      expect(editTeamModal.isDisplayed()).toBe(true);
    });

    it('should populate team name field properly', function () {
      expect(element(by.model('team.name')).getAttribute('value')).toBe(teamName);
    });

    it('should close modal window after saving', function () {
      editTeamModal.element(by.css('button.save-team')).click();
    });
  });
});