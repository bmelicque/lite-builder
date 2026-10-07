import { iterModifiers } from "../character/character";
import { formatDistance } from "../formatting";
import { isSpeedModifier } from "../modifiers";
import { useCharacter } from "../useCharacter";

export default function () {
    const speeds = useSpeeds();
    return (
        <section>
            <h2>Vitesses</h2>
            <Speed name="Marche" value={speeds.land} />
            <Speed name="Nage" value={speeds.swim} />
        </section>
    );
}

function useSpeeds() {
    const [character] = useCharacter();
    const speeds = structuredClone(character.ancestry!.speeds);
    const modifiers = iterModifiers(character)
        .filter(isSpeedModifier)
        .toArray();
    for (const mod of modifiers) {
        if (mod.cumulative) continue;
        speeds[mod.environment] ??= 0;
        if (speeds[mod.environment]! < mod.value)
            speeds[mod.environment] = mod.value;
    }
    for (const mod of modifiers) {
        if (!mod.cumulative) continue;
        speeds[mod.environment] ??= 0;
        speeds[mod.environment] += mod.value;
    }
    return speeds;
}

type SpeedProps = {
    name: string;
    value: number | undefined;
};
function Speed(props: SpeedProps) {
    if (!props.value) return <></>;
    return (
        <p>
            <span className="font-bold">{props.name}&nbsp;:</span>{" "}
            {formatDistance(props.value)} mètres
        </p>
    );
}
