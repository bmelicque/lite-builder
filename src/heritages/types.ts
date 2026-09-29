import type { Modifier } from "../modifiers";

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
