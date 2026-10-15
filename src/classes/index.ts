import { alchemist } from "./alchemist";
import { bard } from "./bard";
import { guardian } from "./guardian";
import { oracle } from "./oracle";
import { runesmith } from "./runesmith";
import { swashbuckler } from "./swashbuckler";

export { type Class } from "./types";

export const classes = {
    alchemist,
    bard,
    guardian,
    oracle,
    runesmith,
    swashbuckler,
} as const;
