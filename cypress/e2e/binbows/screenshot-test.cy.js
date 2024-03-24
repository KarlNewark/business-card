describe('Business Card Screenshot Test for binbows', () => {
    it('Visits the home page and takes a screenshot', () => {
        cy.visit('http://127.0.0.1:8080/', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'userAgent', {
                    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                    writable: true
                });
                Object.defineProperty(win.navigator, 'platform', {
                    value: 'Win32',
                    writable: true
                });
            },
        });

        cy.wait(10000).compareSnapshot({
            name: 'binbows-loaded',
            cypressScreenshotOptions: {
                disableTimersAndAnimations: false
            }
        });
    });

});
