import { alchemist } from "./alchemist";
import { bard } from "./bard";
import { fighter } from "./fighter";
import { guardian } from "./guardian";
import { swashbuckler } from "./swashbuckler";

export { type Class } from "./types";

export const classes = {
    alchemist,
    bard,
    fighter,
    guardian,
    swashbuckler,
} as const;
