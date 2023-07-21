describe("Validar o endpoint /list/{list_id}", () => {
  before(() => {
    cy.request({
      method: "POST",
      url: "/list/8260674/add_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 12 },
    });
  });

  after(() => {
    cy.request({
      method: "POST",
      url: "/list/8260674/remove_item",
      headers: { Authorization: "Bearer " + Cypress.env("AUTH_TOKEN") },
      body: { media_id: 12 },
    });
  });

  it("Validar o método GET", () => {
    cy.request({
      url: "/list/8260674",
      headers: {
        Authorization: "Bearer " + Cypress.env("AUTH_TOKEN"),
      },
    }).as("getListsDetails");
    cy.get("@getListsDetails").then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.created_by).to.be.a("string");
      expect(response.body.description).to.be.a("string");
      expect(response.body.favorite_count).to.be.a("number");
      expect(response.body.id).to.be.a("string");
      expect(response.body.items).to.be.an("array");
      expect(response.body.items[0].adult).to.be.a("boolean");
      expect(response.body.items[0].backdrop_path).to.be.a("string");
      expect(response.body.items[0].genre_ids).to.be.an("array");
      expect(response.body.items[0].id).to.be.a("number");
      expect(response.body.items[0].media_type).to.be.a("string");
      expect(response.body.items[0].original_language).to.be.a("string");
      expect(response.body.items[0].original_title).to.be.a("string");
      expect(response.body.items[0].overview).to.be.a("string");
      expect(response.body.items[0].popularity).to.be.a("number");
      expect(response.body.items[0].poster_path).to.be.a("string");
      expect(response.body.items[0].release_date).to.be.a("string");
      expect(response.body.items[0].title).to.be.a("string");
      expect(response.body.items[0].video).to.be.a("boolean");
      expect(response.body.items[0].vote_average).to.be.a("number");
      expect(response.body.items[0].vote_count).to.be.a("number");
      expect(response.body.item_count).to.be.a("number");
      expect(response.body.iso_639_1).to.be.a("string");
      expect(response.body.name).to.be.a("string");
      expect(response.body.poster_path).to.be.null;
    });
  });
});
