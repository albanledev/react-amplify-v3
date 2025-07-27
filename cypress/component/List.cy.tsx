import React from "react";
import List from "../../app/components/List";

const listMocks = [
  {
    id: "1",
    name: "test",
    created_at: "2025-23-5",
  },
  {
    id: "2",
    name: "Name",
    created_at: "2025-23-5",
  },
];

describe("Check if component displays data", () => {
  it("renders", () => {
    cy.mount(<List el={listMocks} />);
  });
});
