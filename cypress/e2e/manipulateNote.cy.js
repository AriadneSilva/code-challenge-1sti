
describe('Acessando página inicial e manipulando as notas', () => {

  it('Manipulando notas', () => {


    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');
    cy.wait(2000)

    cy.get('[data-testid="btnNewNote"]').click();
    cy.wait(2000)

    cy.get('[data-testid="btnSaveNote"]').click();
    cy.wait(2000)

    cy.get('[data-testid="title"]')
    .type('Fazer compras no supermercado');

    cy.get('[data-testid="category"]')
    .select("Personal")

    cy.get('[data-testid="description"]')
    .type('Realizar a compra de: Alface, mamão, pão, carne, queijo e suco');

    cy.wait(2000)
    cy.get('[data-testid="btnSaveNote"]').click();

    cy.wait(2000)
    cy.get('[data-testid="btnNewNote"]').click();

    cy.get('[data-testid="title"]')
    .type('Reunião de alinhamento');
    cy.get('[data-testid="category"]')
    .select("Work")
    cy.get('[data-testid="description"]')
    .type('Alinhar expectativas e entrega com Carla e Maurício');
    cy.wait(2000)

    cy.get('[data-testid="btnSaveNote"]').click();
    cy.wait(2000)
    cy.get('[data-testid="btnEditNote-2"]').click();
    cy.wait(2000)
    cy.get('[data-testid="description"]').clear()
    cy.wait(2000)

    cy.get('[data-testid="description"]').type('Alinhar expectativas e entrega com Carla,Maurício e Lucas');
    cy.wait(2000)
    cy.get('[data-testid="btnSaveNote"]').click();
    cy.wait(2000)
    cy.get('[data-testid="btnConfirmDeleteNote-1"]').click();
    cy.wait(2000)

    cy.get('[data-testid="btnCancelDeleteNote-1"]').click();
    cy.wait(2000)

    cy.get('[data-testid="checkNote-1"]').click()


    cy.wait(2000)
    cy.get('[data-testid="btnNewNote"]').click();

    cy.get('[data-testid="title"]')
    .type('Faxina semanal');
    cy.get('[data-testid="category"]')
    .select("Home")
    cy.get('[data-testid="description"]')
    .type('Entrar em contato com Rosa para realizar a faxina da semana');
    cy.wait(2000)

    cy.get('[data-testid="btnSaveNote"]').click();
    cy.wait(2000)

    cy.get('[data-testid="checkNote-1').uncheck()
    cy.wait(2000)

    cy.get('[data-testid="search"]')
    .type('alinhamento');
    cy.wait(2000)

    cy.get('[data-testid="search"]').clear();
    cy.wait(2000)


    cy.get('[data-testid="btnConfirmDeleteNote-2"]').click();
    cy.wait(2000)

    cy.get('[data-testid="btnDeleteNote-2"]').click();
    cy.wait(2000)



  });
});
