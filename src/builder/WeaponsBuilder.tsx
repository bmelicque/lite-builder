import { useState } from "preact/hooks";
import {
    attackModifier,
    attackModifiers,
    getAttributes,
    iterModifiers,
    type Character,
} from "../character";
import {
    isDexterityWeapon,
    isStrengthWeapon,
    rateWeapon,
    weapons,
    type Weapon,
} from "../items/weapons";
import RichText from "../RichText";
import { price, Rarity } from "../items/utils";
import { Attribute, type Attributes } from "../rules/attributes.ts";
import { retainMax, sort } from "../utils";
import { matchesRule, type Recommendation } from "../recommendations";
import { useCharacter } from "../Character.tsx";
import { isRecommendation } from "../modifiers.ts";

export default function WeaponsBuilder() {
    const [character, dispatch] = useCharacter();
    const [selected, setSelected] = useState<Weapon[]>([]);

    const toggleWeapon = (w: Weapon) => {
        setSelected((s) =>
            s.includes(w) ? s.filter((e) => e !== w) : [...s, w],
        );
    };

    return (
        <section className="flex flex-col">
            <h1 className="text-center">Armes</h1>
            <p className="mx-4 my-4 text-sm">
                Choisissez la ou les armes que votre personnage utilisera au
                combat.
            </p>
            <div className="flex flex-wrap gap-x-16 gap-y-4 mt-8 item-start">
                {recommendedWeapons(character)
                    .sort(sort)
                    .map((w) => (
                        <WeaponCard
                            character={character}
                            weapon={w}
                            selected={selected.includes(w)}
                            onToggle={() => toggleWeapon(w)}
                        />
                    ))}
            </div>
            <button
                className="mt-4 uppercase bg-contrasting self-center px-4 py-1 text-white rounded cursor-pointer"
                onClick={() =>
                    dispatch({ kind: "selectWeapons", weapons: selected })
                }
            >
                Terminer la création
            </button>
        </section>
    );
}

function recommendedWeapons(character: Character): Weapon[] {
    const attributes = getAttributes(character);
    const recommendations = iterModifiers(character)
        .filter(isRecommendation)
        .filter((r) => r.for === "weapon")
        .toArray();
    const recommended = Object.values(weapons)
        .filter(getWeaponFilter(attributes))
        .filter((w) => hasAccessTo(character, w))
        .filter((w) => isRecommended(recommendations, w));
    const highestMods = retainMax(recommended, (w) =>
        attackModifier(character, w),
    );
    // TODO: keep only familiar if multiple ones
    return retainMax(highestMods, rateWeapon);
}
function getWeaponFilter(attributes: Attributes): (w: Weapon) => boolean {
    if (prefersStrength(attributes)) return isStrengthWeapon;
    if (prefersDexterity(attributes)) return isDexterityWeapon;
    return () => true;
}
function prefersStrength(attributes: Attributes): boolean {
    return attributes[Attribute.Strength] > attributes[Attribute.Dexterity];
}
function prefersDexterity(attributes: Attributes): boolean {
    return attributes[Attribute.Strength] < attributes[Attribute.Dexterity];
}
export function hasAccessTo(
    character: Partial<Character>,
    weapon: Weapon,
): boolean {
    if (!weapon.rarity || weapon.rarity === Rarity.Common) return true;
    return character.ancestry!.familiarity.includes(weapon);
}
function isRecommended(
    recommendations: Recommendation[],
    weapon: Weapon,
): boolean {
    for (const r of recommendations) {
        if (!matchesRule(r.value, weapon)) return false;
    }
    return true;
}

type WeaponCardProps = {
    character: Character;
    weapon: Weapon;
    selected: boolean;
    onToggle: () => void;
};
function WeaponCard(props: WeaponCardProps) {
    const { character, weapon, selected, onToggle } = props;
    const border = selected
        ? "border border-contrasting rounded"
        : "border border-transparent";
    const buttonBg = selected ? "bg-primary" : "bg-contrasting";
    return (
        <div className={border}>
            <article className="flex items-center max-w-[55ch] gap-2 px-4 py-2">
                <div className="flex flex-col gap-2 text-sm">
                    <header className="uppercase font-serif font-bold text-contrasting text-xl flex justify-between">
                        <span>{weapon.name}</span>
                        {attackModifiers(character, weapon)}
                    </header>
                    <div>
                        <RichText>{weaponText(weapon)}</RichText>
                    </div>
                    <button
                        className={`uppercase ${buttonBg} self-center px-4 py-1 text-white rounded cursor-pointer`}
                        onClick={onToggle}
                    >
                        {selected ? "Retirer" : "Ajouter"}
                    </button>
                </div>
            </article>
        </div>
    );
}

function weaponText(w: Weapon): string {
    const dType = [w.damageType]
        .flat()
        .map((t) => t.replace("$", ""))
        .join(" ou ");
    const fatal = w.fatal ? `([fatal d${w.fatal}](fatal))` : "";
    const deadly = w.deadly ? `([mortel d${w.deadly}](deadly))` : "";
    let s = `**Dégâts** d${w.damageDie} ${dType} ${fatal}${deadly}\n`;
    s += `**Mains** ${w.hands} ${w.twoHanded ? `; **À deux mains** d${w.twoHanded}` : ""}\n`;
    if (w.additionalActions) {
        const actions = w.additionalActions
            .map((w) => `[${w.name}](${w.id})`)
            .join(", ");
        s += `[*Autres actions*](weaponActions) ${actions}.\n`;
    }
    s += `**Prix** ${price(w.price)}\n`;
    s += w.description;

    return s;
}
