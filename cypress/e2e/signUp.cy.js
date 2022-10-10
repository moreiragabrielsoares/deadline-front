import { faker } from "@faker-js/faker";

describe("Test for signup", () => {
  it("Testa se cadastra um usuário com sucesso", () => {
    const newUser = {
      email: faker.internet.email(),
      password: "#a123456",
    };

    cy.visit("https://project-deadline-front.vercel.app/signup");

    cy.get('input[placeholder="E-mail"]').type(newUser.email);
    cy.get('input[placeholder="Senha"]').type(newUser.password);

    cy.intercept(
      "POST",
      "https://project-deadline-back.herokuapp.com/signup"
    ).as("postNewUser");

    cy.contains("Cadastrar").click();

    cy.wait("@postNewUser");

    cy.url().should("equal", "https://project-deadline-front.vercel.app/login");
  });
});
