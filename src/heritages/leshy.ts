import { passiveHeritage, type Heritage } from "./types";

export const leafLeshy = passiveHeritage(
    "leafLeshy",
    "Léchi feuillu",
    "Votre corps est principalement constitué de feuillage naturel et, telle une feuille se détachant d'un arbre, vous atterrissez avec une grâce particulière après une chute. Vous ne subissez aucun dégât de chute, quelle que soit la hauteur.",
);

export const lotusLeshy = passiveHeritage(
    "lotusLeshy",
    "Léchi lotus",
    "Vous flottez sans effort à la surface de l'eau. Vous pouvez marcher à la surface d'eaux calmes en vous déplaçant à la moitié de votre vitesse normale. Vous pouvez également tenter un test d'[Équilibre](balance) pour traverser une étendue d'eau en mouvement. Dans ce cas, vous ne pouvez pas vous déplacer à plus de la moitié de votre vitesse ; en cas d'échec ou d'échec critique, vous tombez à l'eau au lieu de subir les effets habituels.",
);

export const rootLeshy: Heritage = {
    id: "rootLeshy",
    name: "Léchi racine",
    text: "Votre corps est constitué de racines robustes qui vous ancrent solidement au sol.",
    grants: [
        { kind: "hp", value: 2, perLevel: false },
        {
            kind: "passive",
            name: "Léchi racine",
            text: "Vous bénéficiez d'un bonus de circonstance de +2 à votre DD  contre les tentatives de vous [Repositionner](reposition), de vous [Pousser](shove) ou contre les sorts ou les effets cherchant à vous déplacer ou à vous mettre [à terre](prone).",
        },
    ],
};

export const seaweedLeshy: Heritage = {
    id: "seaweedLeshy",
    name: "Léchi algue",
    text: "Votre corps est constitué d'algues entremêlées et vous vous sentez aussi à l'aise sous l'eau qu'à la surface. Vous obtenez une Vitesse de nage de 6 mètres et vous pouvez toujours respirer sous l'eau. En revanche, votre Vitesse au sol est réduite de 1,50 mètre.",
    grants: [
        { kind: "speed", environment: "land", value: -1 },
        { kind: "speed", environment: "swim", value: 5 },
    ],
};

const vineText =
    "Des lianes préhensiles vous donnent une compétence inégalée pour [Escalader](climb). Vous n'avez pas besoin d'avoir de mains libres pour Escalader. De plus, si vous obtenez une réussite à un test d'Athlétisme pour Escalader, elle devient une réussite critique.";
export const vineLeshy: Heritage = {
    id: "vineLeshy",
    name: "Léchi liane",
    text: vineText,
    grants: [{ kind: "passive", name: "Léchi liane", text: vineText }],
};
