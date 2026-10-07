import {
    Attribute,
    attributesFromArray,
    type Attributes,
} from "../rules/attributes";
import { classes } from "../classes";
import { rateWeapon, weapons, type Weapon } from "../items/weapons";
import {
    isAttributeArray,
    isGrantedWeapon,
    isProficiency,
    isWeaponSlot,
    type Modifier,
    type WeaponSlot,
} from "../modifiers";
import { skills } from "../rules/skills";
import z from "zod";
import { ancestries } from "../ancestries";
import { proficiencyValue } from "../proficiencies";
import { heritages } from "../heritages";
import { armors } from "../items/armors";
import { matchesRule } from "../recommendations";
import { retainMax } from "../utils";
import { Rarity } from "../items/utils";

const statusSchema = z
    .object({
        damage: z.number().int().default(0),
        temporaryHP: z.number().int().default(0),
        usedSlots: z.record(z.string(), z.number().int()).default({}),
    })
    .prefault({});
export type CharacterStatus = z.infer<typeof statusSchema>;
export function newCharacterStatus(): CharacterStatus {
    return statusSchema.parse({});
}

const skillSchema = z.string().transform((id, ctx) => {
    const skill = skills.find((s) => s.id === id);
    if (!skill) {
        ctx.addIssue({
            code: "custom",
            message: `Unknown skill: ${id}`,
        });
        return z.NEVER;
    }
    return skill;
});

const weaponSchema = z.string().transform((id, ctx) => {
    if (!weapons[id as keyof typeof weapons]) {
        ctx.addIssue({
            code: "custom",
            message: `Unknown weapon: ${id}`,
        });
        return z.NEVER;
    }
    return weapons[id as keyof typeof weapons];
});

export const characterSchema = z.object({
    id: z.string().default(newCharacterId),
    level: z.number().int().min(1).max(20).default(1),
    name: z.string().default(""),
    background: z.string().default(""),
    ancestry: z
        .string()
        .optional()
        .transform(makeTransformer(ancestries, "ancestry")),
    heritage: z
        .string()
        .optional()
        .transform(makeTransformer(heritages, "heritage")),
    class: z.string().optional().transform(makeTransformer(classes, "class")),
    firstClassChoice: z.string().optional(),
    secondClassChoice: z.string().optional(),
    skills: z.array(skillSchema).optional(),
    armor: z.string().optional().transform(makeTransformer(armors, "armor")),
    weapons: z.array(weaponSchema).optional(),
    status: statusSchema,
});
export type Character = z.infer<typeof characterSchema>;

function makeTransformer<T>(lib: Record<string, T>, name: string) {
    return function transformer(
        id: string | undefined,
        ctx: z.core.$RefinementCtx<string | undefined>,
    ): T | undefined {
        if (!id) return undefined;
        if (!(id in lib)) {
            ctx.addIssue({
                code: "custom",
                message: `Unknown ${name}: ${id}`,
            });
            return z.NEVER;
        }
        return lib[id];
    };
}

export function newCharacterId(): string {
    return Date.now().toString(36);
}

export function newCharacter(): Character {
    return characterSchema.parse({ id: newCharacterId() });
}

export function* iterModifiers(character: Character): Generator<Modifier> {
    let grants: Modifier[] | undefined;

    grants = character.ancestry?.grants;
    if (grants) for (const g of grants) yield g;

    grants = character.heritage?.grants;
    if (grants) for (const g of grants) yield g;

    grants = character.class?.grants;
    if (grants) for (const g of grants) yield g;

    grants = character.class?.firstChoice.options.find(
        (o) => o.name === character.firstClassChoice,
    )?.grants;
    if (grants) for (const g of grants) yield g;

    grants = character.class?.secondChoice?.options.find(
        (o) => o.name === character.secondClassChoice,
    )?.grants;
    if (grants) for (const g of grants) yield g;
}

const ATTRIBUTES = Symbol();
function computeAttributes(character: Character): Attributes {
    const array = iterModifiers(character).find(isAttributeArray);
    if (!array) throw new Error("found no attribute array");
    const attributes = attributesFromArray(array.array);

    const ancestryAttributes = character.ancestry?.attributes;
    if (!ancestryAttributes) throw new Error("found no ancestry");
    const boosts = [...ancestryAttributes.boosts];

    tryBoost(attributes, boosts, 3);
    tryBoost(attributes, boosts, 2);
    tryBoost(attributes, boosts, 1);
    tryBoost(attributes, boosts, 1);

    if (ancestryAttributes.flaw) attributes[ancestryAttributes.flaw]--;

    return attributes;
}
function tryBoost(
    attributes: Attributes,
    boosts: (Attribute | "Libre")[],
    boostedValue: number,
) {
    let attr: Attribute;
    for (attr in attributes) {
        if (attributes[attr] !== boostedValue) continue;
        if (boosts.includes(attr)) {
            attributes[attr]++;
            boosts.splice(boosts.indexOf(attr), 1);
        } else if (boosts.includes("Libre")) {
            attributes[attr]++;
            boosts.pop();
        }
        break;
    }
}
export function getAttributes(character: Character): Attributes {
    //@ts-ignore
    if (character[ATTRIBUTES] != null) return character[ATTRIBUTES];
    const attributes = computeAttributes(character);
    //@ts-ignore
    character[ATTRIBUTES] = attributes;
    return attributes;
}

const familiarity = {
    advancedWeapons: "martialWeapons",
    martialWeapons: "simpleWeapons",
    simpleWeapons: "simpleWeapons",
    unarmedAttacks: "unarmedAttacks",
};
export function attackModifiers(character: Character, weapon: Weapon): string {
    const proficiencyBonus = weaponProficiencyBonus(character, weapon);
    const map = weapon.agile ? -4 : -5;
    const first = proficiencyBonus + attribute(character, weapon);
    const second = first + map;
    const third = second + map;
    return [first, second, third]
        .map((m) => (m >= 0 ? `+${m}` : m.toString()))
        .join("/");
}
export function attackModifier(character: Character, weapon: Weapon): number {
    return (
        weaponProficiencyBonus(character, weapon) + attribute(character, weapon)
    );
}
export function weaponProficiencyBonus(
    character: Character,
    weapon: Weapon,
): number {
    const category = character.ancestry?.familiarity.includes(weapon)
        ? familiarity[weapon.proficiency]
        : weapon.proficiency;
    const proficiency = iterModifiers(character)
        .filter(isProficiency)
        .filter((p) => p.in === category)
        .reduce((max, cur) => Math.max(max, proficiencyValue[cur.rank]), 0);
    return proficiency && 2 * proficiency + 1;
}

function attribute(character: Character, weapon: Weapon): number {
    const attributes = getAttributes(character);
    if (weapon.range) return attributes[Attribute.Dexterity];
    if (!weapon.finesse) return attributes[Attribute.Strength];
    return Math.max(
        attributes[Attribute.Strength],
        attributes[Attribute.Dexterity],
    );
}

export function getProficiency(character: Character, of: string): number {
    const isSelectedSkill = !!character.skills?.find((s) => s.id === of);
    const values = iterModifiers(character)
        .filter(isProficiency)
        .filter((p) => p.in === of)
        .map((p) => proficiencyValue[p.rank])
        .toArray();
    return values.length > 0 ? Math.max(...values) : isSelectedSkill ? 1 : 0;
}

export function selectWeapons(character: Character): Weapon[] {
    const slots = iterModifiers(character).filter(isWeaponSlot);
    const accessible = Object.values(weapons).filter((w) =>
        hasAccessTo(character, w),
    );
    const dynamicWeapons = slots
        .map((slot) => getBestWeaponForSlot(slot, character, accessible))
        .toArray();

    const staticWeapons = iterModifiers(character).filter(isGrantedWeapon);
    return [...staticWeapons, ...dynamicWeapons];
}
function getBestWeaponForSlot(
    slot: WeaponSlot,
    character: Character,
    weapons: Weapon[],
): Weapon {
    let selection = weapons.filter((w) => matchesRule(slot.rule, w));
    selection = retainMax(selection, rateWeapon);
    selection.sort((a, b) => a.price - b.price);
    if (selection.length === 1) return selection[0];
    const familiar = selection.filter((w) =>
        character.ancestry?.familiarity.includes(w),
    );
    if (familiar.length) selection = familiar;
    return selection[0];
}
export function hasAccessTo(
    character: Partial<Character>,
    weapon: Weapon,
): boolean {
    if (!weapon.rarity || weapon.rarity === Rarity.Common) return true;
    return character.ancestry!.familiarity.includes(weapon);
}
