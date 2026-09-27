import { Attribute } from "./attributes";

export type Skill = {
    id: string;
    name: string;
    summary: string;
    attribute: Attribute;
};

export const acrobatics: Skill = {
    id: "acrobatics",
    name: "Acrobatie",
    summary:
        "L'Acrobatie mesure votre capacité à accomplir des tâches nécessitant coordination et grâce.",
    attribute: Attribute.Dexterity,
} as const satisfies Skill;

export const arcana = {
    id: "arcana",
    name: "Arcane",
    summary:
        "L'Arcanes mesure vos connaissances en matière de magie et de créatures arcaniques.",
    attribute: Attribute.Intelligence,
} as const satisfies Skill;

export const athletics: Skill = {
    id: "athletics",
    name: "Athlétisme",
    summary:
        "L'athlétisme vous permet d'accomplir des prouesses physiques. La plupart des actions d'Athlétisme vous permettent de vous déplacer ou de contrôler les mouvements de votre adversaire au combat.",
    attribute: Attribute.Strength,
} as const;

export const crafting = {
    id: "crafting",
    name: "Artisanat",
    summary:
        "Vous pouvez utiliser cette compétence pour créer et réparer des objets.",
    attribute: Attribute.Intelligence,
} as const satisfies Skill;

export const deception = {
    id: "deception",
    name: "Duperie",
    summary:
        "Vous pouvez tromper et induire autrui en erreur en recourant à des déguisements, des mensonges et d'autres formes de subterfuges.",
    attribute: Attribute.Charisma,
} as const satisfies Skill;

export const diplomacy = {
    id: "diplomacy",
    name: "Diplomatie",
    summary:
        "Vous influencez les autres par la négociation et la flatterie, ou obtenez des informations grâce à des conversations amicales.",
    attribute: Attribute.Charisma,
} as const satisfies Skill;

export const intimidation = {
    id: "intimidation",
    name: "Intimidation",
    summary:
        "Vous pliez les autres à votre volonté en recourant à des menaces.",
    attribute: Attribute.Charisma,
} as const satisfies Skill;

export const medicine = {
    id: "medicine",
    name: "Médecine",
    summary:
        "Vous pouvez soigner des blessures et aider les gens à se remettre de maladies et d'empoisonnements.",
    attribute: Attribute.Wisdom,
} as const satisfies Skill;

export const nature = {
    id: "nature",
    name: "Nature",
    summary:
        "Vous connaissez le monde naturel, et vous commandez et dressez des animaux ainsi que des créatures magiques.",
    attribute: Attribute.Wisdom,
} as const satisfies Skill;

export const occultism = {
    id: "occultism",
    name: "Occultisme",
    summary:
        "Vous possédez une vaste connaissance des philosophies anciennes, des savoirs ésotériques, du mysticisme obscur et des créatures surnaturelles.",
    attribute: Attribute.Intelligence,
} as const satisfies Skill;

export const performance = {
    id: "performance",
    name: "Représentation",
    summary:
        "Vous maîtrisez une forme de spectacle et mettez vos talents à profit pour impressionner une foule ou gagner votre vie.",
    attribute: Attribute.Charisma,
} as const satisfies Skill;

export const religion = {
    id: "religion",
    name: "Religion",
    summary:
        "Les secrets des divinités, des dogmes et de la foi, ainsi que les domaines de créatures divines et de leur magie, vous sont accessibles.",
    attribute: Attribute.Wisdom,
} as const satisfies Skill;

export const society = {
    id: "society",
    name: "Société",
    summary:
        "Vous comprenez les personnes et les systèmes qui assurent le fonctionnement de la civilisation, et vous connaissez les événements historiques qui ont façonné les sociétés actuelles.",
    attribute: Attribute.Intelligence,
} as const satisfies Skill;

export const stealth: Skill = {
    id: "stealth",
    name: "Discrétion",
    summary:
        "Vous excellez à échapper à la vigilance d'autrui, ce qui vous permet de vous faufiler devant vos ennemis, de vous cacher ou de dissimuler un objet.",
    attribute: Attribute.Dexterity,
} as const satisfies Skill;

export const survival = {
    id: "survival",
    name: "Survie",
    summary:
        "Vous excellez dans la vie en pleine nature, sachant trouver de la nourriture et construire un abri ; grâce à l'entraînement, vous découvrez les secrets du pistage et de la dissimulation de vos traces.",
    attribute: Attribute.Wisdom,
} as const satisfies Skill;

export const thievery: Skill = {
    id: "thievery",
    name: "Larcin",
    summary:
        "Vous avez été formé à un ensemble de compétences prisées des voleurs et des malandrins.",
    attribute: Attribute.Dexterity,
} as const satisfies Skill;

export const skills = [
    acrobatics,
    arcana,
    athletics,
    crafting,
    deception,
    diplomacy,
    intimidation,
    medicine,
    nature,
    occultism,
    performance,
    religion,
    society,
    stealth,
    survival,
    thievery,
].sort((a, b) => a.name.localeCompare(b.name));
