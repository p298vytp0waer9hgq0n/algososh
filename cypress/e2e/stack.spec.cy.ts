import { circleCircle, circleContent, circleHead, circleIndex, circleLetter } from "./constants";

describe('Стек', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/algososh/stack');
        cy.get('button').contains('Добавить').as('addButton');
        cy.get('button').contains('Удалить').as('removeButton');
        cy.get('button').contains('Очистить').as('clearButton');
        cy.clock();
    });
        
    function fill() {
        cy.get('input').type('blah');
        cy.get('@addButton').click();
        cy.tick(500);
        cy.get('input').type('bleh');
        cy.get('@addButton').click();
        cy.tick(500);
    }

    it('кнопка должна быть неактивна при пустом инпуте', () => {
        cy.get('input').should('be.empty');
        cy.get('@addButton').should('be.disabled');
    });
    
    it('добавление елементов работает корректно', () => {
        cy.get('input').type('bleh');
        cy.get('@addButton').click();
        const element = cy.get(circleContent);
        element.within(() => {
            cy.get(circleHead).contains('top');
            cy.get(circleCircle).should('have.attr', 'class').and('match', /circle_changing/);
            cy.get(circleIndex).contains('0');
            cy.get(circleLetter).contains('bleh');
            cy.tick(500);
            cy.get(circleCircle).should('have.attr', 'class').and('match', /circle_default/);
        });
        cy.get('input').type('blah');
        cy.get('@addButton').click();
        const newElement = cy.get(circleContent).eq(1);
        element.within(() => {
            cy.get(circleHead).should('be.empty');
        });
        newElement.within(() => {
            cy.get(circleHead).contains('top');
            cy.get(circleCircle).should('have.attr', 'class').and('match', /circle_changing/);
            cy.get(circleIndex).contains('1');
            cy.get(circleLetter).contains('blah');
            cy.tick(500);
            cy.get(circleCircle).should('have.attr', 'class').and('match', /circle_default/);
        });
    });
    
    it('удаление елементов работает корректно', () => {
        fill();
        cy.get('@removeButton').click();
        cy.get(circleCircle).eq(1).should('have.attr', 'class').and('match', /circle_changing/);
        cy.tick(500);
        cy.get(circleContent).should('have.length', 1);
    });
    
    it('удаление елементов работает корректно', () => {
        fill();
        cy.get('@clearButton').click();
        cy.get(circleContent).should('not.exist');        
    });
});