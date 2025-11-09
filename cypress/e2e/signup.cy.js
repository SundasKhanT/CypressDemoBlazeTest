describe("DemoBlaze Signup Form Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
    cy.get("#signin2").click();
    cy.get("#sign-username").should("exist");
    cy.get("#sign-password").should("exist");
  });

  it("Valid Signup - Alphanumeric Username & Valid Password", () => {
    cy.get("#sign-username").type("Sundas");
    cy.get("#sign-password").type("testpass123");
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Sign up successful");
    });
  });

  it("Invalid Username - Too Short (<6 chars)", () => {
    cy.get("#sign-username").type("usr05");
    cy.get("#sign-password").type("pass123");
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Please fill out Username correctly");
    });
  });

  it("Invalid Username - Special Characters", () => {
    cy.get("#sign-username").type("user@123!");
    cy.get("#sign-password").type("pass123");
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Please fill out Username correctly");
    });
  });

  it("Empty Username", () => {
    cy.get("#sign-username").clear();
    cy.get("#sign-password").type("pass123");
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Please fill out Username correctly");
    });
  });

  it("Invalid Password - Too Short (<6 chars)", () => {
    cy.get("#sign-username").type("user123");
    cy.get("#sign-password").type("123");
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Please fill out Password correctly");
    });
  });

  it("Empty Password", () => {
    cy.get("#sign-username").type("user123");
    cy.get("#sign-password").clear();
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Please fill out Password correctly");
    });
  });

  it("Empty Username & Password", () => {
    cy.get("#sign-username").clear();
    cy.get("#sign-password").clear();
    cy.contains("Sign up").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.match(/Username|Password/);
    });
  });
});
