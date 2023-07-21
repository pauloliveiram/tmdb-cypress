describe("Validar o endpoint account/{account_id}/lists", () => {
  it("Validar o método GET", () => {
    cy.request({
      url: "/account/9961072/lists",
      headers: {
        Authorization: "Bearer " + Cypress.env("AUTH_TOKEN"),
      },
    }).as("getAccountLists");
    cy.get("@getAccountLists").then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.page).to.be.a("number");
      expect(response.body.results).to.be.an("array");
      expect(response.body.results[0].description).to.be.an("string");
      expect(response.body.results[0].favorite_count).to.be.an("number");
      expect(response.body.results[0].id).to.be.an("number");
      expect(response.body.results[0].item_count).to.be.an("number");
      expect(response.body.results[0].iso_639_1).to.be.an("string");
      expect(response.body.results[0].list_type).to.be.an("string");
      expect(response.body.results[0].name).to.be.an("string");
      expect(response.body.results[0].poster_path).to.be.null;
      expect(response.body.total_pages).to.be.a("number");
      expect(response.body.total_results).to.be.a("number");
    });
  });
});
