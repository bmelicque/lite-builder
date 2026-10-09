import type { Character } from "../character/character";
import { useCharacter } from "../useCharacter.tsx";
import type { ClassChoiceOption, OptionRequirement } from "../classes/types";
import SubmitButton from "../components/SubmitButton.tsx";
import RichText from "../RichText";
import { unwrap } from "../utils";
import Grid from "./Grid.tsx";

type Props = { index: number };
export default function ClassChoiceBuilder({ index }: Props) {
    const [character, dispatch] = useCharacter();
    const isValid = isValidOption.bind(null, character);
    const choice = unwrap(character.class!.choices[index]);
    const options = choice.options.filter(isValid);
    const selectOption = (o: ClassChoiceOption) =>
        dispatch({ kind: "selectChoice", index, option: o });
    return (
        <section>
            <h1 className="text-center">{choice.title}</h1>
            <p className="mx-4 my-4 text-sm">{choice.description}</p>
            <Grid>
                {options.map((o) => (
                    <ChoiceOptionCard
                        option={o}
                        onSelect={() => selectOption(o)}
                    />
                ))}
            </Grid>
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
            return character.choices?.[0] === requirement.value;
    }
}

type ChoiceOptionCardProps = {
    option: ClassChoiceOption;
    onSelect: () => void;
};
function ChoiceOptionCard({ option, onSelect }: ChoiceOptionCardProps) {
    return (
        <article className="flex flex-col gap-2 text-sm">
            <header className="uppercase font-serif font-bold text-contrasting text-xl">
                {option.name}
            </header>
            <div>
                <RichText>{option.description}</RichText>
            </div>
            <SubmitButton onClick={onSelect}>Sélectionner</SubmitButton>
        </article>
    );
}
