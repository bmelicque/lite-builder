import type { Action, Passive } from "../actions";
import { ProficiencyRank } from "../proficiencies";
import { athletics, diplomacy, thievery } from "../skills";

export const bonMot: Action = {
    id: "bonMot",
    name: "Bon mot",
    traits: ["audible", "émotion", "linguistique"],
    category: "action",
    actions: "one",
    skill: diplomacy,
    text:
        "Vous lancez une pique bien sentie à un ennemi pour le distraire. Choisissez un ennemi situé à 9 mètres ou moins de vous et lancez un test de Diplomatie contre son DD de Volonté.\n" +
        "**Réussite critique** La cible est distraite et subit une pénalité de statut de -3 aux tests de Perception et aux jets de Volonté pendant 1 minute.\n" +
        "**Réussite** Comme en cas de succès critique, mais la pénalité est de -2.\n" +
        "**Échec critique** Votre trait d'esprit est atroce. Vous subissez la même pénalité que celle que l'ennemi aurait subi si vous aviez obtenu un succès. Cette pénalité prend fin après 1 minute ou dès que vous réussissez à placer un autre Bon mot.",
} as const;

export const combatClimber = {
    kind: "passive",
    id: "combatClimber",
    name: "Combattant-grimpeur",
    proficiency: "athletics",
    rank: ProficiencyRank.Trained,
    description:
        "Vos techniques vous permettent de combattre quand vous escaladez. Vous n'êtes pas [pris au dépourvu](offGuard) pendant que vous [Escaladez](climb) et vous pouvez Escalader avec une main occupée. Vous devez toujours utiliser l'autre main et vos deux jambes pour Escalader.",
} as const;

export const dirtyTrick: Action = {
    id: "dirtyTrick",
    name: "Sale coup",
    traits: ["manipulation"],
    category: "action",
    actions: "one",
    skill: thievery,
    attack: true,
    text:
        "Conditions Vous disposez d'une main libre et avez un adversaire dans votre allonge au corps-à-corps.\n" +
        "Vous accrochez les lacets des chaussures d'un ennemi, vous tirez son chapeau sur ses yeux, vous desserrez sa ceinture ou vous perturbez sa mobilité par une tactique déloyale. Faites un test de Larcin contre le DD de Réflexes de la cible.\n" +
        "**Réussite critique** La cible est maladroite 1 jusqu'à ce qu'elle utilise une action Interagir pour mettre un terme à l'entrave.\n" +
        "**Réussite** Comme en cas de succès critique mais l'état cesse automatiquement après 1 round.\n" +
        "**Échec critique** Vous vous retrouvez À terre lorsque votre tentative se retourne contre vous.",
};

export const fascinatingPerformance = {
    kind: "passive",
    id: "fascinatingPerformance",
    name: "Représentation fascinante",
    proficiency: "performance",
    rank: ProficiencyRank.Trained,
    description:
        "Quand vous [Vous produisez](perform), comparez votre résultat au DD de Volonté d'un observateur. Si vous obtenez un succès, la cible est [Fascinée](fascinated) pendant 1 round. Si l'observateur est dans une situation qui nécessite une attention immédiate, telle qu'un combat, vous devez obtenir un succès critique pour le fasciner et l'action obtient le trait [mise hors de combat](incapacitation). Vous devez choisir quelle créature vous tentez de fasciner avant d'effectuer votre test et la cible est ensuite temporairement immunisée pendant 1 heure.\n" +
        "Si vous êtes expert en Représentation, vous pouvez fasciner jusqu'à quatre observateurs. Si vous êtes maître, vous pouvez fasciner jusqu'à dix observateurs et si vous êtes légendaire, vous pouvez fasciner n'importe quel nombre d'observateurs en même temps.",
} as const;

export const quickJump: Passive = {
    id: "quickJump",
    name: "Saut rapide",
    skill: athletics,
    text: "Vous pouvez [Sauter en hauteur](highJump) ou [Sauter en longueur](longJump) par une action unique au lieu de 2 actions. Si vous le faites, vous n'avez pas besoin de prendre d'élan.",
};

export const intimidatingGlare = {
    kind: "passive",
    id: "intimidatingGlare",
    name: "Regard intimidant",
    proficiency: "intimidation",
    rank: ProficiencyRank.Trained,
    description:
        "Vous pouvez [Démoraliser](demoralize) d'un simple regard. Quand vous le faites, Démoraliser perd le trait audible et obtient le trait visuel et vous ne subissez pas de pénalité si la créature ne comprend pas votre langue.",
} as const;

export const underwaterMarauder = {
    kind: "passive",
    id: "underwaterMarauder",
    name: "Maraudeur aquatique",
    proficiency: "athletics",
    rank: ProficiencyRank.Trained,
    description:
        "Vous avez appris à combattre sous l'eau. Vous n'êtes pas [pris au dépourvu](offGuard) lorsque vous êtes dans l'eau et vous ne subissez pas les pénalités habituelles lorsque vous utilisez une arme de corps-à-corps contondante ou tranchante dans l'eau.",
} as const;
