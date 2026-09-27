import type { ActionCount } from "../actions";
import type { Attribute } from "../rules/attributes";
import type { Modifier } from "../modifiers";
import type { Enum } from "../types";

export const Flag = {
    Combat: "Combat",
    Magic: "Magie",
    Support: "Soutien",
    Questing: "Quêtes",
} as const;
export type Flag = Enum<typeof Flag>;

type FirstOptionRequirement = {
    kind: "firstOption";
    value: string;
};
type AncestryFlawRequirement = {
    kind: "ancestryFlaw";
    isNot: Attribute;
};
export type OptionRequirement =
    | AncestryFlawRequirement
    | FirstOptionRequirement;

export type ClassChoiceOption = {
    name: string;
    description: string;
    actions?: ActionCount;
    requirement?: OptionRequirement[];
    grants: Modifier[];
};

export type ClassChoice = {
    title: string;
    description: string;
    options: ClassChoiceOption[];
};

export type Class = {
    id: string;
    img: string;
    name: string;
    flags: Flag[];
    ref: string;
    summary: string;
    keyAttributes: Attribute[];
    forbiddenFlaws?: Attribute[];
    hp: number;
    skills: number;
    firstChoice: ClassChoice;
    secondChoice?: ClassChoice;
    grants?: Modifier[];
};
