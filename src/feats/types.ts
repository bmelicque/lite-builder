import type { Passive } from "../actions";
import type { ProficiencyRank } from "../proficiencies";

export type PassiveFeat = {
    kind: "passive";
    id: string;
    name: string;
    proficiency?: string;
    rank?: ProficiencyRank;
    description: string;
};
export function featToPassive(feat: PassiveFeat): Passive {
    return {
        name: feat.name,
        text: feat.description,
    };
}
