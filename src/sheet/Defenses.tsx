import { Attribute } from "../rules/attributes";
import {
    iterModifiers,
    getProficiency,
    type Character,
    getAttributes,
} from "../character/character";
import { computeArmorAC, getArmor } from "../items/armors";
import { isResistance } from "../modifiers";

type Props = { character: Character };
export default function Defenses({ character }: Props) {
    const ac = computeArmorAC(character, getArmor(character));
    const fortitude = computeDefense(
        character,
        "fortitude",
        Attribute.Constitution,
    );
    const reflexes = computeDefense(character, "reflexes", Attribute.Dexterity);
    const will = computeDefense(character, "will", Attribute.Wisdom);
    const resistances = Object.entries(getResistances(character));
    return (
        <section>
            <div className="flex justify-evenly">
                <Defense name="Armure" value={String(ac)} />
                <Defense name="Vigueur" value={"+" + fortitude} />
                <Defense name="Réflexes" value={"+" + reflexes} />
                <Defense name="Volonté" value={"+" + will} />
            </div>
            {resistances.length > 0 && (
                <div className="mt-6 text-center">
                    {resistances.map((r) => (
                        <div>
                            Résistance {r[1]} {r[0]}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
function computeDefense(
    char: Character,
    id: string,
    attribute: Attribute,
): number {
    return (
        2 * getProficiency(char, id) +
        char.level +
        getAttributes(char)[attribute]
    );
}
function getResistances(character: Character): Record<string, number> {
    return iterModifiers(character)
        .filter(isResistance)
        .reduce<Record<string, number>>((res, cur) => {
            res[cur.to] ??= 0;
            res[cur.to] = Math.max(res[cur.to], cur.value(character));
            return res;
        }, {});
}
type DefenseProps = {
    name: string;
    value: string;
};
function Defense(props: DefenseProps) {
    return (
        <article className="flex flex-col justify-between items-center">
            <header className="font-bold">{props.name}</header>
            <div className="border-2 w-[4ch] h-9 py-px rounded-lg bevel inset-shadow shadow-neutral-500 font-bold text-xl grid place-content-center">
                {props.value}
            </div>
        </article>
    );
}
