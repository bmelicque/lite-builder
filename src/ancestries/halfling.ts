import type { Action } from "../actions";
import { Attribute } from "../attributes";
import { weapons } from "../items/weapons";
import type { GrantedPassive } from "../modifiers";
import { acrobatics, stealth } from "../skills";
import { passiveHeritage, Size, type Ancestry } from "./types";

const keenEyes: GrantedPassive = {
    kind: "passive",
    name: "yeux perçants",
    text: "Votre vue perçante vous permet de distinguer des détails concernant des créatures masquées ou invisibles que d'autres pourraient ne pas remarquer. Vous obtenez un bonus de circonstances de +2 quand vous utilisez l'action [Chercher](seek) pour trouver des créatures [Cachées](hidden) ou [Non détectées](undetected) dans un rayon de 9 mètres autour de vous. Quand vous prenez pour cible un adversaire [Masqué](concealed) ou [Caché](hidden), réduisez le DD du test nu à 3 pour une cible masquée ou à 9 pour une cible cachée.",
};

const gutsy = passiveHeritage(
    "gutsy",
    "Halfelin flegmatique",
    "Votre lignée est réputée pour garder la tête froide et résister à la panique dans les pires situations. Lorsque vous obtenez un succès sur un jet de sauvegarde contre un effet d'émotion, il devient un succès critique.",
);

const hillock = passiveHeritage(
    "hillock",
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
const jinxHalfling = passiveHeritage(
    "jinx",
    "Halfelin portepoisse",
    "Vous êtes né avec une étrange bénédiction : à l'inverse de la chance halfeline typique, vous pouvez à la place manipuler le destin des autres. Vous obtenez l'action [Porter la poisse](jinx).",
);

const wildwood = passiveHeritage(
    "wildwood",
    "Halfelin des bois sauvages",
    "Vous émergez des profondeurs de la jungle ou de la forêt et vous avez appris à utiliser votre petite taille pour vous faufiler à travers les sous-bois et autres obstacles. Vous ignorez les terrains difficiles provoqués par les plantes et les champignons, tels que les fourrés, les lianes et les sous-bois.",
);

export const halfling: Ancestry = {
    id: "halfling",
    img: "./ancestries/halfling.png",
    name: "Halfelin",
    summary:
        "Les halfelins sont un peuple résistant et de petite taille, qui fait preuve d'une curiosité et d'un humour remarquables.\n" +
        "Si vous voulez jouer un personnage qui doit jongler entre des aspirations opposées qui le conduisent à vouloir de l'aventure et du confort, vous devriez jouer un halfelin.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Halfelin",
    hp: 6,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [acrobatics, stealth],
    attributes: {
        boosts: [Attribute.Dexterity, Attribute.Wisdom, "Libre"],
        flaw: Attribute.Strength,
    },
    heritages: [gutsy, hillock, jinxHalfling, wildwood],
    familiarity: [
        weapons.fightingStick,
        weapons.filchersFork,
        weapons.fryingPan,
        weapons.halflingSlingStaff,
        weapons.shortswort,
        weapons.sling,
        weapons.spraysling,
    ],
    grants: [keenEyes],
};
