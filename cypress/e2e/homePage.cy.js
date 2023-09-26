
describe('Acessando página inicial', () => {

  it('Acessando o site e fazendo o teste inicial', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');

  });

  it('Acessando as abas para verificar se existe algum conteúdo', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');


    // cy.get('[data-testid="tabNotes"]').trigger('change')

    // cy.get('@tab').siblings('p').should('have.text', '25')
    // cy.get().simulate('change', {target: {value: '2'}});
    // cy.wait(2000)
  });

  it('Clicando no botão para adicionar nova nota', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');

    cy.wait(2000)
    cy.get('[data-testid="btnNewNote"]').click();
    cy.wait(2000)
    cy.get('[data-testid="btnCancelNote"]').click();

    cy.get('[data-testid="tabNotes"]').click();
  });
});
