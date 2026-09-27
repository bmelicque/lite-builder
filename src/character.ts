import { disarm, shove, trip } from "./actions";
import type { Ancestry, Heritage } from "./ancestries/types";
import { Attribute, newAttributes, type Attributes } from "./rules/attributes";
import type { Class } from "./classes";
import type { ClassChoiceOption } from "./classes/types";
import type { Armor } from "./items/armors";
import type { Weapon } from "./items/weapons";
import {
    isAttributeRecommendation,
    isKeyAttribute,
    isRecommendation,
    isSecondaryAttribute,
    type KeyAttribute,
    type Modifier,
    type SecondaryAttribute,
} from "./modifiers";
import type { Recommendation } from "./recommendations";
import type { Skill } from "./rules/skills";
import { Trait } from "./traits";
import { omit } from "./utils";

export type CharacterStatus = {
    damage: number;
    temporaryHP: number;
    usedSlots: Record<string, number>;
};
export function newCharacterStatus(): CharacterStatus {
    return { damage: 0, temporaryHP: 0, usedSlots: {} };
}

export type Character = {
    id: string;
    level: number;
    name: string;
    ancestry: Ancestry;
    heritage?: Heritage;
    background: string;
    class: Class;
    firstClassChoice: ClassChoiceOption;
    secondClassChoice?: ClassChoiceOption;
    skills: Skill[];
    aceSkill: Skill;
    attributes: Attributes;
    armor: Armor;
    weapons: Weapon[];
    status: CharacterStatus;
};

export function newCharacterId(): string {
    return Date.now().toString(36);
}

export function newCharacter(): Partial<Character> {
    const id = newCharacterId();
    return {
        id,
        level: 1,
        status: newCharacterStatus(),
        name: "",
        background: "",
    };
}

export function gatherModifiers(character: Partial<Character>): Modifier[] {
    const ancestry = character.ancestry?.grants ?? [];
    const heritage = character.heritage?.grants ?? [];
    const class_ = character.class?.grants ?? [];
    const first = character.firstClassChoice?.grants ?? [];
    const second = character.secondClassChoice?.grants ?? [];
    const skills: Modifier[] =
        character.skills?.map((s) => ({
            kind: "attributeRecommendation",
            values: [s.attribute],
        })) ?? [];

    const modifiers = [
        ...ancestry,
        ...heritage,
        ...class_,
        ...first,
        ...second,
        ...skills,
    ];
    return modifiers;
}

export function gatherRecommendations(
    character: Partial<Character>,
): Recommendation[] {
    const class_ = character.class?.grants ?? [];
    const first = character.firstClassChoice?.grants ?? [];
    const second = character.secondClassChoice?.grants ?? [];
    return [...class_, ...first, ...second]
        .filter(isRecommendation)
        .map((m) => omit(m, "kind"));
}

export function rateWeapon(
    character: Partial<Character>,
    weapon: Weapon,
): number {
    let rating = (weapon.damageDie - 4) * 1.5;
    if (Array.isArray(weapon.damageType))
        rating += weapon.damageType.length - 1;
    if (weapon.hands === 2) rating -= weapon.range ? 2 : 6;
    if (weapon.agile) rating += weapon.damageDie === 4 ? 1 : 2;
    if (weapon.deadly) rating += 2;
    if (weapon.fatal) rating += 3;
    if (weapon.twoHanded) rating += 1;
    if (weapon.traits?.includes(Trait.Backstabber)) rating += 1;
    if (weapon.traits?.includes(Trait.Backswing)) rating += 2;
    if (weapon.traits?.includes(Trait.Forceful)) rating += 2;
    if (weapon.traits?.includes(Trait.Kickback)) rating += 1;
    if (weapon.traits?.includes(Trait.Parry)) rating += 2;
    if (weapon.traits?.includes(Trait.Razing)) rating += 1;
    if (weapon.traits?.includes(Trait.Reach)) rating += 3;
    if (weapon.traits?.includes(Trait.Scatter5ft)) rating += 4;
    if (weapon.traits?.includes(Trait.Scatter10ft)) rating += 5;
    if (weapon.traits?.includes(Trait.Sweep)) rating += 1;
    if (weapon.additionalActions?.includes(disarm)) rating += 1;
    // TODO: if (weapon.additionalActions?.includes(grapple)) rating += 1;
    if (weapon.additionalActions?.includes(shove)) rating += 1;
    if (weapon.additionalActions?.includes(trip)) rating += 1;
    if (weapon.thrown) rating += weapon.thrown <= 6 ? 1 : 2;
    if (weapon.reload) rating -= 3;

    // TODO: familiarity for non-martial classes

    return rating;
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
