describe('Business Card Screenshot Test for whack', () => {
  it('Visits the home page and takes a screenshot', () => {
    cy.visit('http://127.0.0.1:8080/');
    cy.wait(10000).compareSnapshot({
      name: 'whack-loaded',
      cypressScreenshotOptions: {
        disableTimersAndAnimations: false
      }
    });

  });

});