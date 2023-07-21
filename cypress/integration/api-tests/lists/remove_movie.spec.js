describe("Validar o endpoint POST /list/{list_id}/remove_item", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "/list/8260674/add_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 12 },
    });
  });

  afterEach(() => {
    cy.request({
      method: "POST",
      url: "/list/8260674/remove_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 12 },
    });
  });

  it("Validar remoção de filme da lista com sucesso", () => {
    cy.request({
      method: "POST",
      url: "/list/8260674/remove_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 12 },
    }).as("postRemoveMovie");
    cy.get("@postRemoveMovie").then((response) => {
      expect(response.status).to.be.eql(200);
      expect(response.body.success).to.be.true;
      expect(response.body.status_code).to.be.eql(13);
      expect(response.body.status_message).to.be.eql(
        "The item/record was deleted successfully.",
      );
    });
  });

  it("Validar erro ao remover um filme que não está contido na lista", () => {
    cy.request({
      method: "POST",
      url: "/list/8260674/remove_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 10 },
    }).as("postRemoveMovie");
    cy.get("@postRemoveMovie").then((response) => {
      expect(response.status).to.be.eql(200);
      expect(response.body.success).to.be.false;
      expect(response.body.status_code).to.be.eql(21);
      expect(response.body.status_message).to.be.eql(
        "Entry not found: The item you are trying to edit cannot be found.",
      );
    });
  });

  it("Validar erro ao remover um filme sem estar com o token de autorização", () => {
    cy.request({
      method: "POST",
      url: "/list/8260674/remove_item",
      body: { media_id: 10 },
      failOnStatusCode: false,
    }).as("postRemoveMovie");
    cy.get("@postRemoveMovie").then((response) => {
      expect(response.status).to.be.eql(401);
      expect(response.body.success).to.be.false;
      expect(response.body.status_code).to.be.eql(7);
      expect(response.body.status_message).to.be.eql(
        "Invalid API key: You must be granted a valid key.",
      );
    });
  });
});
