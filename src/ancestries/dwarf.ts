import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import { crafting, religion } from "../rules/skills";
import { Size, type Ancestry } from "./types";
import {
    ancientBloodedDwarf,
    deathWardenDwarf,
    forgeDwarf,
    rockDwarf,
} from "../heritages/dwarf";
import { trained } from "../modifiers";

export const dwarf: Ancestry = {
    id: "dwarf",
    img: "./ancestries/dwarf.png",
    name: "Nain",
    summary:
        "Les Nains sont un peuple de petite taille et trapu, souvent obstiné, farouche et dévoué.\n" +
        "Si vous voulez jouer un personnage dur comme la pierre, un aventurier têtu et implacable, avec un mélange de dureté et de profonde sagesse, vous devriez jouer un nain.\n",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Nain",
    hp: 10,
    size: Size.Medium,
    speeds: { land: 4 },
    skills: [crafting, religion],
    attributes: {
        boosts: [Attribute.Constitution, Attribute.Wisdom, "Libre"],
        flaw: Attribute.Charisma,
    },
    heritages: [ancientBloodedDwarf, deathWardenDwarf, forgeDwarf, rockDwarf],
    familiarity: [
        weapons.battleAxe,
        weapons.clanDagger,
        weapons.clanPistol,
        weapons.dwarvenScattergun,
        weapons.dwarvenWarAxe,
        weapons.longHammer,
        weapons.pick,
        weapons.warhammer,
    ],
    grants: [
        { kind: "sense", name: "Vision dans le noir" },
        trained("crafting"),
        trained("religion"),
    ],
};
