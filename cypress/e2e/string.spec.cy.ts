import { circleCircle, circleLetter } from "./constants";

describe('Строка', () => {
    beforeEach(() => {
        cy.visit(`recursion`);
        cy.get('button').contains('Развернуть').as('button');
    })
    
    it('если в инпуте пусто, кнопка добавления недоступна', () => {
        cy.get('input').should('be.empty');
        cy.get('@button').should('be.disabled');
        cy.get('input').type('blah');
        cy.get('@button').should('be.enabled');
    });
    
    it('анимация должна работать правильно', () => {
        cy.clock();
        cy.get('input').type('blah');
        cy.get('@button').click();
        cy.get(circleCircle).as('circles');
        cy.get(circleLetter).as('letters');
        let word = 'blah';
        for (let i = 0; i < 4; i++) {
            cy.get('@letters').eq(i). contains(word[i]);
        }
        cy.get('@circles').each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
        });
        cy.tick(1000);
        for (let i = 0; i < 4; i++) {
            cy.get('@letters').eq(i). contains(word[i]);
        }
        cy.get('@circles').each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_changing/);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
            }
        });
        cy.tick(1000);
        word = 'hlab';
        for (let i = 0; i < 4; i++) {
            cy.get('@letters').eq(i). contains(word[i]);
        }
        cy.get('@circles').each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_modified/);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_changing/);
            }
        });
        cy.tick(1000);
        word = 'halb';
        for (let i = 0; i < 4; i++) {
            cy.get('@letters').eq(i). contains(word[i]);
        }
        cy.get('@circles').each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', /circle_modified/);
        });
    })
});