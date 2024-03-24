describe('Business Card Screenshot Test for whack', () => {
  it('Visits the home page and takes a screenshot', () => {
    cy.visit('http://127.0.0.1:8080/', {
      onBeforeLoad(win) {
        // Define stubs for userAgent and platform
        Object.defineProperty(win.navigator, 'userAgent', {value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36', writable: true});
        Object.defineProperty(win.navigator, 'platform', {value: 'MacIntel', writable: true});
      },
    });
    cy.wait(10000).compareSnapshot({
      name: 'whack-loaded',
      cypressScreenshotOptions: {
        disableTimersAndAnimations: false
      }
    });

  });

});