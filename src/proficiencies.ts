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
