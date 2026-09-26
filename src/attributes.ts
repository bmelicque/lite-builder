import { gatherModifiers, type Character } from "./character";
import {
    isAttributeRecommendation,
    isKeyAttribute,
    isSecondaryAttribute,
    type KeyAttribute,
    type Modifier,
    type SecondaryAttribute,
} from "./modifiers";
import type { Enum } from "./types";

export const Attribute = {
    Strength: "Force",
    Dexterity: "Dextérité",
    Constitution: "Constitution",
    Intelligence: "Intelligence",
    Wisdom: "Sagesse",
    Charisma: "Charisme",
} as const;
export type Attribute = Enum<typeof Attribute>;

export type Attributes = Record<Attribute, number>;
function newAttributes(): Attributes {
    return Object.fromEntries(
        Object.values(Attribute).map((a) => [a, 0]),
    ) as any;
}

const arrays = {
    optimized: [4, 3, 1, 1, 0, 0],
    balanced: [4, 2, 2, 1, 0, 0],
    flawed: [4, 3, 2, 1, 0, -1],
} as const;
export function computeAttributes(character: Partial<Character>): Attributes {
    const modifiers = gatherModifiers(character);
    const keyAttribute = getKeyAttribute(modifiers);
    const secondaryAttributes = getSecondaryAttributes(modifiers);
    const recommendations = getRecommendations(modifiers);
    const flaw = character.ancestry?.attributes.flaw;
    const array =
        flaw != null
            ? arrays.flawed
            : secondaryAttributes.length === 1
              ? arrays.optimized
              : arrays.balanced;

    const priorities = newAttributes();
    priorities[keyAttribute.value] = 1000;
    if (flaw) priorities[flaw] = -100;
    for (const a of secondaryAttributes) priorities[a.value] = 100;
    for (const r of recommendations) priorities[r]++;

    const sorted = Object.entries(priorities)
        .sort((a, b) => b[1] - a[1])
        .map((a) => a[0] as Attribute);

    const attributes = newAttributes();
    for (let i = 0; i < array.length; i++) {
        attributes[sorted[i]] = array[i];
    }
    return attributes;
}

function getKeyAttribute(modifiers: Modifier[]): KeyAttribute {
    const attributes = modifiers.filter(isKeyAttribute);
    if (attributes.length > 2) throw new Error("too many key attributes");
    if (attributes.length === 0) throw new Error("no key attribute");
    return attributes[0];
}

function getSecondaryAttributes(modifiers: Modifier[]): SecondaryAttribute[] {
    const attributes = modifiers.filter(isSecondaryAttribute);
    if (attributes.length > 2) throw new Error("too many secondary attributes");
    return attributes;
}

function getRecommendations(modifiers: Modifier[]): Attribute[] {
    return modifiers.filter(isAttributeRecommendation).flatMap((r) => r.values);
}
