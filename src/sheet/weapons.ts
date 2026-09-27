import type { Action } from "../actions";
import { Attribute } from "../rules/attributes";
import type { Character } from "../character";
import {
    printDamageType,
    weaponProficiencyBonus,
    type Weapon,
} from "../items/weapons";

export function weaponToActions(
    character: Character,
    weapon: Weapon,
): Action[] {
    return weaponToStrikes(character, weapon);
}

type StrikeKind = "melee" | "two-handed" | "thrown" | "ranged";
function weaponToStrikes(character: Character, weapon: Weapon): Action[] {
    const actions = [makeStrike(character, weapon, "melee")];
    if (weapon.twoHanded)
        actions.push(makeStrike(character, weapon, "two-handed"));
    return actions;
}
function makeStrike(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): Action {
    const name = getStrikeName(weapon, kind);
    const damageDie =
        kind === "two-handed" ? weapon.twoHanded! : weapon.damageDie;
    return {
        name,
        category: "strike",
        actions: "one",
        modifiers: attackModifiers(character, weapon, kind),
        text: `Infligez ${damageDice(character.level)}d${damageDie}${strBonus(character, kind)} dégâts ${printDamageType(weapon.damageType, true)}.`,
    };
}

function getStrikeName(weapon: Weapon, kind: StrikeKind): string {
    if (kind === "two-handed") return `Frappe (${weapon.name}, 2 mains)`;
    if (weapon.twoHanded != null) return `Frappe (${weapon.name}, 1 main)`;
    return `Frappe (${weapon.name})`;
}

function attackModifiers(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): string {
    const mod = attackModifier(character, weapon, kind);
    const map = weapon.agile ? -4 : -5;
    return formatModifiers(mod, map);
}
export function formatModifiers(mod: number, map: number) {
    return [mod, mod + map, mod + 2 * map]
        .map((mod) => (mod >= 0 ? `+${mod}` : mod.toString()))
        .join("/");
}
function attackModifier(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): number {
    const proficiencyBonus = weaponProficiencyBonus(character, weapon);
    const attribute = getAttackAttributeValue(
        character,
        !!weapon.finesse,
        kind,
    );
    // TODO: item/potency bonus
    return proficiencyBonus + attribute;
}
function getAttackAttributeValue(
    character: Character,
    finesse: boolean,
    kind: StrikeKind,
): number {
    switch (kind) {
        case "melee":
        case "two-handed":
            if (!finesse) return character.attributes[Attribute.Strength];
            return Math.max(
                character.attributes[Attribute.Strength],
                character.attributes[Attribute.Dexterity],
            );
        case "thrown":
        case "ranged":
            return character.attributes[Attribute.Dexterity];
    }
}

function strBonus(character: Character, kind: StrikeKind): string {
    switch (kind) {
        case "melee":
        case "two-handed":
        case "thrown":
            const bonus = character.attributes[Attribute.Strength];
            if (bonus > 0) return `+${bonus}`;
            if (bonus < 0) return bonus.toString();
            return "";
        case "ranged":
            return "";
    }
}

function damageDice(level: number): number {
    if (level >= 19) return 4;
    if (level >= 12) return 3;
    if (level >= 4) return 2;
    return 1;
}
