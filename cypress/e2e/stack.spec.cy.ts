enum TestNames {
    'кнопка должна быть неактивна при пустом инпуте',
    'добавление елементов работает корректно',
    'удаление елементов работает корректно',
    'кнопка очистки стека работает корректно'
}

describe('Стек', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/algososh/stack');
        cy.get('button').contains('Добавить').as('addButton');
        cy.get('button').contains('Удалить').as('removeButton');
        cy.get('button').contains('Очистить').as('clearButton');
        cy.clock();
        if (Cypress.currentTest.title === TestNames[2] || Cypress.currentTest.title === TestNames[3]) {
            cy.get('input').type('blah');
            cy.get('@addButton').click();
            cy.tick(500);
            cy.get('input').type('bleh');
            cy.get('@addButton').click();
            cy.tick(500);
        }
    });
        
    it(TestNames[0], () => {
        cy.get('input').should('be.empty');
        cy.get('@addButton').should('be.disabled');
    });
    
    it(TestNames[1], () => {
        cy.get('input').type('bleh');
        cy.get('@addButton').click();
        const element = cy.get('div[class*="circle_content"]');
        element.within(() => {
            cy.get('div[class*="circle_head"]').contains('top');
            cy.get('div[class*="circle_circle"]').should('have.attr', 'class').and('match', /circle_changing/);
            cy.get('p[class*="circle_index"]').contains('0');
            cy.get('p[class*="circle_letter"]').contains('bleh');
            cy.tick(500);
            cy.get('div[class*="circle_circle"]').should('have.attr', 'class').and('match', /circle_default/);
        });
        cy.get('input').type('blah');
        cy.get('@addButton').click();
        const newElement = cy.get('div[class*="circle_content"]').eq(1);
        element.within(() => {
            cy.get('div[class*="circle_head"]').should('be.empty');
        });
        newElement.within(() => {
            cy.get('div[class*="circle_head"]').contains('top');
            cy.get('div[class*="circle_circle"]').should('have.attr', 'class').and('match', /circle_changing/);
            cy.get('p[class*="circle_index"]').contains('1');
            cy.get('p[class*="circle_letter"]').contains('blah');
            cy.tick(500);
            cy.get('div[class*="circle_circle"]').should('have.attr', 'class').and('match', /circle_default/);
        });
    });
    
    it(TestNames[2], () => {
        cy.get('@removeButton').click();
        cy.get('div[class*="circle_circle"]').eq(1).should('have.attr', 'class').and('match', /circle_changing/);
        cy.tick(500);
        cy.get('div[class*="circle_content"]').should('have.length', 1);
    });
    
    it(TestNames[3], () => {
        cy.get('@clearButton').click();
        cy.get('div[class*="circle_content"]').should('not.exist');        
    });
});