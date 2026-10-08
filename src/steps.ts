import type { Character } from "./character/character";
import type { Enum } from "./types";

export const Step = {
    Ancestry: 0,
    Heritage: 1,
    Class: 2,
    ClassFirstChoice: 3,
    ClassSecondChoice: 4,
    Skills: 5,
    Complete: 6,
} as const;
export type Step = Enum<typeof Step>;

export function characterStep(c: Character): Step {
    if (!c.ancestry) return Step.Ancestry;
    if (c.ancestry.heritages.length && !c.heritage) return Step.Heritage;
    if (!c.class) return Step.Class;
    if (!c.firstClassChoice) return Step.ClassFirstChoice;
    if (c.class.secondChoice && !c.secondClassChoice)
        return Step.ClassSecondChoice;
    if (!c.skills) return Step.Skills;
    return Step.Complete;
}
