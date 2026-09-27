import type { Action, Passive } from "./actions";
import type { Attribute } from "./attributes";
import type { Character } from "./character";
import type { Weapon } from "./items/weapons";
import { ProficiencyRank, type Proficiency } from "./proficiencies";
import type { Recommendation } from "./recommendations";
import type { Skill } from "./skills";

/**
 * Modifies an existing action
 */
export type ActionModifier = {
    kind: "actionModifier";
    actionId: string;
    modification: "push";
    onField: string;
    value: any;
};

export type AttributeRecommandation = {
    kind: "attributeRecommendation";
    values: Attribute[];
};
export function isAttributeRecommendation(
    m: Modifier,
): m is AttributeRecommandation {
    return m.kind === "attributeRecommendation";
}

export type ExtraSkill = Skill & { kind: "extraSkill" };

export type GrantedAction = { kind: "action" } & Action;
export function isGrantedAction(m: Modifier): m is GrantedAction {
    return m.kind === "action";
}
export function actionToModifier(a: Action): Modifier {
    return { ...a, kind: "action" };
}
export type GrantedPassive = { kind: "passive" } & Passive;
export function isGrantedPassive(m: Modifier): m is GrantedPassive {
    return m.kind === "passive";
}
export type GrantedWeapon = { kind: "weapon" } & Weapon;

export type KeyAttribute = {
    kind: "keyAttribute";
    value: Attribute;
};
export function isKeyAttribute(m: Modifier): m is KeyAttribute {
    return m.kind === "keyAttribute";
}

export type KnownItems = {
    kind: "knownItems";
    forCategory: string;
    count: number;
};

export type HpModifier = { kind: "hp"; value: number; perLevel: boolean };
export function isHpModifier(m: Modifier): m is HpModifier {
    return m.kind === "hp";
}
/** Other HP banks, such as shields, companions, etc. */
export type HpBank = { kind: "hpBank"; name: string; value: number };

type ProficiencyModifier = Proficiency & { kind: "proficiency" };
export function isProficiency(m: Modifier): m is ProficiencyModifier {
    return m.kind === "proficiency";
}
export function trained(in_: string, stacks?: boolean): ProficiencyModifier {
    return {
        kind: "proficiency",
        in: in_,
        rank: ProficiencyRank.Trained,
        stacks,
    };
}
export function expert(in_: string, stacks?: boolean): ProficiencyModifier {
    return {
        kind: "proficiency",
        in: in_,
        rank: ProficiencyRank.Expert,
        stacks,
    };
}

export type RecommendationModifier = {
    kind: "recommendation";
} & Recommendation;
export function isRecommendation(m: Modifier): m is RecommendationModifier {
    return m.kind === "recommendation";
}

export type Resistance = {
    kind: "resistance";
    to: string;
    value: (c: Character) => number;
};
export function isResistance(m: Modifier): m is Resistance {
    return m.kind === "resistance";
}

export type SecondaryAttribute = {
    kind: "secondaryAttribute";
    value: Attribute;
};
export function isSecondaryAttribute(m: Modifier): m is SecondaryAttribute {
    return m.kind === "secondaryAttribute";
}

export type Sense = {
    kind: "sense";
    name: string;
};
export function isSense(m: Modifier): m is Sense {
    return m.kind === "sense";
}

export type Slots = {
    kind: "slots";
    forCategory: string;
    quantity: number;
};
export function isSlots(m: Modifier): m is Slots {
    return m.kind === "slots";
}

type Environment = "land" | "swim";
export type SpeedModifier = {
    kind: "speed";
    environment: Environment;
    value: number;
};

export type Modifier =
    | ActionModifier
    | AttributeRecommandation
    | ExtraSkill
    | GrantedAction
    | GrantedPassive
    | GrantedWeapon
    | KeyAttribute
    | KnownItems
    | HpModifier
    | HpBank
    | ProficiencyModifier
    | RecommendationModifier
    | Resistance
    | SecondaryAttribute
    | Sense
    | Slots
    | SpeedModifier;
