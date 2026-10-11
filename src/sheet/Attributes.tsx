import { getAttributes } from "../character/character";
import { Attribute } from "../rules/attributes";
import { useCharacter } from "../useCharacter";

export default function () {
    const attributes = useAttributes();

    return (
        <section>
            <h2>Attributs</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20ch,1fr))] gap-y-4">
                <AttributeView
                    name="Force"
                    value={attributes[Attribute.Strength]}
                />
                <AttributeView
                    name="Dexterité"
                    value={attributes[Attribute.Dexterity]}
                />
                <AttributeView
                    name="Constitution"
                    value={attributes[Attribute.Constitution]}
                />
                <AttributeView
                    name="Intelligence"
                    value={attributes[Attribute.Intelligence]}
                />
                <AttributeView
                    name="Sagesse"
                    value={attributes[Attribute.Wisdom]}
                />
                <AttributeView
                    name="Charisme"
                    value={attributes[Attribute.Charisma]}
                />
            </div>
        </section>
    );
}

function useAttributes() {
    const [character] = useCharacter();
    return getAttributes(character);
}

type AttributeProps = {
    name: string;
    value: number;
};
function AttributeView({ name, value }: AttributeProps) {
    return (
        <article className="flex gap-2 items-center mr-8">
            <div className="border-2 w-[4ch] h-12 py-px rounded-b-xl scoop inset-shadow shadow-red-800 font-bold text-xl grid place-content-center">
                {value >= 0 ? `+${value}` : value}
            </div>
            <header className="font-bold">{name}</header>
        </article>
    );
}
