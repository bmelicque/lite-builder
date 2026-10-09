import AncestryBuilder from "./AncestryBuilder";
import HeritageBuilder from "./HeritageBuilder";
import { unwrap } from "../utils";
import ClassBuilder from "./ClassBuilder";
import ClassChoiceBuilder from "./ClassChoiceBuilder";
import SkillBuilder from "./SkillBuilder";
import { useCharacter } from "../useCharacter.tsx";
import { Step } from "../steps.ts";

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
                dispatch({ kind: "removeChoice", index: 1 });
                break;
            case Step.Skills:
                if (unwrap(character.class).choices.length === 2) {
                    dispatch({ kind: "removeChoice", index: 2 });
                } else {
                    dispatch({ kind: "removeChoice", index: 1 });
                }
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
            {step === Step.ClassFirstChoice && <ClassChoiceBuilder index={1} />}
            {step === Step.ClassSecondChoice && (
                <ClassChoiceBuilder index={2} />
            )}
            {step === Step.Skills && <SkillBuilder />}
        </section>
    );
}
