import React from "react";
import Card from "../../app/components/Card";

describe("Test Card compnent if displays data", () => {
  it("render", () => {
    cy.mount(<Card title="Test" content="Hello world !" />);
  });
});
