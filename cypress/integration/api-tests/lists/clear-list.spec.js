describe("Validar o endpoint POST /list/{list_id}/clear", () => {
  let listId;

  before(() => {
    cy.request({
      method: "POST",
      url: "/list",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { name: "Teste da automação", description: "", language: "pt-br" },
    }).then((response) => {
      listId = response.body.list_id;
    });
  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: `list/${listId}`,
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      failOnStatusCode: false,
    });
  });

  it("Validar limpar a lista com sucesso", () => {
    cy.request({
      method: "POST",
      url: `/list/${listId}/add_item`,
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 26 },
    });

    cy.request({
      method: "POST",
      url: `/list/${listId}/add_item`,
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 27 },
    });

    cy.request({
      method: "POST",
      url: `/list/${listId}/clear?confirm=true`,
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      failOnStatusCode: false,
    }).as("postClearList");
    cy.get("@postClearList").then((response) => {
      expect(response.status).to.be.eql(201);
      expect(response.body.success).to.be.true;
      expect(response.body.status_code).to.be.eql(12);
      expect(response.body.status_message).to.be.eql(
        "The item/record was updated successfully.",
      );
    });
  });
});
