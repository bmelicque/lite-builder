import { ancestries } from "../ancestries";
import {
    computeAttributes,
    newCharacter,
    type Character,
    type CharacterStatus,
} from "../character";
import { classes } from "../classes";
import { selectArmor } from "../items/armors";
import { weapons, type Weapon } from "../items/weapons";
import { skills } from "../rules/skills";

export function saveCharacter(character: Partial<Character>) {
    localStorage.setItem(character.id!, JSON.stringify(toData(character)));
    localStorage.setItem("id", character.id!);
}

function toData(character: Partial<Character>): Record<string, string> {
    const data: Record<string, string> = {
        name: character.name ?? "",
        background: character.background ?? "",
        level: character.level!.toString(),
    };

    if (!character.ancestry) return data;
    data.ancestry = character.ancestry.id;

    if (character.ancestry.heritages.length) {
        if (!character.heritage) return data;
        data.heritage = character.heritage.id;
    }

    if (!character.class) return data;
    data.class = character.class.id;

    if (!character.firstClassChoice) return data;
    data.firstClassChoice = character.firstClassChoice.name;

    if (character.class.secondChoice) {
        if (!character.secondClassChoice) return data;
        data.secondClassChoice = character.secondClassChoice.name;
    }

    if (!character.skills) return data;
    data.skills = character.skills.map((s) => s.id).join("&");

    if (!character.weapons) return data;
    data.weapons = character.weapons.map((w) => w.id).join("&");

    data.status = JSON.stringify(character.status);

    return data;
}

export function loadCharacter(): Partial<Character> {
    const id = localStorage.getItem("id");
    return id != null ? loadACharacter(id) : newCharacter();
}
export function loadACharacter(id: string): Partial<Character> {
    const raw = localStorage.getItem(id);
    if (!raw) return newCharacter();
    let data;
    try {
        data = JSON.parse(raw);
    } catch (_) {
        return newCharacter();
    }
    if (typeof data !== "object") return newCharacter();

    const character: Partial<Character> = {
        id,
        name: loadString(data.name),
        background: loadString(data.background),
        level: loadInt(data.level, 1),
    };

    if (!data.ancestry) return character;
    const ancestry = get(ancestries, data.ancestry);
    if (!ancestry) return character;
    character.ancestry = ancestry;

    if (ancestry.heritages.length) {
        const heritage = ancestry.heritages.find((h) => h.id === data.heritage);
        if (!heritage) return character;
        character.heritage = heritage;
    }

    const class_ = classes.find((c) => c.id === data.class);
    if (!class_) return character;
    character.class = class_;

    const firstClassChoice = class_.firstChoice.options.find(
        (o) => o.name === data.firstClassChoice,
    );
    if (!firstClassChoice) return character;
    character.firstClassChoice = firstClassChoice;

    if (class_.secondChoice) {
        const secondClassChoice = class_.secondChoice.options.find(
            (o) => o.name === data.secondClassChoice,
        );
        if (!secondClassChoice) return character;
        character.secondClassChoice = secondClassChoice;
    }

    if (!data.skills) return character;
    const s = data.skills
        .split("&")
        .map((s: string) => skills.find((skill) => skill.id === s));
    if (s.includes(undefined)) return character;
    character.skills = s;

    character.attributes = computeAttributes(character);
    character.armor = selectArmor(character);

    if (!data.weapons) return character;
    const w: Weapon[] = data.weapons
        .split("&")
        .map((w: string) => get(weapons, w))
        .filter(isSome);
    character.weapons = w;

    character.status = loadCharacterStatus(data.status);

    return character;
}
function loadCharacterStatus(data: unknown): CharacterStatus {
    const parsed: any = typeof data === "string" ? JSON.parse(data) : {};
    return {
        damage: loadInt(parsed.damage),
        temporaryHP: loadInt(parsed.temporaryHP),
        // FIXME:
        usedSlots: {},
    };
}
function loadString(data: unknown): string {
    return typeof data === "string" ? data : "";
}
function loadInt(data: unknown, default_ = 0): number {
    switch (typeof data) {
        case "string":
            return parseInt(data);
        case "number":
            return data;
        case "bigint":
        case "boolean":
        case "symbol":
        case "undefined":
        case "object":
        case "function":
            return default_;
    }
}

function get<K extends string, T>(
    registry: Record<K, T>,
    key: string,
): T | undefined {
    return registry[key as keyof typeof registry];
}

function isSome<T>(value: T | undefined): value is T {
    return value !== undefined;
}
