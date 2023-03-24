import { circleCircle, circleContent, circleHead, circleLetter, circleTail } from "./constants";

describe('Список', () => {
    beforeEach(() => {
        cy.clock();
        cy.visit('http://localhost:3000/algososh/list');
    })
        
    it('рандомный список отрисовывается корректно', () => {
        cy.get(circleContent).should('have.length.at.least', 4);
        cy.get(circleLetter).not('be.empty');
        cy.get(circleHead).eq(0).contains('head');
        cy.get(circleTail).last().contains('tail');
    });
    
    it('элемент корректно добавляется в head', () => {
        cy.get('input').eq(0).type('blah');
        cy.get('button').contains('Добавить в head').click();
        cy.get(circleContent).then(($chain) => {
            const length = $chain.length;
            cy.tick(500);
            cy.get(circleContent).should('have.length', length + 1);
        });
        cy.get(circleCircle).eq(0).should('have.attr', 'class').and('match', /circle_modified/);
        cy.get(circleLetter).eq(0).contains('blah');
        cy.tick(500);
        cy.clock().invoke('restore');
        cy.get(circleCircle).eq(0).should('have.attr', 'class').and('match', /circle_default/);
    });

    it('элемент корректно добавляется в tail', () => {
        cy.clock();
        cy.get('input').eq(0).type('blah');
        cy.get('button').contains('Добавить в tail').click();
        cy.get(circleContent).then(($chain) => {
            const length = $chain.length;
            cy.tick(500);
            cy.get(circleContent).should('have.length', length + 1);
        });
        cy.get(circleCircle).last().should('have.attr', 'class').and('match', /circle_modified/);
        cy.get(circleLetter).last().contains('blah');
        cy.tick(500);
        cy.clock().invoke('restore');
        cy.get(circleCircle).last().should('have.attr', 'class').and('match', /circle_default/);
    });
    
    it('элемент корректно добавляется по индексу', () => {
        const index = 2;
        cy.get('input').eq(0).type('blah');
        cy.get('input').eq(1).type(String(index));
        cy.get('button').contains('Добавить по индексу').click();
        for (let i = 0; i <= index; i++) {
            cy.tick(500);
            cy.get(circleCircle).not('div[class*="circle_small"]').each(($circle, $currentIndex) => {
                if ($currentIndex < i) {
                    if ($currentIndex === 0) cy.wrap($circle).siblings('div').contains('head');
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_changing/);
                } else if ($currentIndex > i) {
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
                } else {
                    cy.wrap($circle.parent()).within(() => {
                        cy.get(circleCircle).eq(1).should('have.attr', 'class').and('match', /circle_default/);
                        cy.get('div[class*="circle_small"]').should('have.attr', 'class').and('match', /circle_changing/);
                        cy.get('div[class*="circle_small"]').children('p').contains('blah');
                    });
                }
            });
        }
        cy.get(circleCircle).not('div[class*="circle_small"]').then(($chain) => {
            const length = $chain.length;
            cy.tick(500);
            cy.get(circleCircle).should('have.length', length + 1);
        });
        cy.get(circleCircle).each(($circle, $currentIndex) => {
            if ($currentIndex < index) {
                if ($currentIndex === 0) cy.wrap($circle).siblings('div').contains('head');
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_changing/);
            } else if ($currentIndex > index) {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
            } else {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_modified/);
                cy.wrap($circle).children('p').contains('blah');
            }
        });
        cy.tick(500);
        cy.clock().invoke('restore');
        cy.get(circleCircle).each(($circle) => {
            cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
        });
    });
    
    it('элемент корректно удаляется из head', () => {
        cy.get(circleContent).eq(0).children(circleCircle).children('p').invoke('text').then(($text) => {
            cy.get('button').contains('Удалить из head').click();
            cy.get(circleContent).eq(0).within(($content) => {
                cy.get(circleCircle).eq(0).children('p').should('be.empty');
                cy.wrap($content).children(circleTail).children(circleContent).children(circleCircle).should('have.attr', 'class').and('match', /circle_changing/);
                cy.get(circleCircle).eq(1).children('p').contains($text);
            });
            cy.get(circleCircle).not('div[class*="circle_small"]').then(($chain) => {
                const length = $chain.length;
                cy.tick(500);
                cy.clock().invoke('restore');
                cy.get(circleCircle).should('have.length', length - 1);
                cy.get(circleCircle).each(($circle) => {
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
                });
            });
        });
    });

    it('элемент корректно удаляется из tail', () => {
        cy.get(circleContent).last().children(circleCircle).children('p').invoke('text').then(($text) => {
            cy.get('button').contains('Удалить из tail').click();
            cy.get(circleCircle).not('div[class*="circle_small"]').last().parent('div').within(($content) => {
                cy.get(circleCircle).eq(0).children('p').should('be.empty');
                cy.wrap($content).children(circleTail).children(circleContent).children(circleCircle).should('have.attr', 'class').and('match', /circle_changing/);
                cy.get(circleCircle).eq(1).children('p').contains($text);
            });
            cy.get(circleCircle).not('div[class*="circle_small"]').then(($chain) => {
                const length = $chain.length;
                cy.tick(500);
                cy.clock().invoke('restore');
                cy.get(circleCircle).should('have.length', length - 1);
                cy.get(circleCircle).each(($circle) => {
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
                });
            });
        });
    });

    it('элемент корректно удаляется по индексу', () => {
        const index = 2;
        cy.get('input').eq(1).type(String(index));
        cy.get('button').contains('Удалить по индексу').click();
        for (let i = 0; i <= index; i++) {
            cy.tick(500);
            cy.get(circleCircle).each(($circle, $currentIndex) => {
                if ($currentIndex < i) {
                    if ($currentIndex === 0) cy.wrap($circle).siblings('div').contains('head');
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_changing/);
                } else {
                    cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
                }
            });
        }
        cy.get(circleContent).eq(index).children(circleCircle).children('p').invoke('text').then(($text) => {
            cy.tick(500);
            cy.get(circleCircle).not('div[class*="circle_small"]').eq(index).parent('div').within(($content) => {
                cy.get(circleCircle).eq(0).should('have.attr', 'class').and('match', /circle_modified/);
                cy.get(circleCircle).eq(0).children('p').should('be.empty');
                cy.wrap($content).children(circleTail).children(circleContent).children(circleCircle).should('have.attr', 'class').and('match', /circle_changing/);
                cy.get(circleCircle).eq(1).children('p').contains($text);
            });
        });
        cy.get(circleCircle).not('div[class*="circle_small"]').then(($chain) => {
            const length = $chain.length;
            cy.tick(500);
            cy.clock().invoke('restore');
            cy.get(circleCircle).should('have.length', length - 1);
            cy.get(circleCircle).each(($circle) => {
                cy.wrap($circle).should('have.attr', 'class').and('match', /circle_default/);
            });
        });
    });
});