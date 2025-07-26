describe("Check if the user admin can access to admin endpoints", () => {
  let authToken: string;
  const baseUrl = Cypress.env("url");

  before("Login", () => {
    cy.login().then(() => {
      authToken = window.localStorage.getItem("authToken") ?? "";
      cy.log(authToken);
      expect(Boolean(authToken)).true;
    });
  });

  it("Connect with a admin account", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}api/admin/products`,
      failOnStatusCode: false,
      body: {
        title: "New article",
        description: "Cypress",
        image_url: "hdfgdfgdsfdfgdfgdf",
      },
      headers: {
        authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
