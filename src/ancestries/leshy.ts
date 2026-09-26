import { Attribute } from "../attributes";
import { nature, stealth } from "../skills";
import { Size, type Ancestry, type Heritage } from "./types";

const leafText =
    "Votre corps est principalement constitué de feuillage naturel et, telle une feuille se détachant d'un arbre, vous atterrissez avec une grâce particulière après une chute. Vous ne subissez aucun dégât de chute, quelle que soit la hauteur.";
const leaf: Heritage = {
    id: "leaf",
    name: "Léchi feuillu",
    text: leafText,
    grants: [{ kind: "passive", name: "Léchi feuillu", text: leafText }],
};

const lotusText =
    "Vous flottez sans effort à la surface de l'eau. Vous pouvez marcher à la surface d'eaux calmes et d'autres liquides inoffensifs, en vous déplaçant à la moitié de votre vitesse normale. Vous pouvez également tenter un test d'Équilibre pour traverser une étendue d'eau en mouvement, en utilisant le DD d'un test de [Natation](swim) pour vous déplacer dans l'eau. Dans ce cas, vous ne pouvez pas vous déplacer à plus de la moitié de votre vitesse ; en cas d'échec ou d'échec critique, vous tombez à l'eau au lieu de subir les effets habituels.";
const lotus: Heritage = {
    id: "lotus",
    name: "Léchi lotus",
    text: lotusText,
    grants: [{ kind: "passive", name: "Léchi lotus", text: lotusText }],
};

const rootText =
    "Votre corps est constitué de racines robustes qui vous ancrent solidement au sol. Vous gagnez 10 points de vie grâce à votre ascendance, au lieu de 8. Vous bénéficiez d'un bonus de circonstance de +2 à votre DD  contre les tentatives de vous [Repositionner](reposition), de vous [Pousser](shove) ou contre les sorts ou les effets cherchant à vous déplacer ou à vous mettre [à terre](prone).";
const root: Heritage = {
    id: "root",
    name: "Léchi racine",
    text: rootText,
    grants: [{ kind: "passive", name: "Léchi racine", text: rootText }],
};

const seaweed: Heritage = {
    id: "seaweed",
    name: "Léchi algue",
    text: "Votre corps est constitué d'algues entremêlées et vous vous sentez aussi à l'aise sous l'eau qu'à la surface. Vous obtenez une Vitesse de nage de 6 mètres et vous pouvez toujours respirer sous l'eau. En revanche, votre Vitesse au sol est réduite de 1,50 mètre.",
    grants: [
        { kind: "speed", environment: "land", value: -1 },
        { kind: "speed", environment: "swim", value: 5 },
    ],
};

const vineText =
    "Des lianes préhensiles vous donnent une compétence inégalée pour [Escalader](climb). Vous n'avez pas besoin d'avoir de mains libres pour Escalader. De plus, si vous obtenez une réussite à un test d'Athlétisme pour Escalader, elle devient une réussite critique.";
const vine: Heritage = {
    id: "vine",
    name: "Léchi liane",
    text: vineText,
    grants: [{ kind: "passive", name: "Léchi liane", text: vineText }],
};

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
    heritages: [leaf, lotus, root, seaweed, vine],
    familiarity: [],
    grants: [{ kind: "sense", name: "Vision en basse lumière" }],
};
