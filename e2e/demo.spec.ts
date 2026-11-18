import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je clique sur Organisateurs sur l'accueil", async () => {
    await page.getByRole("link", { name: "Organisateurs" }).click();
    await expect(page.getByRole("button", { name: "Organiser une action" })).toBeVisible();
  });

  await test.step("Je reviens à l'accueil et je clique sur Entreprises", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Entreprises" }).click();
    await expect(page.getByRole("button", { name: "Devenir partenaire" })).toBeVisible();
  });

  await test.step("Je clique sur l'onglet Fil d'actualité", async () => {
    await page.goto("/");
    await page.locator(".onglets").getByRole("link", { name: "Fil d'actualité" }).click();
    await expect(page.getByRole("heading", { name: "Fil d'actualité" })).toBeVisible();
  });
});
