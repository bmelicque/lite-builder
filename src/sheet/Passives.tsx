import { iterModifiers, type Character } from "../character";
import { isGrantedPassive, type GrantedPassive } from "../modifiers";
import RichText from "../RichText";

type Props = { character: Character };

export default function Passives({ character }: Props) {
    const passives = iterModifiers(character)
        .filter(isGrantedPassive)
        .toArray();
    if (passives.length === 0) return <></>;
    return (
        <section>
            <h2>Passifs</h2>
            <div className="flex flex-col gap-4">
                {passives.map((p) => (
                    <PassiveView passive={p} />
                ))}
            </div>
        </section>
    );
}

type ViewProps = {
    passive: GrantedPassive;
};
function PassiveView({ passive }: ViewProps) {
    return (
        <article className="action">
            <h3 className="flex gap-2 font-bold">
                {passive.name}
                <div className="flex-1"></div>
            </h3>
            <RichText>{passive.text}</RichText>
        </article>
    );
}
