describe("DemoBlaze Login Form Tests", () => {
  const username = "Sundas";
  const password = "testpass123";

  before(() => {
    cy.visit("https://www.demoblaze.com/");
    cy.get("#signin2").click();
    cy.get("#sign-username").type(username);
    cy.get("#sign-password").type(password);
    cy.contains("Sign up").click();
    cy.on("window:alert", () => {});
  });

  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
    cy.get("#login2").click();
    cy.get("#logInModal").should("exist");
  });

  it("Valid Login - Correct Username & Password", () => {
    cy.get("#loginusername").clear().type(username);
    cy.get("#loginpassword").clear().type(password);
    cy.contains("Log in").click();
  });

  it("Invalid Login - Wrong Password", () => {
    cy.get("#loginusername").clear().type(username);
    cy.get("#loginpassword").clear().type("wrongpass");
    cy.contains("Log in").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Wrong password.");
    });
  });

  it("Invalid Login - Wrong Username", () => {
    cy.get("#loginusername").clear().type("wronguser");
    cy.get("#loginpassword").clear().type(password);
    cy.contains("Log in").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("User does not exist.");
    });
  });
});
