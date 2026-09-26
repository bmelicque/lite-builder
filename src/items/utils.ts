import type { Enum } from "../types";

export type Bulk = "-" | "L" | number;

export const Rarity = {
    Common: "Commun",
    Uncommon: "Inhabituel",
    Rare: "Rare",
    Unique: "Unique",
} as const;
export type Rarity = Enum<typeof Rarity>;

export const SP = 10;
export const GP = 100;

export function price(price: number): string {
    const cp = price % 10;
    price -= cp;

    const sp = (price % 100) / 10;
    price -= 10 * sp;

    const gp = Math.floor(price / 100);

    let p = [];
    if (gp) p.push(`${gp} po`);
    if (sp) p.push(`${sp} pa`);
    if (cp) p.push(`${cp} pc`);
    return p.join(" ");
}
