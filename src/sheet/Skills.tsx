import { Attribute } from "../rules/attributes";
import type { Character } from "../character";
import { getProficiency } from "../proficiencies";
import {
    acrobatics,
    athletics,
    skills,
    stealth,
    thievery,
    type Skill,
} from "../rules/skills";
import Proficiency from "./Proficiency";

type Props = { character: Character };
export default function Skills({ character }: Props) {
    const s = skills.map((s) => getSkillProps(character, s));
    return (
        <section>
            <h2>Compétences</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(25ch,1fr))] justify-items-center gap-x-8 gap-y-2">
                {s.map((s) => (
                    <Skill
                        name={s.name}
                        proficiency={s.proficiency}
                        value={s.value}
                    />
                ))}
            </div>
        </section>
    );
}
function getSkillProps(character: Character, skill: Skill): SkillProps {
    const rank = getProficiency(character, skill.id);
    const p = rank ? 2 * rank + 1 : rank;
    const attributeValue = character.attributes[skill.attribute];
    const penalty = getSkillPenalty(character, skill);
    return {
        name: skill.name,
        proficiency: rank,
        value: p + attributeValue + penalty,
    };
}
const WITH_POSSIBLE_PENALTIES = [acrobatics, athletics, stealth, thievery];
function getSkillPenalty(character: Character, skill: Skill): number {
    if (!WITH_POSSIBLE_PENALTIES.includes(skill)) return 0;
    const armor = character.armor;
    const checkPenalty = armor.checkPenalty ?? 0;
    const meetsReq =
        character.attributes[Attribute.Strength] >= (armor.strengthReq ?? -5);
    switch (skill) {
        case acrobatics:
        case athletics:
            return meetsReq || armor.flexible ? 0 : checkPenalty;
        case stealth:
            return meetsReq && !armor.noisy ? 0 : checkPenalty;
        case thievery:
            return meetsReq ? 0 : checkPenalty;
        default:
            throw new Error();
    }
}

type SkillProps = {
    name: string;
    proficiency: number;
    value: number;
};
export function Skill({ name, proficiency, value }: SkillProps) {
    return (
        <article className="flex gap-2 items-center mr-8 w-64 justify-end">
            <header className="font-bold">{name}</header>
            <div className="border-2 w-[4ch] h-9 py-px rounded-md scoop inset-shadow shadow-contrasting font-bold text-xl grid place-content-center">
                {value >= 0 ? `+${value}` : value}
            </div>
            <Proficiency value={proficiency} />
        </article>
    );
}
