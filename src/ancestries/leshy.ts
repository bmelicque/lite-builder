import {
    leafLeshy,
    lotusLeshy,
    rootLeshy,
    seaweedLeshy,
    vineLeshy,
} from "../heritages/leshy";
import { Attribute } from "../rules/attributes";
import { nature, stealth } from "../rules/skills";
import { Size, type Ancestry } from "./types";

export const leshy: Ancestry = {
    id: "leshy",
    img: "./ancestries/leshy.png",
    name: "Léchi",
    summary:
        "Les léchis sont des esprits de la nature immortels habitant de petits corps végétaux, désireux de découvrir le monde.\n" +
        "Si vous souhaitez incarner un personnage curieux et lié à la nature, vous devriez jouer un léchi.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=L%C3%A9chi",
    hp: 8,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [nature, stealth],
    attributes: {
        boosts: [Attribute.Constitution, Attribute.Wisdom, "Libre"],
        flaw: Attribute.Intelligence,
    },
    heritages: [leafLeshy, lotusLeshy, rootLeshy, seaweedLeshy, vineLeshy],
    familiarity: [],
    grants: [{ kind: "sense", name: "Vision en basse lumière" }],
};
