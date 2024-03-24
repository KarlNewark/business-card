describe('Business Card Screenshot Test for binbows', () => {
    it('Visits the home page and takes a screenshot', () => {

        cy.visit('http://127.0.0.1:8080/'); // Adjust this with the path to your project's homepage

        cy.get('body').invoke('attr', 'class', 'binbows');

        cy.wait(10000).compareSnapshot({
            name: 'binbows-loaded',
            cypressScreenshotOptions: {
                disableTimersAndAnimations: false
            }
        });
    });

});


