import { sort } from "../utils";
import { bard } from "./bard";
import { fighter } from "./fighter";
import { swashbuckler } from "./swashbuckler";

export { type Class } from "./types";

export const classes = [bard, fighter, swashbuckler].sort(sort);
