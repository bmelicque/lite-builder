import { gatherModifiers, type Character } from "./character";
import { isProficiency } from "./modifiers";
import type { Enum } from "./types";

export const ProficiencyRank = {
    Trained: "Qualifié",
    Expert: "Expert",
    Master: "Maître",
    Legendary: "Légendaire",
};
export type ProficiencyRank = Enum<typeof ProficiencyRank>;

export type Proficiency = {
    in: string;
    rank: ProficiencyRank;
    /** Should it stack if duplicated (usually bump to Expert if `true`) */
    stacks?: boolean;
};

export const proficiencyValue = {
    [ProficiencyRank.Trained]: 1,
    [ProficiencyRank.Expert]: 2,
    [ProficiencyRank.Master]: 3,
    [ProficiencyRank.Legendary]: 4,
};

export function getProficiency(
    character: Partial<Character>,
    of: string,
): number {
    const isSelectedSkill = !!character.skills?.find((s) => s.id === of);
    const values = gatherModifiers(character)
        .filter(isProficiency)
        .filter((p) => p.in === of)
        .map((p) => proficiencyValue[p.rank]);
    return values.length > 0 ? Math.max(...values) : isSelectedSkill ? 1 : 0;
}
