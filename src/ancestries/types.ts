import type { Attribute } from "../attributes";
import type { Weapon } from "../items/weapons";
import type { Modifier } from "../modifiers";
import type { Skill } from "../skills";
import type { Enum } from "../types";

export const Size = {
    Small: "Petit",
    Medium: "Moyen",
    Large: "Grand",
} as const;
type Size = Enum<typeof Size>;

export type Heritage = {
    id: string;
    name: string;
    text: string;
    grants: Modifier[];
};
export function passiveHeritage(
    id: string,
    name: string,
    text: string,
): Heritage {
    return {
        id,
        name,
        text,
        grants: [{ kind: "passive", name, text }],
    };
}

export type Ancestry = {
    id: string;
    img: string;
    name: string;
    summary: string;
    ref: string;
    hp: number;
    size: Size;
    // in cells
    speeds: { land: number; swim?: number };
    skills: [Skill, Skill] | "Au choix";
    attributes: {
        boosts: (Attribute | "Libre")[];
        flaw?: Attribute;
    };
    heritages: Heritage[];
    familiarity: Weapon[];
    grants?: Modifier[];
};
