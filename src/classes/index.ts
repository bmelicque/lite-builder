import { alchemist } from "./alchemist";
import { bard } from "./bard";
import { fighter } from "./fighter";
import { guardian } from "./guardian";
import { oracle } from "./oracle";
import { swashbuckler } from "./swashbuckler";

export { type Class } from "./types";

export const classes = {
    alchemist,
    bard,
    fighter,
    guardian,
    oracle,
    swashbuckler,
} as const;
