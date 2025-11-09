describe("DemoBlaze Contact Form Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
    cy.contains("Contact").click({ force: true });
    cy.get("#exampleModal").invoke("css", "display", "block");
    cy.get("#recipient-email").should("exist");
  });

  it("Empty Email", () => {
    cy.get("#recipient-email").clear();
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").type("Hello there");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Invalid Email", () => {
    cy.get("#recipient-email").type("invalidemail");
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").type("Hello there");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Empty Name", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").clear();
    cy.get("#message-text").type("Hello there");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Name with special characters", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("John@123!");
    cy.get("#message-text").type("Hello there");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
    cy.screenshot("Name with special characters");
  });

  it("Valid Message", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").type("Please contact me.");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
    cy.screenshot("valid Message");
  });

  it("Empty Message", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").clear();
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Short Message (<10 chars)", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").type("Hi there");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Message Exactly 10 chars", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    cy.get("#message-text").type("Hello User");
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Message with 200 chars", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    const longMessage = "a".repeat(200);
    cy.get("#message-text").type(longMessage);
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });

  it("Message longer than 200 chars", () => {
    cy.get("#recipient-email").type("test@example.com");
    cy.get("#recipient-name").type("Sundas");
    const tooLongMessage = "a".repeat(201);
    cy.get("#message-text").type(tooLongMessage);
    cy.contains("Send message").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Thanks for the message");
    });
  });
});
