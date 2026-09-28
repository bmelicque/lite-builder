import { sort } from "../utils";
import { alchemist } from "./alchemist";
import { bard } from "./bard";
import { fighter } from "./fighter";
import { swashbuckler } from "./swashbuckler";

export { type Class } from "./types";

export const classes = [alchemist, bard, fighter, swashbuckler].sort(sort);
