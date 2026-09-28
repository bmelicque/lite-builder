import {
    acidFlask,
    alchemistsFire,
    antidote,
    antiplague,
    bottledLightning,
    cheetahsElixir,
    elixirOfLife,
    frostVial,
    glueBomb,
    smokeBall,
} from "../items/alchemical";
import { expert, trained, type Modifier } from "../modifiers";
import { Attribute } from "../rules/attributes";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const quickBomber: Modifier = {
    kind: "actionModifier",
    selector: { kind: "trait", value: "bombe" },
    onField: "actions",
    modification: { kind: "replace", value: "one" },
};
const bomberText =
    "Lorsque vous lancez une bombe alchimique avec le trait [éclaboussure](splash), vous pouvez choisir d'infliger des dégâts d'éclaboussure uniquement à votre cible primaire au lieu de la zone d'éclaboussure habituelle.";
const bomber: ClassChoiceOption = {
    name: "Artificier",
    description:
        "_Vous vous spécialisez dans les explosions et les réactions alchimiques violentes_.\n" +
        bomberText,
    grants: [
        { kind: "action", ...acidFlask },
        { kind: "action", ...bottledLightning },
        { kind: "passive", name: "Artificier", text: bomberText },
        { kind: "secondaryAttribute", value: Attribute.Dexterity },
        { kind: "secondaryAttribute", value: Attribute.Constitution },
        quickBomber,
    ],
};

const chirurgeonText =
    "Vous pouvez utiliser votre degré de maîtrise en Artisanat pour tout ce qui nécessite un degré de maîtrise en Médecine et utiliser votre modificateur d'Artisanat à la place de votre modificateur de Médecine pour tous les tests de Médecine.";
const chirurgeon: ClassChoiceOption = {
    name: "Chirurgien",
    description:
        "_Vous vous concentrez principalement sur les soins que vous apportez aux autres avec votre alchimie_.\n" +
        chirurgeonText,
    grants: [
        // TODO: formulas
        { kind: "action", ...antidote },
        { kind: "action", ...antiplague },
        { kind: "passive", name: "Chirurgien", text: chirurgeonText },
    ],
};

const mutagenist: ClassChoiceOption = {
    name: "Mutagéniste",
    description:
        "_Vous vous concentrez sur les bizarres transformations mutagènes qui sacrifient un aspect physique ou psychologique d'une créature pour en renforcer un autre_.\n" +
        "Lorsque vous utilisez un mutagène, vous gagnez un nombre de Points de vie temporaires égal à votre modificateur d'Intelligence (minimum 0) plus la moitié de votre niveau.",
    grants: [
        // TODO: formulas
        // TODO: mutagenist vial
        {
            kind: "passive",
            name: "Mutagéniste",
            text: "Lorsque vous utilisez un mutagène, vous gagnez {{intelligence + floor(level/2)}} Points de vie temporaires. Ces Points de vie temporaires durent pendant 1 minute ou jusqu'à l'expiration de la durée du mutagène selon ce qui se produit en premier. Vous ne pouvez pas obtenir des Points de vie temporaires en buvant de nouveau un mutagène pendant 1 minute.",
        },
        { kind: "secondaryAttribute", value: Attribute.Dexterity },
        { kind: "secondaryAttribute", value: Attribute.Constitution },
    ],
};

const toxicologist: ClassChoiceOption = {
    name: "Toxicologue",
    description:
        "_Vous vous spécialisez dans les toxines et les venins de toutes sortes_.\n" +
        "Vous pouvez appliquer un poison de blessure par une unique action (au lieu de deux). De plus, vous mélangez habilement des composés alchimiques acides et toxiques, permettant à vos poisons d'affecter les créatures qui y sont normalement immunisées.",
    grants: [
        // TODO: formulas
        {
            kind: "passive",
            name: "Toxicologue",
            text: "Vous pouvez appliquer un poison de blessure par une unique action (au lieu de deux). Il peut s'agir d'un objet que vous tenez déjà, ou vous pouvez Interagir pour en dégainer ou en fabriquer un dans le cadre de cette action unique. De plus, vous mélangez avec souplesse des composés alchimiques acides et toxiques. Vos objets imprégnés dotés du trait poison peuvent affecter les créatures immunisées contre le poison. Une créature subit des dégâts d'acide au lieu de dégâts de poison de vos objets imprégnés de cette façon si la créature est immunisée contre le poison ou si cela serait plus préjudiciable à la créature.",
        },
    ],
};

export const alchemist: Class = {
    id: "alchemist",
    img: "./classes/alchemist.png",
    name: "Alchimiste",
    flags: [Flag.Questing, Flag.Support],
    ref: "https://pf2e.pathfinder-fr.org/classes?name=Alchimiste",
    summary:
        "Il n'y a rien de plus beau à vos yeux qu'un étrange breuvage en train de bouillonner dans un bécher et vous consommez vos ingénieux élixirs sans modération. Vous êtes fasciné par la découverte des secrets de la science et du monde naturel et, pour faire face à toutes éventualités, vous expérimentez constamment des concoctions inventives dans votre laboratoire ou à la volée. Vous faites preuve d'une audace sans faille face au risque, lançant des créations explosives ou toxiques sur vos ennemis. Votre chemin unique vers la gloire est jalonné de breuvages alchimiques qui repoussent les limites de votre esprit et de votre corps.",
    keyAttributes: [Attribute.Intelligence],
    forbiddenFlaws: [Attribute.Intelligence],
    hp: 8,
    skills: 7,
    firstChoice: {
        title: "Champ de recherche",
        description:
            "Vos études de la nature alchimique de l'univers vous a mené à vous concentrer sur un champ de recherche spécifique. Ce choix vous donne davantage de formules et d'autres avantages lorsque vous gagnez des niveaux.",
        options: [bomber, chirurgeon, mutagenist, toxicologist],
    },
    grants: [
        trained("perception"),
        expert("fortitude"),
        expert("reflex"),
        expert("will"),
        // TODO: replace with ACE
        trained("crafting"),
        trained("unarmedAttacks"),
        trained("simpleWeapons"),
        trained("alchemicalBombs"),
        trained("unarmoredDefense"),
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("alchemistClassDC"),
        { kind: "keyAttribute", value: Attribute.Intelligence },
        { kind: "action", ...alchemistsFire },
        { kind: "action", ...frostVial },
        { kind: "action", ...cheetahsElixir },
        { kind: "action", ...elixirOfLife },
        { kind: "action", ...glueBomb },
        { kind: "action", ...smokeBall },
    ],
};
