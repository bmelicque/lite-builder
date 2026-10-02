import { printDamageType, type Weapon } from "../items/weapons";
import { Attribute } from "../rules/attributes";
import { getAttributes, type Character } from "./character";

declare const BRAND: unique symbol;
type Branded<Type, Name extends string> = Type & { readonly [BRAND]: Name };

type StrikeKind = "melee" | "two-handed" | "thrown" | "ranged";

type WeaponDamage = Branded<string, "weaponDamage">;
export function getWeaponDamage(
    character: Character,
    weapon: Weapon,
    strike: StrikeKind,
): WeaponDamage {
    const diceCount = damageDice(character.level);
    const dieSize = weapon.damageDie;
    const bonus = strBonus(character, strike);
    const type = printDamageType(weapon.damageType, true);
    return `${diceCount}d${dieSize}${formatBonus(bonus)} dégâts ${type}` as WeaponDamage;
}
export function getWeaponCriticalDamage(
    character: Character,
    weapon: Weapon,
    strike: StrikeKind,
): WeaponDamage {
    const diceCount = 2 * damageDice(character.level) + (weapon.fatal ? 1 : 0);
    const dieSize = weapon.fatal || weapon.damageDie;
    const deadlyBonus = weapon.deadly ? `+1d${weapon.deadly}` : "";
    const bonus = 2 * strBonus(character, strike);
    const type = printDamageType(weapon.damageType, true);
    return `${diceCount}d${dieSize}${deadlyBonus}${formatBonus(bonus)} dégâts ${type}` as WeaponDamage;
}

function strBonus(character: Character, kind: StrikeKind): number {
    switch (kind) {
        case "melee":
        case "two-handed":
        case "thrown":
            return getAttributes(character)[Attribute.Strength];
        case "ranged":
            return 0;
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
