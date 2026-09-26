import type { Action } from "../actions";
import { Attribute } from "../attributes";
import { weapons } from "../items/weapons";
import { crafting, religion } from "../skills";
import { Size, type Ancestry, type Heritage } from "./types";

export const callOnAncientBlood: Action = {
    name: "Appel du Sang Ancien",
    category: "reaction",
    actions: "reaction",
    text:
        "**Déclencheur** Vous tentez un jet de sauvegarde contre un effet magique, mais vous n'avez pas encore lancé le dé.\n" +
        "La résistance innée de vos ancêtres à la magie monte en flèche avant de diminuer lentement. Vous obtenez un bonus de circonstances de +1 à vos sauvegardes contre les effets magiques jusqu'à la fin de ce tour.",
};
const ancientBloodedDwarf: Heritage = {
    id: "ancientBloodedDwarf",
    name: "Sang-Ancien",
    text: "Les héros nains de l'ancien temps étaient capables de balayer la magie de leurs ennemis du revers de la main. Vous avez hérité d'une partie de cette résistance. Vous gagnez la réaction [Appel du sang ancien](callOnAncientBlood), vous conférant un bonus à vos jets de sauvegarde contre les effets magiques.",
    grants: [{ ...callOnAncientBlood, kind: "action" }],
};

const deathWardenDwarf: Heritage = {
    id: "deathWardenDwarf",
    name: "Gardemort",
    text: "Vos ancêtres ont été les gardes des tombeaux et leurs pouvoirs de se protéger vous ont été transmis. Si vous obtenez un succès sur un jet de sauvegarde contre un effet qui possède le trait [vide](void) ou a été créé par une créature morte-vivante, vous considérez qu'il s'agit d'un succès critique.",
    grants: [
        {
            kind: "passive",
            name: "Gardemort",
            text: "Si vous obtenez un succès sur un jet de sauvegarde contre un effet qui possède le trait vide ou a été créé par une créature morte-vivante, vous considérez qu'il s'agit d'un succès critique.",
        },
    ],
};

const forgeDwarf: Heritage = {
    id: "forgeDwarf",
    name: "Nain des Forges",
    text: "Vous êtes remarquablement adapté aux environnements chauds. Vous bénéficiez ainsi d'une résistance au feu égale à la moitié de votre niveau (minimum 1) et vous considérez tous les effets environnementaux liés à la chaleur comme un rang moins extrême.",
    grants: [
        {
            kind: "passive",
            name: "Nain des Forges",
            text: "Vous considérez tous les effets environnementaux liés à la chaleur comme un rang moins extrême.",
        },
        {
            kind: "resistance",
            to: "aux dégâts de feu",
            value: (c) => Math.max(1, Math.floor(c.level / 2)),
        },
    ],
};

const rockDwarf: Heritage = {
    id: "rockDwarf",
    name: "Nain des Roches",
    text:
        "Vos ancêtres ont vécu et travaillé parmi les pierres des montagnes ou des profondeurs de la terre. Cela vous a rendu aussi stable que le roc. Vous obtenez un bonus de circonstances de +2 à votre DD contre les tentatives pour vous [Pousser](shove), vous [Repositionner](reposition) ou vous faire tomber [à terre](prone).\n" +
        "De plus, lorsque vous subissez un effet qui devrait vous forcer à vous déplacer de 3 mètres ou plus, vous ne vous déplacez que de la moitié de cette distance.",
    grants: [
        {
            kind: "passive",
            name: "Nain des Roches",
            text:
                "Vous obtenez un bonus de circonstances de +2 à votre DD contre les tentatives pour vous [Pousser](shove), vous [Repositionner](reposition) ou vous faire tomber [à terre](prone).\n" +
                "De plus, lorsque vous subissez un effet qui devrait vous forcer à vous déplacer de 3 mètres ou plus, vous ne vous déplacez que de la moitié de cette distance.",
        },
    ],
};

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
    grants: [{ kind: "sense", name: "Vision dans le noir" }],
};
