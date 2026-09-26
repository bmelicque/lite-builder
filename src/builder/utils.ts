import type { Character } from "../character";
import { isProficiency } from "../modifiers";
import { skills, type Skill } from "../skills";

type Preselected = {
    skills: Skill[];
    extra: number;
};
export function handlePreselected(character: Partial<Character>): Preselected {
    const preselected: Skill[] = [];
    let extra = 0;

    if (Array.isArray(character.ancestry?.skills))
        preselected.push(...character.ancestry.skills);
    else if (character.ancestry?.skills === "Au choix") extra += 2;

    const heritage = character.heritage?.grants ?? [];
    const class_ = character.class?.grants ?? [];
    const firstChoice = character.firstClassChoice?.grants ?? [];
    const secondChoice = character.secondClassChoice?.grants ?? [];

    [...heritage, ...class_, ...firstChoice, ...secondChoice]
        ?.filter(isProficiency)
        .forEach((m) => {
            const skill = skills.find((s) => s.id === m.in);
            if (!skill) return;
            if (!preselected.includes(skill)) preselected.push(skill);
            else if (m.stacks) extra++;
        });

    return { skills: preselected, extra };
}
