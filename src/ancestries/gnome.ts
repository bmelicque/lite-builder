import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import { crafting, performance } from "../rules/skills";
import { Size, type Ancestry } from "./types";
import { chameleonGnome, sensateGnome, umbralGnome } from "../heritages/gnome";

export const gnome: Ancestry = {
    id: "gnome",
    img: "./ancestries/gnome.png",
    name: "Gnome",
    summary:
        "Les gnomes sont un peuple petit et robuste, doté d'une curiosité insatiable et d'habitudes excentriques.\n" +
        "Si vous souhaitez incarner un personnage débordant d'enthousiasme et doté d'une vision de la moralité et de la vie aussi étrange que féerique, vous devriez jouer un gnome.\n",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Gnome",
    hp: 8,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [crafting, performance],
    attributes: {
        boosts: [Attribute.Constitution, Attribute.Charisma, "Libre"],
        flaw: Attribute.Strength,
    },
    heritages: [chameleonGnome, sensateGnome, umbralGnome],
    familiarity: [
        weapons.glaive,
        weapons.gnomeFlickmace,
        weapons.gnomeHookedHammer,
        weapons.kukri,
    ],
    grants: [{ kind: "sense", name: "Vision en basse lumière" }],
};
