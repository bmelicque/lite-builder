import type { Attribute } from "../attributes";
import type { Character } from "../character";
import { usePartialCharacter } from "../Character.tsx";
import { type Class, classes } from "../classes";

export default function ClassBuilder() {
    const [character, dispatch] = usePartialCharacter();
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
            <div className="flex flex-wrap gap-4 mt-8">
                {recommended.map((c) => (
                    <ClassCard
                        class={c}
                        onSelect={() =>
                            dispatch({ kind: "selectClass", class: c })
                        }
                    />
                ))}
            </div>
        </section>
    );
}

function getRecommendedClasses(character: Partial<Character>): Class[] {
    const flaw = character.ancestry!.attributes.flaw;
    if (!flaw) return classes;
    return classes.filter((c) => !c.forbiddenFlaws?.includes(flaw));
}

type ClassCardProps = {
    class: Class;
    onSelect: () => void;
};
function ClassCard({ class: class_, onSelect }: ClassCardProps) {
    return (
        <article className="flex items-center max-w-[55ch] gap-2">
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
                <button
                    className="uppercase bg-contrasting self-center px-4 py-1 text-white rounded cursor-pointer"
                    onClick={onSelect}
                >
                    Sélectionner
                </button>
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
