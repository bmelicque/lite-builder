import type { Ancestry, Heritage } from "./ancestries/types";
import type { Attributes } from "./attributes";
import type { Class } from "./classes";
import type { ClassChoiceOption } from "./classes/types";
import type { Armor } from "./items/armors";
import type { Weapon } from "./items/weapons";
import { isRecommendation, type Modifier } from "./modifiers";
import type { Recommendation } from "./recommendations";
import type { Skill } from "./skills";
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
