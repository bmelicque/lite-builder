import type { Action } from "../actions";
import type { Rarity } from "../items/utils";
import { actionToModifier, type Modifier } from "../modifiers";
import type { Enum } from "../types";
import { omit } from "../utils";

export const Tradition = {
    Arcana: "arcanique",
    Divine: "divine",
    Occult: "occulte",
    Primal: "primordiale",
};
export type Tradition = Enum<typeof Tradition>;
export const AllTraditions = [
    Tradition.Arcana,
    Tradition.Divine,
    Tradition.Occult,
    Tradition.Primal,
];

export type Spell = Action & {
    rarity?: Rarity;
    traditions?: Tradition[];
    dc?: true;
};
export function spellToModifier(spell: Spell): Modifier {
    return actionToModifier(omit(spell, "traditions"));
}
