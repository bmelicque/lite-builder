import type { ZodError } from "zod";
import {
    characterSchema,
    newCharacter,
    type Character,
} from "../character/character";

export function saveCharacter(character: Character) {
    localStorage.setItem(character.id!, JSON.stringify(toData(character)));
    localStorage.setItem("id", character.id!);
}

function toData(character: Character) {
    const data: Record<string, unknown> = {
        name: character.name ?? "",
        background: character.background ?? "",
        level: character.level ?? 1,
    };

    if (character.ancestry) data.ancestry = character.ancestry.id;

    if (character.heritage) data.heritage = character.heritage.id;

    if (character.class) data.class = character.class.id;

    if (character.choices) data.choices = character.choices;

    if (character.skills) data.skills = character.skills.map((s) => s.id);

    if (character.weapons) data.weapons = character.weapons.map((w) => w.id);

    data.status = character.status;

    return data;
}

export function loadCharacter(): Character {
    const id = localStorage.getItem("id");
    return id != null ? loadACharacter(id) : newCharacter();
}
export function loadACharacter(id: string): Character {
    const raw = localStorage.getItem(id);
    if (!raw) return newCharacter();
    let data;
    try {
        data = JSON.parse(raw);
    } catch (_) {
        return newCharacter();
    }
    if (typeof data !== "object") return newCharacter();
    data.id = id;

    try {
        return characterSchema.parse(data);
    } catch (e: any) {
        console.log((e as ZodError).message);
        return characterSchema.parse({});
    }
}
