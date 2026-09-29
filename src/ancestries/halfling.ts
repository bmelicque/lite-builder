import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import type { GrantedPassive } from "../modifiers";
import { acrobatics, stealth } from "../rules/skills";
import { Size, type Ancestry } from "./types";
import {
    gutsyHalfling,
    hillockHalfling,
    jinxHalfling,
    wildwoodHalfling,
} from "../heritages/halfling";

const keenEyes: GrantedPassive = {
    kind: "passive",
    name: "yeux perçants",
    text: "Votre vue perçante vous permet de distinguer des détails concernant des créatures masquées ou invisibles que d'autres pourraient ne pas remarquer. Vous obtenez un bonus de circonstances de +2 quand vous utilisez l'action [Chercher](seek) pour trouver des créatures [Cachées](hidden) ou [Non détectées](undetected) dans un rayon de 9 mètres autour de vous. Quand vous prenez pour cible un adversaire [Masqué](concealed) ou [Caché](hidden), réduisez le DD du test nu à 3 pour une cible masquée ou à 9 pour une cible cachée.",
};

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
    heritages: [gutsyHalfling, hillockHalfling, jinxHalfling, wildwoodHalfling],
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
