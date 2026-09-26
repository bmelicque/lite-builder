import { useState } from "preact/hooks";
import { skills, type Skill } from "../skills";
import { handlePreselected } from "./utils";
import { usePartialCharacter } from "../Character.tsx";
import SubmitButton from "../components/SubmitButton";

export default function SkillBuilder() {
    const [character, dispatch] = usePartialCharacter();
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
            <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(55ch,100%),1fr))] gap-x-16 gap-y-8">
                {skills.map((s) => (
                    <SkillCard
                        skill={s}
                        preselected={preselected.includes(s)}
                        selected={selected.includes(s)}
                        onSelect={() => toggleSkill(s)}
                    />
                ))}
            </div>
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
    const border =
        props.preselected || props.selected
            ? "border border-contrasting rounded"
            : "border border-transparent";
    const button = props.preselected ? "" : "cursor-pointer";
    return (
        <div className={border}>
            <div
                className={button}
                onClick={() => props.preselected || props.onSelect()}
            >
                <article className="flex flex-col max-w-[65ch] gap-2 text-sm cursor-pointer px-4 pt-1 pb-2">
                    <header className="flex justify-between uppercase font-serif font-bold text-contrasting text-xl">
                        {props.skill.name}

                        {props.selected && (
                            <div className="rounded-full bg-contrasting w-6 h-6 text-white text-center text-sm grid items-center">
                                ✓
                            </div>
                        )}
                    </header>
                    <div>{props.skill.summary}</div>
                </article>
            </div>
        </div>
    );
}
