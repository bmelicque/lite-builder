import type { Action } from "../actions";
import { weapons } from "../items/weapons";
import { expert, trained } from "../modifiers";
import { Attribute } from "../rules/attributes";
import { Flag, type Class } from "./types";

const taunt: Action = {
    id: "taunt",
    combat: true,
    name: "Provocation",
    traits: ["concentration", "gardien"],
    category: "action",
    actions: "one",
    text:
        "Par un geste attirant l'attention, un bruit, une remarque acerbe ou un cri menaçant, vous poussez un ennemi à s'en prendre à vous plutôt qu'à vos alliés. Même les créatures dénuées d'intelligence sont affectées par vos provocations. Choisissez un ennemi dans un rayon de 9 mètres qui devient votre ennemi provoqué. Si votre ennemi provoqué effectue une action hostile incluant au moins un de vos alliés, mais pas vous, il subit un malus de circonstances de -1 à cette action et est également [pris au dépourvu](offGuard) jusqu'au début de son prochain tour.\n" +
        "Votre ennemi reste provoqué jusqu'au début de votre prochain tour et vous ne pouvez avoir qu'une seule Provocation active à la fois. Provoquer un nouvel ennemi met fin à cet effet sur la cible actuelle.",
};

const interceptAttack: Action = {
    id: "interceptAttack",
    combat: true,
    name: "Interception",
    traits: ["gardien"],
    category: "reaction",
    actions: "reaction",
    text:
        "**Déclencheur** un allié à 3 mètres ou moins de vous subit des dégâts physiques.\n" +
        "Vous vous élancez pour vous mettre en travers du danger pour protéger un allié. Vous pouvez [Faire un pas](step), en terminant votre déplacement à côté de l'allié déclencheur. Vous subissez les dégâts à la place de cet allié.\n",
};

export const guardian: Class = {
    id: "guardian",
    img: "./classes/guardian.png",
    name: "Gardien",
    flags: [Flag.Combat, Flag.Support],
    ref: "https://pf2e.pathfinder-fr.org/classes?name=Gardien",
    summary:
        "La mort et le danger venant de toutes sortes d'ennemis menacent tout ce qui vous est cher, à vous comme à vos compagnons. Mais vous êtes le bouclier, le mur d'acier qui contient la marée de vos adversaires. Vous êtes vêtu d'une armure que vous portez comme une seconde peau et que vous pouvez orienter pour vous protéger, vous et vos alliés, des dégâts et tenir les ennemis à distance. Vos alliés comptent sur vous pour les protéger, qu'ils soient à vos côtés sur le champ de bataille ou à l'arrière-garde et vos opposants vous perçoivent comme la menace imposante que vous représentez. Que ce soit pour vos amis ou vos ennemis, votre présence est difficile à ignorer.",
    keyAttributes: [Attribute.Strength],
    forbiddenFlaws: [Attribute.Strength, Attribute.Constitution],
    hp: 12,
    skills: 3,
    choices: [],
    grants: [
        trained("perception"),
        expert("fortitude"),
        trained("reflexes"),
        expert("will"),
        trained("athletics"), // TODO: ace skill
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmedAttacks"),
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("heavyArmor"),
        trained("unarmoredDefense"),
        trained("guardianClassDC"),

        { kind: "attributeArray", array: [3, 1, 2, 0, 1, 0] },

        { kind: "action", ...taunt },
        { kind: "action", ...interceptAttack },

        { kind: "weapon", ...weapons.meteorHammer },
    ],
};
