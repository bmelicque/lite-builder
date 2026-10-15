import { DamageType, weapons } from "../items/weapons";
import { expert, trained, type ExtraStrikeDamage } from "../modifiers";
import { ProficiencyRank } from "../proficiencies";
import { Attribute } from "../rules/attributes";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const slingersPrecision: ExtraStrikeDamage = {
    kind: "extraStrikeDamage",
    condition: { kind: "value", fieldName: "group", value: "firearm" },
    type: DamageType.Precision,
    damage: { diceSize: 4, diceCount: 1 },
};

const drifter: ClassChoiceOption = {
    name: "Vagabond",
    description:
        "Vous êtes un vagabond qui parcourt les contrées, avec pour seuls compagnons votre arme à feu et une arme de corps à corps. Vous remportez vos combats en misant sur votre mobilité et sur une utilisation polyvalente de vos armes.",
    grants: [
        trained("acrobatics"),
        {
            kind: "action",
            combat: true,
            name: "Frappe et recharge",
            category: "action",
            actions: "one",
            text:
                "**Conditions** Vous tenez une arme à feu dans une main, tandis que votre autre main tient une arme de corps à corps à une main ou reste libre.\n" +
                "Vous effectuez une attaque au corps à corps, puis vous rechargez votre arme à feu en un seul mouvement fluide. Portez un Frappe de corps-à-corps à un adversaire à portée, puis [Interagissez](interact) pour recharger. Vous n'avez pas besoin d'avoir une main libre pour recharger de cette manière, et ce rechargement ne provoque pas de réactions.",
        },
        {
            kind: "action",
            combat: true,
            name: "Dans la mêlée",
            category: "reaction",
            actions: "free",
            text:
                "**Déclencheur** Vous lancez l'initiative.\n" +
                "Vous savez que le danger peut surgir à tout moment, et vos mains ne s'éloignent jamais beaucoup de vos étuis. Vous pouvez [Interagir](interact) pour dégainer une arme à distance à une main, puis pour dégainer une arme de corps à corps à une main. En guise de première action lors de votre premier tour, vous pouvez [Vous Déplacer](stride) en tant qu'action gratuite, uniquement pour vous rapprocher d'un ennemi que vous pouvez percevoir.",
        },
        {
            kind: "passive",
            combat: true,
            name: "Épée et pistolet",
            text:
                "Vous maniez avec aisance une arme à feu d'une main, tout en tenant une arme de corps à corps dans l'autre, combinant ainsi tirs et attaques au corps à corps.\n" +
                "Lorsque vous réussissez une attaque à distance contre un ennemi situé à votre portée à l'aide d'une arme à feu, cet ennemi devient [pris au dépourvu](offGuard) face à votre prochaine attaque au corps à corps effectuée avec une arme à une main.\n" +
                "Lorsque vous réussissez une attaque au corps à corps contre un ennemi avec une arme à une main, la prochaine attaque à distance que vous portez contre ce même ennemi à l'aide d'une arme à feu ne déclenche pas les réactions qui se produiraient lors d'une attaque à distance mais pas lors d'une attaque au corps à corps.\n" +
                "L'un ou l'autre de ces avantages est perdu s'il n'est pas utilisé avant la fin de votre prochain tour.",
        },
        { kind: "weapon", ...weapons.flintlockPistol },
        { kind: "weapon", ...weapons.shortswort },
        { kind: "attributeArray", array: [1, 3, 2, 0, 1, 0] },
    ],
};

const pistolero: ClassChoiceOption = {
    name: "Pistolero",
    description:
        "Que vous soyez un duelliste professionnel ou un artiste maniant ses pistolets avec virtuosité, vous possédez une agilité et une rapidité qui ne vous font jamais défaut, doublées d'un esprit vif et d'une langue acérée qui piquent vos adversaires. Vous pouvez choisir de garder une main libre ou de cultiver une ambidextrie vous permettant de manier deux armes simultanément. Dans les deux cas, vous restez suffisamment près de vos ennemis pour tirer parti de vos réflexes supérieurs, tout en conservant assez d'espace pour faire feu en toute sécurité.",
    grants: [
        trained("deception"),
        trained("intimidation"),
        {
            kind: "action",
            combat: true,
            name: "Recharge du conteur",
            category: "action",
            actions: "one",
            text: "Vos paroles, qu'elles soient rapides ou percutantes, détournent l'attention de vos ennemis de vos mains, vous laissant juste assez de temps pour chambrer une nouvelle balle. [Interagissez](interact) pour recharger, puis tentez de [Créer une diversion](createADiversion) ou de [Démoraliser](demoralize).",
        },
        {
            kind: "action",
            combat: true,
            name: "Dix pas",
            category: "reaction",
            actions: "free",
            text:
                "**Déclencheur** Vous lancez l'initiative.\n" +
                "Vous réagissez aux problèmes avec une rapidité fulgurante, en vous plaçant exactement là où il faut. Vous bénéficiez d'un bonus de circonstances de +2 à votre jet d'initiative et vous pouvez [Interagir](interact) pour dégainer une arme à feu à une main. En guise de première action lors de votre premier tour, vous pouvez [Faire un pas](step) sur une distance maximale de 3 mètres en tant qu'action gratuite.",
        },
        { kind: "weapon", ...weapons.flintlockPistol },
        { kind: "attributeArray", array: [0, 3, 1, 0, 1, 2] },
    ],
};

const sniper: ClassChoiceOption = {
    name: "Tireur d'élite",
    description:
        "Vous pratiquez un style de tir qui repose sur une précision infaillible et un placement parfait de votre premier coup. Vous restez dissimulé ou à distance, à l'écart de la mêlée, pour infliger une mort invisible à vos ennemis.",
    grants: [
        trained("stealth"),
        {
            kind: "action",
            combat: true,
            name: "Recharge à couvert",
            category: "action",
            actions: "one",
            text: "Vous vous mettez à couvert  pendant que vous rechargez pour effectuer votre prochaine attaque. [Mettez-vous à couvert](takeCover) ou tenter de [Vous cacher](hide), puis [Interagissez](interact) pour recharger. Comme d'habitude, vous devez remplir les conditions requises pour vous mettre à couvert ou vous cacher.",
        },
        {
            kind: "action",
            combat: true,
            name: "Un tir, une mort",
            category: "reaction",
            actions: "free",
            text:
                "**Déclencheur** Vous utilisez Discrétion pour un jet d'initiative.\n" +
                "Votre premier tir est le plus mortel. [Interagissez](interact) pour dégainer une arme à feu. Votre première Frappe réussie avec cette arme au cours de cet affrontement inflige 1d6 dégâts de précision supplémentaires.",
        },
        {
            kind: "action",
            combat: true,
            name: "À terre !",
            category: "reaction",
            actions: "reaction",
            text:
                "**Déclencheur** Une créature que vous pouvez voir tente une attaque à distance contre vous.\n" +
                "Vous vous jetez hors de portée du danger. Vous [Bondissez](leap). Votre déplacement vous confère un bonus de circonstances de +2 à la CA contre l'attaque déclencheuse. Que l'attaque déclencheuse vous touche ou non, vous terminez votre bond [au sol](prone).",
        },
        { kind: "weapon", ...weapons.flintlockMusket },
        { kind: "attributeArray", array: [2, 3, 1, 0, 1, 0] },
    ],
};

export const gunslinger: Class = {
    id: "gunslinger",
    img: "./classes/gunslinger.png",
    name: "Franc-tireur",
    flags: [Flag.Combat],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=20",
    summary:
        "Alors que certains redoutent les armes à projectiles, vous, vous savourez l'éclat fulgurant, le recul brutal et la fumée âcre qui accompagnent un coup de feu ; ou encore le claquement de la corde et le bruit sourd, caractéristique, de votre arbalète, juste avant que votre carreau ne trouve sa cible. Toujours prêt à viser un ennemi, vous misez sur vos réflexes, la fermeté de votre main et la parfaite maîtrise de vos armes pour cribler vos adversaires d'impacts.",
    keyAttributes: [Attribute.Dexterity],
    forbiddenFlaws: [Attribute.Dexterity],
    hp: 8,
    skills: 3,
    grants: [
        expert("perception"),
        expert("fortitude"),
        expert("reflex"),
        trained("will"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmedAttacks"),
        {
            kind: "proficiency",
            in: "firearm",
            rank: ProficiencyRank.Trained,
            stacks: true,
        },
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("unarmoredDefense"),
        trained("gunslingerClassDC"),
        slingersPrecision,
    ],
    choices: [
        {
            title: "Voie",
            description:
                "Vous apprenez un style de combat particulier, appelé « voie ». Votre voie vous confère une série d'exploits, l'accès à des dons, la maîtrise d'une compétence ainsi qu'une action de rechargement spéciale ; autant d'éléments qui contribuent à définir et à influencer votre manière d'agir sur le champ de bataille.",
            options: [drifter, pistolero, sniper],
        },
    ],
};
