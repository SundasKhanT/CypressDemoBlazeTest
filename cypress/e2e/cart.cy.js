/// <reference types="cypress" />

describe("DemoBlaze Cart Functionality Tests", () => {
  const baseUrl = "https://www.demoblaze.com";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // ECP Test: Add valid product to cart
  it("Should add a valid product to the cart", () => {
    cy.contains("Samsung galaxy s6").click();
    cy.contains("Add to cart").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Product added");
    });
    cy.go("back");
  });

  // ECP Test: Add non-existent product
  it("Should fail to add a non-existent product", () => {
    cy.contains("NonExistentProduct").should("not.exist");
  });

  // ECP Test: Remove product from cart
  it("Should remove product from cart", () => {
    cy.contains("Samsung galaxy s6").click();
    cy.contains("Add to cart").click();
    cy.on("window:alert", () => {});

    cy.visit(baseUrl + "/cart.html");
    cy.get("tr")
      .contains("Samsung galaxy s6")
      .parent("tr")
      .contains("Delete")
      .click();

    cy.get("tr").contains("Samsung galaxy s6").should("not.exist");
  });

  // BVA Test: Verify cart total
  it("Should calculate total price correctly", () => {
    cy.contains("Sony vaio i5").click();
    cy.contains("Add to cart").click();
    cy.on("window:alert", () => {});
    // Instead of going back, explicitly visit home page
    cy.visit(baseUrl);

    // Wait for the product cards to load
    cy.get(".card-title").should("have.length.greaterThan", 0);

    // Find the product card with Samsung galaxy s6 and click it
    cy.get(".card").contains("Samsung galaxy s6").click();

    cy.contains("Add to cart").click();
    cy.on("window:alert", () => {});
    cy.visit(baseUrl + "/cart.html");

    let prices = [];
    cy.get("td:nth-child(3)")
      .each(($el) => {
        prices.push(parseInt($el.text()));
      })
      .then(() => {
        const total = prices.reduce((a, b) => a + b, 0);
        cy.get("#totalp").should("have.text", total.toString());
      });
  });

  // BVA Test: Cart Quantity Boundaries
  it("Should add Samsung galaxy s6 to the cart", () => {
    cy.visit("https://www.demoblaze.com");

    // Wait for products to load
    cy.get(".hrefch").should("contain.text", "Samsung galaxy s6");

    // Click the product title link (opens product page)
    cy.contains(".hrefch", "Samsung galaxy s6").click();

    // Wait for product detail page to load
    cy.get(".name").should("contain.text", "Samsung galaxy s6");

    // Click Add to cart button on detail page
    cy.get("a.btn.btn-success.btn-lg").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Product added");
    });
  });
});
