import type { Heritage } from "../heritages/types";
import { useCharacter } from "../Character.tsx";
import SubmitButton from "../components/SubmitButton.tsx";
import RichText from "../RichText";
import Grid from "./Grid.tsx";

export default function HeritageBuilder() {
    const [character, dispatch] = useCharacter();
    return (
        <section>
            <h1 className="text-center">Héritage</h1>
            <p className="mx-4 my-4 text-sm">
                Choisissez un héritage qui reflète les capacités transmises par
                vos ancêtres ou courantes parmi les membres de votre ascendance
                là où vous avez grandi. Vous ne possédez qu'un seul héritage et
                ne pouvez pas en changer par la suite.
            </p>
            <Grid>
                {character.ancestry!.heritages.map((h) => (
                    <HeritageCard
                        heritage={h}
                        onSelect={() =>
                            dispatch({ kind: "selectHeritage", heritage: h })
                        }
                    />
                ))}
            </Grid>
        </section>
    );
}

type HeritageCardProps = {
    heritage: Heritage;
    onSelect: () => void;
};
function HeritageCard({ heritage, onSelect }: HeritageCardProps) {
    return (
        <article className="flex flex-col gap-2 text-sm max-w-[65ch]">
            <header className="uppercase font-serif font-bold text-contrasting text-xl">
                {heritage.name}
            </header>
            <div>
                <RichText>{heritage.text}</RichText>
            </div>
            <SubmitButton onClick={onSelect}>Sélectionner</SubmitButton>
        </article>
    );
}
