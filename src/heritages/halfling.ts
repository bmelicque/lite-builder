import type { Action } from "../actions";
import { passiveHeritage } from "./types";

export const gutsyHalfling = passiveHeritage(
    "gutsyHalfling",
    "Halfelin flegmatique",
    "Votre lignée est réputée pour garder la tête froide et résister à la panique dans les pires situations. Lorsque vous obtenez un succès sur un jet de sauvegarde contre un effet d'émotion, il devient un succès critique.",
);

export const hillockHalfling = passiveHeritage(
    "hillockHalfling",
    "Halfelin des collines",
    "Habitué à la vie calme dans les collines, votre peuple trouve le repos et la relaxation réconfortants, plus particulièrement quand vous profitez des joies du confort. Quand vous regagnez des Points de vie pendant la nuit, ajoutez votre niveau aux PV récupérés. Quand quelqu'un fait appel à la compétence Médecine pour [Soigner vos blessures](treatWounds), vous pouvez manger un en-cas pour ajouter votre niveau aux Points de vie que vous récupérez de ce traitement.",
);

export const jinx: Action = {
    name: "Porter la poisse",
    traits: ["malédiction", "occulte"],
    category: "action",
    actions: "one",
    text:
        "**Fréquence** Une fois par jour.\n" +
        "Vous pouvez maudire une autre créature pour la rendre maladroite. Cette malédiction possède une portée de 9 mètres et vous devez être capable de voir votre cible. La cible tente un jet de Volonté contre le plus élevé entre votre DD de classe ou votre DD de sort.\n" +
        "**Réussite** La cible n'est pas affectée et immunisée pendant 24 heures.\n" +
        "**Échec** La cible est [maladroite 1](clumsy) pendant 1 minute.\n" +
        "**Échec critique** La cible est maladroite 2 pendant 1 minute.",
};
export const jinxHalfling = passiveHeritage(
    "jinxHalfling",
    "Halfelin portepoisse",
    "Vous êtes né avec une étrange bénédiction : à l'inverse de la chance halfeline typique, vous pouvez à la place manipuler le destin des autres. Vous obtenez l'action [Porter la poisse](jinx).",
);

export const wildwoodHalfling = passiveHeritage(
    "wildwoodHalfling",
    "Halfelin des bois sauvages",
    "Vous émergez des profondeurs de la jungle ou de la forêt et vous avez appris à utiliser votre petite taille pour vous faufiler à travers les sous-bois et autres obstacles. Vous ignorez les terrains difficiles provoqués par les plantes et les champignons, tels que les fourrés, les lianes et les sous-bois.",
);
