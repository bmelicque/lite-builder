import { combatClimber, quickJump, underwaterMarauder } from "./feats/skill";
import { featToPassive } from "./feats/types";
import { trained, type Modifier } from "./modifiers";

export const athleticsAce: Modifier[] = [
    trained("athletics", true),
    { ...featToPassive(combatClimber), kind: "passive" },
    { ...quickJump, kind: "passive" },
    { ...featToPassive(underwaterMarauder), kind: "passive" },
];
