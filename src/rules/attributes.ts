import type { Enum } from "../types";

export const Attribute = {
    Strength: "Force",
    Dexterity: "Dextérité",
    Constitution: "Constitution",
    Intelligence: "Intelligence",
    Wisdom: "Sagesse",
    Charisma: "Charisme",
} as const;
export type Attribute = Enum<typeof Attribute>;

export type Attributes = Record<Attribute, number>;
export function newAttributes(): Attributes {
    return Object.fromEntries(
        Object.values(Attribute).map((a) => [a, 0]),
    ) as any;
}
