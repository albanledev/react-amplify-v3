describe("Show user road map from login to commenting", () => {
  const baseUrl = Cypress.env("url");
  let authToken: string;
  let product_id: string;

  before("Login", () => {
    cy.login().then(() => {
      authToken = window.localStorage.getItem("authToken") ?? "";
      expect(Boolean(authToken)).true;
    });
  });

  it("Show all products", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}api/products`,
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");

      product_id = response.body.data[0].id;
    });
  });

  it("Show user a specific product", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}api/products/${product_id}`,
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  it("Male user write comment", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}api/comments`,
      body: {
        content: "Yo",
        product_id,
      },
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      expect(response.status).to.eq(201);
    });
  });
});
