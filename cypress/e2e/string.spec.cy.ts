import { changingStyle, circleCircle, circleLetter, defaultStyle, modifiedStyle } from "./constants";

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
        let word = 'blah';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i). contains(word[i]);
        }
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
        });
        cy.tick(1000);
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i). contains(word[i]);
        }
        cy.get(circleCircle).each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', changingStyle);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', defaultStyle);
            }
        });
        cy.tick(1000);
        word = 'hlab';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i). contains(word[i]);
        }
        cy.get(circleCircle).each(($circle, $index) => {
            if ($index === 0 || $index === 3) {
                cy.wrap($circle).should('have.attr', 'class').and('match', modifiedStyle);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', changingStyle);
            }
        });
        cy.tick(1000);
        word = 'halb';
        for (let i = 0; i < 4; i++) {
            cy.get(circleLetter).eq(i). contains(word[i]);
        }
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', modifiedStyle);
        });
    })
});