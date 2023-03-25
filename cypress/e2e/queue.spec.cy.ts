import { changingStyle, circleCircle, circleContent, circleHead, circleLetter, circleTail, defaultStyle } from "./constants";

describe('Очередь', () => {
    beforeEach(() => {
        cy.visit('queue');
        cy.get('button').contains('Добавить').as('addButton');
        cy.get('button').contains('Удалить').as('deleteButton');
        cy.get('button').contains('Очистить').as('clearButton');
    });
    
    function fill() {
        cy.get('input').type('blah');
        cy.get('@addButton').click();
        cy.tick(500);
        cy.get('input').type('bleh');
        cy.get('@addButton').click();
        cy.tick(500);
    }

    it('если в инпуте пусто, кнопка добавления недоступна', () => {
        cy.get('input').should('be.empty');
        cy.get('@addButton').should('be.disabled');
        cy.get('input').type('blah');
        cy.get('@addButton').should('be.enabled');
    });
        
    it('добавление елемента в очередь работает корректно', () => {
        cy.clock();
        cy.get('input').type('bleh');
        cy.get('@addButton').click();
        cy.get(circleContent).eq(0).within(() =>  {
            cy.get(circleCircle).should('have.attr', 'class').and('match', changingStyle);
            cy.tick(500);
            cy.get(circleCircle).should('have.attr', 'class').and('match', defaultStyle);
            cy.get(circleCircle).children('p').contains('bleh');
            cy.get(circleHead).contains('head');
            cy.get(circleTail).contains('tail');
        });
        cy.get('input').type('blah');
        cy.get('@addButton').click();
        cy.get(circleContent).eq(0).within(() => {
            cy.get(circleHead).contains('head');
            cy.get(circleTail).should('be.empty');
        });
        cy.get(circleContent).eq(1).within(() => {
            cy.get(circleCircle).should('have.attr', 'class').and('match', changingStyle);
            cy.tick(500);
            cy.get(circleCircle).should('have.attr', 'class').and('match', defaultStyle);
            cy.get(circleCircle).children('p').contains('blah');
            cy.get(circleHead).should('be.empty');
            cy.get(circleTail).contains('tail');
        });
    });
    
    it('удаление елемента из очереди работает корректно', () => {
        cy.clock();
        fill();
        cy.get('@deleteButton').click();
        cy.get(circleCircle).eq(0).should('have.attr', 'class').and('match', changingStyle);
        cy.tick(500);
        cy.get(circleContent).eq(0).within(() => {
            cy.get(circleCircle).should('have.attr', 'class').and('match', defaultStyle);
            cy.get(circleLetter).should('be.empty');
            cy.get(circleTail).should('be.empty');
            cy.get(circleHead).should('be.empty');
        });
        cy.get(circleHead).eq(1).contains('head');
    });
    
    it('очистка очереди работает корректно', () => {
        cy.clock();
        fill();
        fill();
        cy.get('@clearButton').click();
        cy.get(circleCircle).each(($circle, $index) => {
            if ($index < 4) cy.wrap($circle).should('have.attr', 'class').and('match', changingStyle);
        });
        cy.tick(500);
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
        });
        cy.get(circleLetter).each(($letter) => {
            expect($letter).to.be.empty;
        });
        cy.get(circleHead).each(($head) => {
            expect($head).to.be.empty;
        });
        cy.get(circleTail).each(($tail) => {
            expect($tail).to.be.empty;
        });
    })
})