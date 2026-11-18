import { describe, expect, it } from "vitest";
import { getProfil } from "./profils";

describe("getProfil", () => {
  it("renvoie la configuration d'un profil connu", () => {
    const profil = getProfil("organisateurs");
    expect(profil).toEqual({
      slug: "organisateurs",
      nom: "Organisateurs",
      couleur: "#11a2dd",
      cta: "Organiser une action",
    });
  });

  it("renvoie undefined pour un slug inconnu", () => {
    expect(getProfil("inconnu")).toBeUndefined();
  });
});
