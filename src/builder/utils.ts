import { iterModifiers, type Character } from "../character/character";
import { isProficiency } from "../modifiers";
import { skills, type Skill } from "../rules/skills";

type Preselected = {
    skills: Skill[];
    extra: number;
};
export function handlePreselected(character: Character): Preselected {
    const preselected: Skill[] = [];
    let extra = 0;
    iterModifiers(character)
        .filter(isProficiency)
        .forEach((m) => {
            const skill = skills.find((s) => s.id === m.in);
            if (!skill) return;
            if (!preselected.includes(skill)) preselected.push(skill);
            else if (m.stacks) extra++;
        });

    return { skills: preselected, extra };
}
