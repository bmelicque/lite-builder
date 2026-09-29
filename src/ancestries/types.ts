import type { Attribute } from "../rules/attributes";
import type { Weapon } from "../items/weapons";
import type { Modifier } from "../modifiers";
import type { Skill } from "../rules/skills";
import type { Enum } from "../types";
import type { Heritage } from "../heritages/types";

export const Size = {
    Small: "Petit",
    Medium: "Moyen",
    Large: "Grand",
} as const;
type Size = Enum<typeof Size>;

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
