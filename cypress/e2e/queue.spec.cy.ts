describe('Очередь', () => {
    before(() => {cy.visit('http://localhost:3000/algososh/queue')});
        
    it('something', () => {
        cy.get('input').type('bleh');
        cy.get('button').contains('Добавить').click();
        const element = cy.get('div[class*="circle_content"]').eq(0);
        element.within(() =>  {
            cy.get('div[class*="circle_circle"]').as('circle');
            cy.get('@circle').should('have.attr', 'class').and('match', /circle_changing/);
            cy.get('@circle').should('have.attr', 'class').and('match', /circle_default/);
            cy.get("@circle").children('p').contains('bleh');
            cy.get('div[class*="circle_head"]').contains('head');
            cy.get('div[class*="circle_tail"]').contains('tail');
        });
    });
})