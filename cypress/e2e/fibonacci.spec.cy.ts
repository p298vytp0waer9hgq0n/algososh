import { circleLetter } from "./constants";

describe('Фибоначчи', () => {
    beforeEach(() => {
        cy.visit('fibonacci');
        cy.get('button').contains('Рассчитать').as('button');
    });

    it('если в инпуте пусто, кнопка "Рассчитать" недоступна', () => {
        cy.get('input').should('be.empty');
        cy.get('@button').should('be.disabled');
        cy.get('input').type('19');
        cy.get('@button').should('be.enabled');
    });
    
    it('числа генерируются корректно', () => {
        cy.clock();
        cy.get('input').type('19');
        cy.get('@button').click();
        cy.tick(500*20);
        cy.get(circleLetter).as('numbers');
        cy.get('@numbers').then(($numbers) => {
            expect($numbers[0].textContent).to.eq($numbers[1].textContent).to.eq('1')
            for (let i = 2; i < 20; i++) {
                const one = parseInt($numbers[i - 1].textContent);
                const two = parseInt($numbers[i - 2].textContent);
                expect($numbers[i].textContent).to.eq(String(one + two));
            }
        });
    });
})