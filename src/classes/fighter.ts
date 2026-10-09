import { athleticsAce } from "../aceSkills";
import type { Action } from "../actions";
import { Attribute } from "../rules/attributes";
import {
    bucklerActions,
    bucklerHp,
    steelShieldActions,
    steelShieldHp,
} from "../items/shields";
import { actionToModifier, expert, trained, type Modifier } from "../modifiers";
import { ProficiencyRank } from "../proficiencies";
import { oneHandedWeapon } from "../recommendations";
import { Flag, type Class } from "./types";

const doubleSlice: Action = {
    name: "Double Taille",
    category: "action",
    actions: "two",
    text:
        "**Conditions** Vous maniez une arme de corps-à-corps dans chaque main (les boucliers sont valides).\n" +
        "Vous frappez votre ennemi avec vos deux armes. Effectuez deux Frappes sur une même cible, une avec chacune de vos deux armes, chacune à la pénalité actuelle. La deuxième Frappe subit une pénalité supplémentaire de -2.\n" +
        "Cette action compte comme deux attaques lorsque vous déterminez votre pénalité d'attaques multiples.",
};

const pointBlankStance: Action = {
    name: "Posture de Tir à Bout Portant",
    category: "action",
    actions: "one",
    traits: ["posture"],
    text:
        "**Conditions** Vous maniez une arme à distance.\n" +
        "Vous visez pour éliminer rapidement les ennemis à proximité. Quand vous utilisez une arme à distance ayant le trait volée dans cette posture, vous ne subissez pas la pénalité à vos jets d'attaque provenant du trait volée. Lorsque vous utilisez une arme à distance qui n'a pas le trait volée, vous obtenez un bonus de circonstances de +2 aux jets de dégâts sur les attaques contre des cibles situées dans le premier facteur de portée de l'arme.",
};

const reactiveStrike: Action = {
    id: "reactiveStrike",
    name: "Frappe réactive",
    category: "reaction",
    actions: "reaction",
    text:
        "**Déclencheur** Une créature qui se trouve dans votre allonge utilise une action de manipulation ou de déplacement, fait une attaque à distance ou quitte une case lors d'une action de déplacement qu'elle entreprend.\n" +
        "Vous frappez un adversaire qui vous laisse une ouverture. Vous faites une Frappe au corps-à-corps contre la créature déclencheuse. Si votre attaque est un coup critique et que le déclencheur était une action de manipulation, vous interrompez cette action. Cette Frappe n'est pas prise en compte pour calculer votre pénalité d'attaques multiples et votre pénalité d'attaques multiples ne s'applique pas à cette Frappe.",
};

const snaggingStrike: Action = {
    name: "Frappe Déconcertante",
    category: "action",
    actions: "one",
    text:
        "**Conditions** Vous disposez d'une main libre et votre cible est à portée de cette main.\n" +
        "Vous combinez une attaque avec de rapides prises avec la main pour déséquilibrer un ennemi tant qu'il reste dans votre allonge. Portez une Frappe en gardant une main libre. Si cette Frappe touche, la cible est [prise au dépourvu](offGuard) jusqu'au début de votre prochain tour ou jusqu'à ce qu'elle ne soit plus dans l'allonge de votre main, selon ce qui se produit en premier.",
};
const suddenCharge: Action = {
    name: "Charge Soudaine",
    category: "action",
    actions: "two",
    traits: ["sophistication"],
    text: "Après un bref sprint, vous vous précipitez sur un adversaire en le frappant. Vous Vous Déplacez deux fois. Si vous terminez votre déplacement avec au moins un ennemi dans votre allonge au corps-à-corps, vous pouvez faire une Frappe au corps-à-corps. Vous pouvez utiliser la Charge soudaine pour Creuser, Escalader, Nager ou Voler au lieu de Vous Déplacer si vous possédez le type de déplacement correspondant.",
};

const strengthModifiers: Modifier[] = [
    { kind: "attributeArray", array: [3, 1, 2, 0, 1, 0] },
    ...athleticsAce,
];
const dexModifiers: Modifier[] = [
    { kind: "attributeArray", array: [1, 3, 2, 0, 1, 0] },
    {
        kind: "proficiency",
        in: "acrobatics",
        rank: ProficiencyRank.Trained,
        stacks: true,
    },
];

const reachWeaponRecommendation: Modifier = {
    kind: "recommendation",
    for: "weapon",
    value: {
        kind: "contains",
        fieldName: "traits",
        value: "allonge",
    },
};
const oneOrTwoHandsWeaponRecommendation: Modifier = {
    kind: "recommendation",
    for: "weapon",
    value: {
        kind: "has",
        fieldName: "twoHanded",
    },
};

export const fighter: Class = {
    id: "fighter",
    img: "./classes/fighter.png",
    name: "Guerrier",
    flags: [Flag.Combat],
    ref: "https://pf2e.pathfinder-fr.org/classes?name=Guerrier",
    summary:
        "Combattant pour l'honneur, l'appât du gain, la loyauté ou simplement pour le frisson de la bataille, vous êtes un maître incontesté de l'armement et des techniques de combat. Vous combinez vos actions grâce à de savantes combinaisons d'ouvertures, de bottes et de contre-attaques lorsque vos ennemis sont assez imprudents pour baisser leur garde. Que vous soyez chevalier, mercenaire, tireur d'élite ou maître de la lame, vous avez affiné vos compétences martiales jusqu'à en faire un art et vous portez des attaques critiques dévastatrices sur vos ennemis.",
    keyAttributes: [Attribute.Strength, Attribute.Dexterity],
    forbiddenFlaws: [Attribute.Strength, Attribute.Constitution],
    hp: 10,
    skills: 3,
    grants: [
        expert("perception"),
        expert("fortitude"),
        expert("reflexes"),
        trained("will"),
        expert("unarmedAttacks"),
        expert("simpleWeapons"),
        expert("martialWeapons"),
        trained("advancedWeapons"),
        trained("unarmoredDefense"),
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("heavyArmor"),
        trained("fighterClassDC"),
        { kind: "action", ...reactiveStrike },
    ],
    choices: [
        {
            title: "Style de combat",
            description: "Quel genre de Guerrier êtes vous ?",
            options: [
                {
                    name: "Ambidextre",
                    description:
                        "Vous combattez avec votre arme favorite dans une main, et un autre outil – dague, bouclier ou autre – dans votre seconde main.",
                    grants: [
                        ...strengthModifiers,
                        { ...doubleSlice, kind: "action" },
                        { ...oneHandedWeapon, kind: "recommendation" },
                        ...steelShieldActions.map(actionToModifier),
                        steelShieldHp,
                    ],
                },
                {
                    name: "Attaquant mixte",
                    description:
                        "Vous utilisez un style mixte, priviliégiant d'abord le combat à distance et utilisant des armes légères une fois au contact.",
                    grants: [
                        ...dexModifiers,
                        { ...pointBlankStance, kind: "action" },
                        { ...oneHandedWeapon, kind: "recommendation" },
                        ...bucklerActions.map(actionToModifier),
                        bucklerHp,
                    ],
                },
                {
                    name: "Gardien",
                    description:
                        "Vous utilisez une arme avec une grande allonge pour piéger les ennemis et contrôler le champ de bataille, punissant ceux se croyant trop en sécurité.",
                    grants: [
                        ...strengthModifiers,
                        { ...suddenCharge, kind: "action" },
                        reachWeaponRecommendation,
                    ],
                },
                {
                    name: "Une main et demie",
                    description:
                        "Vous utilisez une arme pouvant être utilisée à une ou deux mains, et gardez votre autre main dédiées à diverses techniques de lutte, pour un style mêlant aggressivité et polyvalence.",
                    grants: [
                        ...strengthModifiers,
                        { ...snaggingStrike, kind: "action" },
                        oneOrTwoHandsWeaponRecommendation,
                    ],
                },
            ],
        },
    ],
};
