import type { Action, Passive } from "./actions";
import type { Weapon } from "./items/weapons";
import { ProficiencyRank, type Proficiency } from "./proficiencies";
import type { Recommendation } from "./recommendations";
import type { Skill } from "./rules/skills";

type ActionSelector =
    | { kind: "id"; id: string }
    | { kind: "trait"; value: string };
type Modification =
    | { kind: "push"; value: any }
    | { kind: "replace"; value: any };
/**
 * Modifies an existing action
 */
export type ActionModifier = {
    kind: "actionModifier";
    selector: ActionSelector;
    onField: string;
    modification: Modification;
};
export function isActionModifier(m: Modifier): m is ActionModifier {
    return m.kind === "actionModifier";
}

export type AttributeArray = {
    kind: "attributeArray";
    array: number[];
};
export function isAttributeArray(m: Modifier): m is AttributeArray {
    return m.kind === "attributeArray";
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
    value: (c: any) => number;
};
export function isResistance(m: Modifier): m is Resistance {
    return m.kind === "resistance";
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
    | AttributeArray
    | ExtraSkill
    | GrantedAction
    | GrantedPassive
    | GrantedWeapon
    | KnownItems
    | HpModifier
    | HpBank
    | ProficiencyModifier
    | RecommendationModifier
    | Resistance
    | Sense
    | Slots
    | SpeedModifier;
