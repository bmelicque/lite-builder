import type { Action } from "../actions";
import { formatDistance } from "../formatting";
import {
    DamageType,
    printDamageType,
    versatile,
    type Weapon,
} from "../items/weapons";
import { isExtraStrikeDamage, type ExtraStrikeDamage } from "../modifiers";
import { matchesRule } from "../recommendations";
import { Attribute } from "../rules/attributes";
import {
    getAttributes,
    iterModifiers,
    weaponProficiencyBonus,
    type Character,
} from "./character";

type StrikeKind = "melee" | "two-handed" | "thrown" | "ranged";
type DamageDice = {
    d12?: number;
    d10?: number;
    d8?: number;
    d6?: number;
    d4?: number;
    flat?: number;
};
export type Damage = Record<DamageType, DamageDice>;
function mergeDamage(a: Damage, b: Damage): Damage {
    const r: Damage = structuredClone(a);
    for (const type in b) {
        if (!b.hasOwnProperty(type)) continue;
        const dice = (r[type] ??= {});
        for (const key in b[type]) {
            if (!b[type].hasOwnProperty(key)) continue;
            const size = key as keyof DamageDice;
            dice[size] ??= 0;
            dice[size] += b[type][size]!;
        }
    }
    return r;
}
function doubleDamage(d: Damage): Damage {
    const r: Damage = structuredClone(d);
    for (const type in r) {
        if (!r.hasOwnProperty(type)) continue;
        const dice = r[type];
        if (!dice) continue;
        for (const key in dice) {
            if (!dice.hasOwnProperty(key)) continue;
            const size = key as keyof DamageDice;
            if (typeof dice[size] === "number") (dice[size] as number) *= 2;
        }
    }
    return r;
}

/**
 * Generates all the actions that can be realized with the given weapon for a
 * given character
 */
export function weaponToActions(
    character: Character,
    weapon: Weapon,
): Action[] {
    return weaponToStrikes(character, weapon);
}

/**
 * Build all different possible strikes with a given weapon
 */
function weaponToStrikes(character: Character, weapon: Weapon): Action[] {
    const defaultStrike = buildStrike(
        character,
        weapon,
        weapon.range ? "ranged" : "melee",
    );
    const actions = [defaultStrike];
    if (weapon.twoHanded)
        actions.push(buildStrike(character, weapon, "two-handed"));
    if (weapon.thrown) actions.push(buildStrike(character, weapon, "thrown"));
    return actions;
}

/**
 * Build a weapon strike of the given kind.
 */
function buildStrike(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): Action {
    const name = getStrikeName(weapon, kind);
    return {
        name,
        traits: structuredClone(weapon.traits),
        category: "strike",
        actions: "one",
        modifiers: attackModifiers(character, weapon, kind),
        text: strikeText(character, weapon, kind),
    };
}

function getStrikeName(weapon: Weapon, kind: StrikeKind): string {
    if (kind === "thrown") return `Frappe (${weapon.name}, lancer)`;
    if (kind === "two-handed") return `Frappe (${weapon.name}, 2 mains)`;
    if (weapon.twoHanded != null) return `Frappe (${weapon.name}, 1 main)`;
    return `Frappe (${weapon.name})`;
}

function strikeText(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): string {
    const range = getRange(weapon, kind);

    const strBonus = getStrengthBonus(character, weapon, kind);
    const extraDamage = getExtraDamage(character, weapon);
    const bonus = mergeDamage(strBonus, extraDamage);

    const weaponDamage = mergeDamage(
        bonus,
        getWeaponDamage(character, weapon, kind),
    );
    const criticalDamage = mergeDamage(
        doubleDamage(bonus),
        getWeaponCriticalDamage(character, weapon, kind),
    );
    return (
        (range ? `**Portée** ×${formatDistance(range)} mètres\n` : "") +
        (weapon.reload ? `**Recharge** ${weapon.reload} action\n` : "") +
        `**Réussite critique** Infligez ${formatDamage(criticalDamage)} à la cible.\n` +
        `**Réussite** Infligez ${formatDamage(weaponDamage)} à la cible.`
    );
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
            if (!finesse) return getAttributes(character)[Attribute.Strength];
            return Math.max(
                getAttributes(character)[Attribute.Strength],
                getAttributes(character)[Attribute.Dexterity],
            );
        case "thrown":
        case "ranged":
            return getAttributes(character)[Attribute.Dexterity];
    }
}

function getWeaponDamage(
    character: Character,
    weapon: Weapon,
    strike: StrikeKind,
): Damage {
    const diceCount = damageDice(character.level);
    const damageDie =
        strike === "two-handed" ? weapon.twoHanded! : weapon.damageDie;
    return {
        [versatile(weapon.damageType)]: {
            [dieSize(damageDie)]: diceCount,
        },
    };
}
function getWeaponCriticalDamage(
    character: Character,
    weapon: Weapon,
    strike: StrikeKind,
): Damage {
    const damageType = versatile(weapon.damageType);
    const diceCount = 2 * damageDice(character.level) + (weapon.fatal ? 1 : 0);
    const damageDie =
        strike === "two-handed"
            ? weapon.twoHanded!
            : weapon.fatal || weapon.damageDie;
    const dice: DamageDice = {
        [dieSize(damageDie)]: diceCount,
    };
    if (weapon.deadly) {
        const deadlySize = dieSize(weapon.deadly);
        dice[deadlySize] ??= 0;
        dice[deadlySize]++;
    }
    return { [damageType]: dice };
}
function dieSize(size: number): keyof DamageDice {
    switch (size) {
        case 12:
            return "d12";
        case 10:
            return "d10";
        case 8:
            return "d8";
        case 6:
            return "d6";
        case 4:
            return "d4";
        default:
            throw new Error();
    }
}

function getExtraDamage(character: Character, weapon: Weapon): Damage {
    return iterModifiers(character)
        .filter(isExtraStrikeDamage)
        .filter((m) => !m.condition || matchesRule(m.condition, weapon))
        .map((m) => modifierToDamage(m, weapon))
        .reduce((damage, cur) => mergeDamage(damage, cur), {});
}
function modifierToDamage(m: ExtraStrikeDamage, weapon: Weapon): Damage {
    const type = m.type || versatile(weapon.damageType);
    const size: keyof DamageDice =
        typeof m.damage === "object" ? dieSize(m.damage.diceSize) : "flat";
    const value = typeof m.damage === "object" ? m.damage.diceCount : m.damage;
    return { [type]: { [size]: value } };
}

function getStrengthBonus(
    character: Character,
    weapon: Weapon,
    kind: StrikeKind,
): Damage {
    switch (kind) {
        case "melee":
        case "two-handed":
        case "thrown":
            const value = getAttributes(character)[Attribute.Strength];
            return { [versatile(weapon.damageType)]: { flat: value } };
        case "ranged":
            return {};
    }
}

function formatBonus(n: number): string {
    if (n > 0) return `+${n}`;
    if (n < 0) return n.toString();
    return "";
}

function damageDice(level: number): number {
    if (level >= 19) return 4;
    if (level >= 12) return 3;
    if (level >= 4) return 2;
    return 1;
}

function formatDamage(d: Damage): string {
    const array: string[] = [];
    for (const t in d) {
        const type = printDamageType(t, true);
        const dice = formatDamageDice(d[t]);
        array.push(`${dice} dégâts ${type}`);
    }
    if (array.length === 1) return array[0];
    return array.slice(0, -1).join(", ") + " et " + array.at(-1);
}
function formatDamageDice(d: DamageDice): string {
    const array: string[] = [];
    if (d.d12) array.push(d.d12 + "d12");
    if (d.d10) array.push(d.d10 + "d10");
    if (d.d8) array.push(d.d8 + "d8");
    if (d.d6) array.push(d.d6 + "d6");
    if (d.d4) array.push(d.d4 + "d4");
    const s = array.join("+");
    if (!d.flat) return s;
    return s ? s + formatBonus(d.flat) : d.flat.toString();
}

function getRange(weapon: Weapon, strike: StrikeKind): number | undefined {
    switch (strike) {
        case "melee":
        case "two-handed":
            return;
        case "thrown":
            return weapon.thrown;
        case "ranged":
            return weapon.range;
    }
}
