import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import { nature, stealth } from "../rules/skills";
import { Size, type Ancestry } from "./types";
import {
    charhideGoblin,
    irongutGoblin,
    razortoothGoblin,
    tailedGoblin,
    treedwellerGoblin,
    unbreakableGoblin,
} from "../heritages/goblin";

export const goblin: Ancestry = {
    id: "goblin",
    img: "./ancestries/goblin.png",
    name: "Gobelin",
    summary:
        "Les gobelins sont un peuple de petite taille, pugnace et énergique, qui a passé des millénaires à être décrié et redouté.\n" +
        "Si vous voulez incarner un personnage excentrique, enthousiaste et qui aime s'amuser, vous devriez jouer un gobelin.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Gobelin",
    hp: 6,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [nature, stealth],
    attributes: {
        boosts: [Attribute.Dexterity, Attribute.Charisma, "Libre"],
        flaw: Attribute.Wisdom,
    },
    heritages: [
        // TODO: dokkaebi goblin
        // TODO: snow goblin
        charhideGoblin,
        irongutGoblin,
        razortoothGoblin,
        tailedGoblin,
        treedwellerGoblin,
        unbreakableGoblin,
    ],
    familiarity: [
        // TODO: big boom gun
        weapons.dogslicer,
        weapons.flingflenser,
        weapons.horseChopper,
        // TODO: spoon gun
    ],
    grants: [{ kind: "sense", name: "Vision dans le noir" }],
};
