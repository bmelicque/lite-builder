import {
    acrobatics,
    athletics,
    intimidation,
    type Skill,
} from "./rules/skills";

export type ActionCount =
    | "reaction"
    | "free"
    | "one"
    | "two"
    | "three"
    | "one-two"
    | "one-three";

export type Action = {
    id?: string;
    combat?: true;
    name: string;
    traits?: string[];
    category:
        | "strike"
        | "impulse"
        | "alchemy"
        | "cantrip"
        | "focus"
        | "spell"
        | "spell1"
        | "action"
        | "reaction";
    actions?: ActionCount;
    skill?: Skill;
    proficiency?: string;
    attack?: boolean;
    modifiers?: string;
    range?: number;
    text: string;
};

export type Passive = {
    id?: string;
    combat?: true;
    name: string;
    traits?: string[];
    skill?: Skill;
    text: string;
};

export const disarm: Action = {
    id: "disarm",
    combat: true,
    name: "Désarmer",
    category: "action",
    actions: "one",
    skill: athletics,
    attack: true,
    text:
        "**Conditions** Vous disposez d'au moins une main libre. La cible ne peut pas être de plus d'une catégorie de taille supérieure à la vôtre.\n" +
        "Vous essayez de faire tomber un objet de la prise d'une créature. Effectuez un test d' Athlétisme contre le DD de Réflexes de l'adversaire.\n" +
        "**Réussite critique** Vous faites tomber l'objet de la main de la cible. Il tombe au sol dans l'espace de la cible.\n" +
        "**Réussite** Vous affaiblissez la prise de votre adversaire sur l'objet. Les tentatives ultérieures pour Désarmer la cible de cet objet bénéficient d'un bonus de circonstances de +2 et la cible subit une pénalité de circonstances de -2 aux attaques effectuées avec l'objet ou à d'autres tests nécessitant une prise ferme sur l'objet. La créature peut mettre un terme à cet effet en [Interagissant](interact) pour modifier sa prise sur l'objet. À défaut, cela dure tant que la créature tient l'objet.\n" +
        "**Échec critique** Vous perdez l'équilibre et êtes [pris au dépourvu](offGuard) jusqu'au début de votre prochain tour.",
};

export const climb: Action = {
    id: "climb",
    name: "Escalader",
    traits: ["déplacement"],
    category: "action",
    actions: "one",
    skill: athletics,
    text:
        "**Conditions** Vos deux mains sont libres.\n" +
        "Vous tentez un test d'Athlétisme pour monter de 1,50 mètre vers le haut ou le bas. Vous êtes [pris au dépourvu](offGuard) lorsque vous Escaladez, sauf si vous possédez une Vitesse d'escalade. Si votre Vitesse est de 12 mètres ou supérieure, augmentez la distance que vous pouvez Escalader de 1,50 mètre pour chaque tranche de 6 mètres au-dessus d'une Vitesse de 6 mètres.\n" +
        "**Réussite critique** Vous vous déplacez en augmentant la distance maximale de 1,50 mètre.\n" +
        "**Réussite** Vous vous déplacez dans la direction souhaitée.\n" +
        "**Échec critique** Vous chutez. Si vous avez commencé votre escalade sur un sol stable, vous chutez et tombez [à terre](prone).",
};

export const demoralize: Action = {
    id: "demoralize",
    combat: true,
    name: "Démoraliser",
    traits: ["audible", "concentration", "peur"],
    category: "action",
    actions: "one",
    skill: intimidation,
    text:
        "**Portée** 9 mètres ; **Défense** Volonté ; **Immunité** 10 minutes.\n" +
        "D'un cri soudain, d'une raillerie bien sentie ou d'une réplique tranchante, vous pouvez ébranler la détermination d'un ennemi. Tentez un test d'Intimidation contre la Volonté de la cible. Si la cible ne comprend pas la langue que vous parlez, vous subissez un malus de circonstances de -4 au test.\n" +
        "**Réussite critique** La cible devient [effrayée 2](frightened).\n" +
        "**Réussite** La cible devient effrayée 1.",
};

export const highJump: Action = {
    id: "highJump",
    name: "Saut en hauteur",
    traits: ["déplacement"],
    category: "action",
    actions: "two",
    skill: athletics,
    text:
        "[Déplacez-vous](stride) d'au moins 3 mètres pour prendre de l'élan, puis tentez un test d'Athlétisme DD 30 pour augmenter la hauteur de votre saut.\n" +
        "**Réussite critique** Vous sautez jusqu'à 2,40 mètres verticalement et jusqu'à 3 mètres horizontalement.\n" +
        "**Réussite** Vous sautez jusqu'à 1,50 mètre verticalement et jusqu'à 1,50 mètre horizontalement.\n" +
        "**Échec** Vous Sautez normalement.\n" +
        "**Échec critique** Vous tombez [à terre](prone) dans votre espace.",
};

export const longJump: Action = {
    id: "longJump",
    name: "Saut en longueur",
    traits: ["déplacement"],
    category: "action",
    actions: "two",
    skill: athletics,
    text:
        "Vous [Vous déplacez](stride) d'au mons 3 mètres pour prendre de l'élan, puis faites un test d'Athlétisme contre un DD 15 pour faire un saut en longueur dans la même direction.\n" +
        "**Réussite** Vous Sautez en franchissant 1,50 mètre par tranche de 5 sur le jet, arrondi à l'inférieur. Vous ne pouvez pas franchir une distance supérieure à votre Vitesse au sol.\n" +
        "**Échec** Vous faites un Saut horizontal normal.\n" +
        "**Échec critique** Vous faites un Saut horizontal normal, puis chutez et vous retrouvez [à terre](prone).",
};

export const raiseAShield = {
    id: "raiseAShield",
    combat: true,
    name: "Lever un bouclier",
    category: "action",
    actions: "one",
    text:
        "**Conditions** Vous maniez un bouclier.\n" +
        "Vous positionnez votre bouclier pour vous protéger. Quand vous avez Levé un bouclier, ajoutez son bonus de circonstances indiqué à votre CA. Votre bouclier reste levé jusqu'au début de votre prochain tour.",
} as const satisfies Action;

export const reposition: Action = {
    id: "reposition",
    combat: true,
    name: "Repositionner",
    category: "action",
    actions: "one",
    skill: athletics,
    attack: true,
    text:
        "**Conditions** Vous disposez d'au moins une main libre ou saisissez ou entravez la cible. La cible ne peut être de plus d'une taille supérieure à la vôtre.\n" +
        "Vous déplacez une créature ou un objet autour de vous. Faites un test d'Athlétisme contre le DD de Vigueur de la cible.\n" +
        "**Réussite critique** Vous déplacez la créature de 3 mètres. Elle doit rester dans votre allonge durant ce déplacement et vous ne pouvez la déplacer dans ou à travers des obstacles.\n" +
        "**Réussite** Vous déplacez la créature de 1,50 mètre. Elle doit rester dans votre allonge durant ce déplacement et vous ne pouvez la déplacer dans ou à travers des obstacles.\n" +
        "**Échec critique** La cible peut vous déplacer de 1,50 mètre comme si elle était parvenue à vous Repositionner avec succès.",
};

export const shove: Action = {
    id: "shove",
    combat: true,
    name: "Pousser",
    category: "action",
    actions: "one",
    skill: athletics,
    attack: true,
    text:
        "**Conditions** Vous disposez d'au moins une main libre. La cible ne peut pas être de plus d'une catégorie de taille supérieure à la vôtre.\n" +
        "Vous repoussez un adversaire loin de vous. Faites un test d'Athlétisme contre le DD de Vigueur de votre adversaire.\n" +
        "**Réussite critique** Vous repoussez votre adversaire à 3 mètres de vous. Vous pouvez [Vous déplacer](stride) pour le suivre.\n" +
        "**Réussite** Vous repoussez votre adversaire de 1,50 mètre. Vous pouvez [Vous déplacer](stride) pour le suivre.\n" +
        "**Échec critique** Vous perdez l'équilibre, chutez et tombez [à terre](prone).",
};

export const swim: Action = {
    id: "swim",
    name: "Nager",
    traits: ["déplacement"],
    category: "action",
    actions: "one",
    skill: athletics,
    text:
        "Vous tentez un test d'Athlétisme pour vous déplacer d'une distance de 3 mètres dans l'eau. Si votre Vitesse au sol est d'au moins 12 mètres, augmentez la distance maximale possible de déplacement de 1,50 mètre et de 1,50 mètre par tranche de 6 mètres au delà de 6 mètres.\n" +
        "Si vous terminez votre tour dans l'eau et que vous n'avez pas obtenu un succès sur une action pour Nager au cours de ce tour, vous coulez de 3 mètres ou vous êtes emporté par le courant, au choix du MJ. Cela ne s'applique pas si votre dernière action lors de votre tour consistait à pénétrer dans l'eau.\n" +
        "**Réussite critique** Vous vous déplacez dans l'eau, en augmentant de 1,50 mètre la distance maximale.\n" +
        "**Réussite** Vous vous déplacez dans l'eau.\n" +
        "**Échec critique** Vous ne progressez pas. Si vous reteniez votre souffle, vous perdez un round d'air.",
};

export const trip: Action = {
    id: "trip",
    combat: true,
    name: "Croc-en-jambe",
    category: "action",
    actions: "one",
    skill: athletics,
    attack: true,
    text:
        "**Conditions** Vous disposez d'au moins une main libre. Votre cible ne peut pas être de plus d'une catégorie de taille supérieure à la vôtre.\n" +
        "Vous tentez de faire tomber un adversaire. Faites un test d' Athlétisme contre le DD de Réflexes de la cible.\n" +
        "**Réussite critique** La cible chute, se retrouve [à terre](prone) et subit 1d6 dégâts contondants.\n" +
        "**Réussite** La cible chute et se retrouve à terre.\n" +
        "**Échec critique** Vous perdez l'équilibre, chutez et vous retrouvez [à terre](prone).",
};

export const tumbleThrough: Action = {
    id: "tumbleThrough",
    combat: true,
    name: "Déplacement acrobatique",
    traits: ["déplacement"],
    category: "action",
    actions: "one",
    skill: acrobatics,
    text:
        "Vous [Vous déplacez](stride). Pendant ce déplacement, vous pouvez tenter de traverser l'espace occupé par un ennemi. Effectuez un test d'Acrobaties contre les Réflexes de l'ennemi.\n" +
        "**Réussite** Vous traversez l'espace occupé par l'ennemi en le considérant comme un terrain difficile.\n" +
        "**Échec** Votre mouvement se termine devant l'ennemi, et vous déclenchez d'éventuelles réactions déclenchées par les mouvements.",
};
