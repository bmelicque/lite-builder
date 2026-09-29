import type { Attribute } from "../rules/attributes.ts";
import type { Character } from "../character";
import { useCharacter } from "../Character.tsx";
import { type Class, classes } from "../classes";
import Grid from "./Grid.tsx";
import SubmitButton from "../components/SubmitButton.tsx";

export default function ClassBuilder() {
    const [character, dispatch] = useCharacter();
    const recommended = getRecommendedClasses(character);
    return (
        <section>
            <h1 className="text-center">Classe</h1>
            <p className="mx-4 my-4 text-sm">
                Une classe confère à votre personnage un ensemble de capacités
                héroïques, détermine son efficacité au combat et régit sa
                capacité à se défaire de certains effets néfastes ou à les
                éviter.
            </p>
            <Grid>
                {recommended.map((c) => (
                    <ClassCard
                        class={c}
                        onSelect={() =>
                            dispatch({ kind: "selectClass", class: c })
                        }
                    />
                ))}
            </Grid>
        </section>
    );
}

function getRecommendedClasses(character: Partial<Character>): Class[] {
    const flaw = character.ancestry!.attributes.flaw;
    const c = Object.values(classes);
    if (!flaw) return c;
    return c.filter((c) => !c.forbiddenFlaws?.includes(flaw));
}

type ClassCardProps = {
    class: Class;
    onSelect: () => void;
};
function ClassCard({ class: class_, onSelect }: ClassCardProps) {
    return (
        <article className="flex items-center gap-2">
            <img
                src={class_.img}
                className="w-[20ch] h-full aspect-square object-contain"
            />
            <div className="flex flex-col gap-2 text-sm">
                <header className="uppercase font-serif font-bold text-contrasting text-xl">
                    {class_.name}
                </header>
                <div className="flex flex-wrap gap-1">
                    {class_.flags.map((f) => (
                        <ClassFlag name={f} />
                    ))}
                </div>
                <KeyAttributes attr={class_.keyAttributes} />
                <div>{class_.summary}</div>
                <SubmitButton onClick={onSelect}>Sélectionner</SubmitButton>
            </div>
        </article>
    );
}

function ClassFlag({ name }: { name: string }) {
    return <div className="border px-1 uppercase font-bold">{name}</div>;
}

function KeyAttributes({ attr }: { attr: Attribute[] }) {
    const title = attr.length > 1 ? "Points forts" : "Point fort";
    return (
        <div>
            <strong>{title}&nbsp;:</strong> {attr.join(" ou ")}
        </div>
    );
}
