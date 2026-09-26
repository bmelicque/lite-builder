import type { Character } from "../character";
import { usePartialCharacter } from "../Character.tsx";
import type { ClassChoiceOption, OptionRequirement } from "../classes/types";
import RichText from "../RichText";
import { unwrap } from "../utils";

type Props = { prop: "firstChoice" | "secondChoice" };
export default function ClassChoiceBuilder({ prop }: Props) {
    const [character, dispatch] = usePartialCharacter();
    const isValid = isValidOption.bind(null, character);
    const choice = unwrap(character.class![prop]);
    const options = choice.options.filter(isValid);
    const dispatchKind =
        prop === "firstChoice" ? "selectFirstChoice" : "selectSecondChoice";
    return (
        <section>
            <h1 className="text-center">{choice.title}</h1>
            <p className="mx-4 my-4 text-sm">{choice.description}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(55ch,100%),1fr))] gap-8">
                {options.map((o) => (
                    <HeritageCard
                        option={o}
                        onSelect={() =>
                            dispatch({ kind: dispatchKind, option: o })
                        }
                    />
                ))}
            </div>
        </section>
    );
}

function isValidOption(
    character: Partial<Character>,
    o: ClassChoiceOption,
): boolean {
    if (!o.requirement) return true;
    return o.requirement.reduce(
        (ok, req) => ok && matchesRequirement(character, req),
        true,
    );
}
function matchesRequirement(
    character: Partial<Character>,
    requirement: OptionRequirement,
): boolean {
    switch (requirement.kind) {
        case "ancestryFlaw":
            return requirement.isNot !== character.ancestry!.attributes.flaw;
        case "firstOption":
            return character.firstClassChoice!.name === requirement.value;
    }
}

type ChoiceOptionCardProps = {
    option: ClassChoiceOption;
    onSelect: () => void;
};
function HeritageCard({ option, onSelect }: ChoiceOptionCardProps) {
    return (
        <article className="flex flex-col gap-2 text-sm">
            <header className="uppercase font-serif font-bold text-contrasting text-xl">
                {option.name}
            </header>
            <div>
                <RichText>{option.description}</RichText>
            </div>
            <button
                className="uppercase bg-contrasting self-center px-4 py-1 text-white rounded cursor-pointer"
                onClick={onSelect}
            >
                Sélectionner
            </button>
        </article>
    );
}
