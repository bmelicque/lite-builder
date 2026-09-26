import AncestryBuilder from "./AncestryBuilder";
import HeritageBuilder from "./HeritageBuilder";
import { unwrap } from "../utils";
import ClassBuilder from "./ClassBuilder";
import ClassChoiceBuilder from "./ClassChoiceBuilder";
import SkillBuilder from "./SkillBuilder";
import WeaponsBuilder from "./WeaponsBuilder";
import { Step } from "../app";
import { useCharacter } from "../Character.tsx";

type Props = {
    step: Step;
};
export default function Builder({ step }: Props) {
    const [character, dispatch] = useCharacter();

    const previous = () => {
        switch (step) {
            case Step.Heritage:
                dispatch({ kind: "remove", key: "ancestry" });
                break;
            case Step.Class:
                if (character.ancestry!.heritages.length > 0) {
                    dispatch({ kind: "remove", key: "heritage" });
                } else {
                    dispatch({ kind: "remove", key: "ancestry" });
                }
                break;
            case Step.ClassFirstChoice:
                dispatch({ kind: "remove", key: "class" });
                break;
            case Step.ClassSecondChoice:
                dispatch({ kind: "remove", key: "firstClassChoice" });
                break;
            case Step.Skills:
                if (unwrap(character.class).secondChoice) {
                    dispatch({ kind: "remove", key: "secondClassChoice" });
                } else {
                    dispatch({ kind: "remove", key: "firstClassChoice" });
                }
                break;
            case Step.Weapons:
                dispatch({ kind: "remove", key: "skills" });
                break;
        }
    };

    return (
        <section>
            {step !== 0 && (
                <button className="cursor-pointer underline" onClick={previous}>
                    Retour
                </button>
            )}
            {step === Step.Ancestry && <AncestryBuilder />}
            {step === Step.Heritage && <HeritageBuilder />}
            {step === Step.Class && <ClassBuilder />}
            {step === Step.ClassFirstChoice && (
                <ClassChoiceBuilder prop="firstChoice" />
            )}
            {step === Step.ClassSecondChoice && (
                <ClassChoiceBuilder prop="secondChoice" />
            )}
            {step === Step.Skills && <SkillBuilder />}
            {step === Step.Weapons && <WeaponsBuilder />}
        </section>
    );
}
