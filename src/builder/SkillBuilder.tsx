import { useState } from "preact/hooks";
import { skills, type Skill } from "../rules/skills.ts";
import { handlePreselected } from "./utils";
import { useCharacter } from "../useCharacter.tsx";
import SubmitButton from "../components/SubmitButton";
import {
    getAttributes,
    getProficiency,
    type Character,
} from "../character/character";
import Grid from "./Grid.tsx";

export default function SkillBuilder() {
    const [character, dispatch] = useCharacter();
    const [selected, setSelected] = useState<Skill[]>([]);
    const { skills: preselected, extra } = handlePreselected(character);
    const remaining = character.class!.skills + extra - (selected.length ?? 0);
    const toggleSkill = (skill: Skill) => {
        if (selected.includes(skill)) {
            setSelected((s) => s.filter((s) => s !== skill));
        } else {
            if (!remaining) return;
            if (preselected.includes(skill)) return;
            setSelected((s) => [...s, skill]);
        }
    };
    return (
        <section className="flex flex-col gap-4 mb-8">
            <h1 className="text-center">Compétences</h1>
            <p className="mx-4 text-sm">
                Les compétences reflètent la formation et l'expérience du
                personnage dans l'accomplissement de certaines tâches. Chaque
                compétence sert à effectuer diverses actions connexes. La
                maîtrise d'une compétence provient de plusieurs sources,
                notamment l'ascendance, l'historique et la classe du personnage.
            </p>
            <p className="text-center uppercase">
                {remaining ? `Encore ${remaining} à choisir` : <br />}
            </p>
            <Grid>
                {skills.map((s) => (
                    <SkillCard
                        skill={s}
                        preselected={preselected.includes(s)}
                        selected={selected.includes(s)}
                        onSelect={() => toggleSkill(s)}
                    />
                ))}
            </Grid>
            <SubmitButton
                disabled={remaining !== 0}
                onClick={() =>
                    dispatch({ kind: "selectSkills", skills: selected })
                }
            >
                Sélectionner
            </SubmitButton>
        </section>
    );
}

type SkillCardProps = {
    skill: Skill;
    preselected: boolean;
    selected: boolean;
    onSelect: () => void;
};
function SkillCard(props: SkillCardProps) {
    const [character] = useCharacter();
    const border =
        props.preselected || props.selected
            ? "border border-contrasting rounded"
            : "border border-transparent";
    const button = props.preselected ? "" : "cursor-pointer";

    const modifier = getSkillModifier(character, props.skill);
    return (
        <div className={border}>
            <div
                className={button}
                onClick={() => props.preselected || props.onSelect()}
            >
                <article className="flex flex-col gap-2 text-sm cursor-pointer px-4 pt-1 pb-2">
                    <header className="flex justify-between uppercase font-serif font-bold text-contrasting text-xl">
                        {props.skill.name}

                        {props.selected ? (
                            <div>
                                {toString(modifier)} → {toString(modifier + 3)}
                            </div>
                        ) : (
                            <div>{toString(modifier)}</div>
                        )}
                    </header>
                    <div>{props.skill.summary}</div>
                </article>
            </div>
        </div>
    );
}

function getSkillModifier(character: Character, skill: Skill) {
    const rank = getProficiency(character, skill.id);
    const p = rank ? 2 * rank + 1 : rank;
    const attributeValue = getAttributes(character)[skill.attribute];
    return p + attributeValue;
}

function toString(int: number): string {
    return int >= 0 ? `+${int}` : int.toString();
}
