import { useState } from "preact/hooks";
import { Attribute } from "../rules/attributes.ts";
import {
    getAttributes,
    iterModifiers,
    newCharacterStatus,
    type Character,
} from "../character";
import Popover from "../components/Popover";
import { isHpModifier } from "../modifiers";
import SubmitButton from "../components/SubmitButton";
import { useCharacter } from "../Character.tsx";

export default function () {
    const [character, dispatch] = useCharacter();
    const max = getMaxHp(character);
    const status = character.status ?? newCharacterStatus();
    const takeDamage = (damage: number) =>
        dispatch({ kind: "takeDamage", damage });
    const healDamage = (value: number) => dispatch({ kind: "heal", value });
    const setTemporaryHP = (quantity: number) =>
        dispatch({ kind: "setTemporaryHP", quantity });
    return (
        <div className="flex flex-col gap-2">
            <div className="flex-grow border-2 h-12 py-px rounded-xl inset-shadow shadow-primary font-bold text-2xl grid place-content-center">
                {max - status.damage}/{max}
            </div>
            <div className="grid grid-cols-3">
                <Updater
                    button="Dégâts"
                    title="Subir des dégâts"
                    onValidate={takeDamage}
                />
                <Updater
                    button="Soin"
                    title="Soigner des dégâts"
                    onValidate={healDamage}
                />
                <Updater
                    button="PV temporaires"
                    title="Fixer les PV temporaires"
                    onValidate={setTemporaryHP}
                />
            </div>
        </div>
    );
}

function getMaxHp(character: Character): number {
    const level = character.level;

    const ancestry = character.ancestry!.hp;
    const class_ = character.class!.hp * level;
    const constitution =
        getAttributes(character)[Attribute.Constitution] * level;
    const extra = iterModifiers(character)
        .filter(isHpModifier)
        .map((m) => (m.perLevel ? m.value * level : m.value))
        .reduce((sum, value) => sum + value, 0);
    return ancestry + class_ + constitution + extra;
}

type UpdaterProps = {
    button: string;
    title: string;
    onValidate: (value: number) => void;
};
function Updater(props: UpdaterProps) {
    const [input, setInput] = useState(0);

    return (
        <Popover className="text-center underline" button={props.button}>
            {(close) => (
                <div className="flex flex-col items-center gap-4">
                    <h1>{props.title}</h1>
                    <fieldset>
                        <label htmlFor="" className="font-bold">
                            Quantité&nbsp;:
                        </label>{" "}
                        <input
                            type="number"
                            min={0}
                            value={input}
                            onInput={(e) =>
                                setInput(parseInt(e.currentTarget.value))
                            }
                        />
                    </fieldset>
                    <SubmitButton
                        onClick={() => {
                            props.onValidate(input);
                            setInput(0);
                            close();
                        }}
                    >
                        Valider
                    </SubmitButton>
                </div>
            )}
        </Popover>
    );
}
