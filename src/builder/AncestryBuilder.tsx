import { ancestries, type Ancestry } from "../ancestries";
import { useCharacter } from "../useCharacter.tsx";
import SubmitButton from "../components/SubmitButton.tsx";
import RichText from "../RichText";
import { sort } from "../utils";
import Grid from "./Grid.tsx";

export default function AncestryBuilder() {
    const [_, dispatch] = useCharacter();
    const a = Object.values(ancestries).sort(sort);
    return (
        <section>
            <h1 className="text-center">Ascendance</h1>
            <p className="mx-4 my-4 text-sm">
                L'ascendance de votre personnage détermine le peuple qu'il
                considère comme le sien, qu'il s'agisse des humains ambitieux et
                variés, des elfes repliés sur eux-mêmes mais pleins de vivacité,
                des nains traditionalistes et attachés à la famille, ou de tout
                autre peuple. L'ascendance d'un personnage constitue un élément
                clé de son identité&nbsp;; elle façonne sa vision du monde et
                l'aide à y trouver sa place.
            </p>
            <Grid>
                {a.map((a) => (
                    <AncestryCard
                        ancestry={a}
                        onSelect={() =>
                            dispatch({ kind: "selectAncestry", ancestry: a })
                        }
                    />
                ))}
            </Grid>
        </section>
    );
}

type AncestryCardProps = {
    ancestry: Ancestry;
    onSelect: () => void;
};
function AncestryCard({ ancestry, onSelect }: AncestryCardProps) {
    return (
        <article className="flex items-center gap-4">
            <img
                src={ancestry.img}
                className="w-[15ch] h-[20ch] aspect-square object-contain"
            />
            <div className="flex flex-col gap-2 text-sm">
                <header className="uppercase font-serif font-bold text-contrasting text-xl">
                    {ancestry.name}
                </header>
                <div>
                    <RichText>{ancestry.summary}</RichText>
                </div>
                <div>
                    <AncestryBoosts ancestry={ancestry} />
                    <AncestryFlaw ancestry={ancestry} />
                </div>
                <AncestrySkills ancestry={ancestry} />
                <SubmitButton onClick={onSelect}>Sélectionner</SubmitButton>
            </div>
        </article>
    );
}

function AncestryBoosts({ ancestry }: { ancestry: Ancestry }) {
    const boosts = ancestry.attributes.boosts.filter((b) => b !== "Libre");
    return (
        <div>
            <span className="uppercase font-bold">
                Points Forts&nbsp;:&nbsp;
            </span>
            {boosts.length > 0 ? boosts.join(", ") : "Variables"}
        </div>
    );
}

function AncestryFlaw({ ancestry }: { ancestry: Ancestry }) {
    const flaw = ancestry.attributes.flaw;
    if (flaw == null) return <></>;
    return (
        <div>
            <span className="uppercase font-bold">
                Point Faible&nbsp;:&nbsp;
            </span>
            {flaw}
        </div>
    );
}

function AncestrySkills({ ancestry }: { ancestry: Ancestry }) {
    const skills = ancestry.skills;
    return (
        <div>
            <span className="uppercase font-bold">
                Compétences&nbsp;:&nbsp;
            </span>
            {skills === "Au choix"
                ? "Au choix"
                : skills.map((s) => s.name).join(", ")}
        </div>
    );
}
