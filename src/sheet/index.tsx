import type { Action } from "../actions";
import { Attribute } from "../rules/attributes.ts";
import { useCharacter } from "../Character.tsx";
import {
    iterModifiers,
    getProficiency,
    type Character,
    getAttributes,
} from "../character";
import ActionView from "../components/ActionView";
import {
    isActionModifier,
    isGrantedAction,
    isSense,
    type ActionModifier,
} from "../modifiers";
import { omit, sort } from "../utils";
import Defenses from "./Defenses";
import HitPoints from "./HitPoints";
import Passives from "./Passives";
import Skills from "./Skills";
import Slots from "./Slots";
import { formatModifiers, weaponToActions } from "./weapons";

export default function Sheet() {
    const [character] = useCharacter();
    const grantedActions = iterModifiers(character)
        .filter(isGrantedAction)
        .map((a) => omit(a, "kind"));
    const weaponActions = character.weapons!.flatMap((w) =>
        weaponToActions(character, w!),
    );
    const actionModifiers = iterModifiers(character)
        .filter(isActionModifier)
        .toArray();
    const actions = [...grantedActions, ...weaponActions].map((a) =>
        applyModifiers(actionModifiers, a),
    );
    updateAlchemicalBombs(character, actions);
    return (
        <div className="max-w-[65ch] mx-auto mb-8 px-3 flex flex-col">
            <section className="grid grid-cols-2 gap-4">
                <NameInput />
                <section>
                    <h2>Infos</h2>
                    <CharacterInfo character={character} />
                </section>
            </section>
            <BackgroundInput />
            <section>
                <h2>Points de Vie</h2>
                <HitPoints />
            </section>
            <Perception character={character} />
            <section>
                <h2>Défenses</h2>
                <Defenses character={character} />
            </section>
            <Actions actions={actions} title="Attaques" category="strike" />
            <Actions actions={actions} title="Impulsions" category="impulse" />
            <Actions actions={actions} title="Alchimie" category="alchemy" />
            <Actions
                actions={actions}
                title="Sorts de Rang 1"
                category="spell1"
            />
            <Actions
                actions={actions}
                title="Sorts Focalisés"
                category="focus"
            />
            <Actions
                actions={actions}
                title="Sorts Mineurs"
                category="cantrip"
            />
            <Actions actions={actions} title="Actions" category="action" />
            <Actions actions={actions} title="Réactions" category="reaction" />
            <Passives character={character} />
            <Skills character={character} />
        </div>
    );
}
function applyModifiers(mods: ActionModifier[], action: Action): Action {
    return mods
        .filter((m) => appliesToAction(m, action))
        .reduce((action, mod) => applyModifier(mod, action), action);
}
function appliesToAction(mod: ActionModifier, action: Action): boolean {
    switch (mod.selector.kind) {
        case "id":
            return action.id === mod.selector.id;
        case "trait":
            return action.traits?.includes(mod.selector.value) ?? false;
    }
}
function applyModifier(mod: ActionModifier, action: Action): Action {
    switch (mod.modification.kind) {
        case "push":
            (action as any)[mod.onField].push(mod.modification.value);
            return action;
        case "replace":
            (action as any)[mod.onField] = mod.modification.value;
            return action;
    }
}

export function CharacterInfo({ character }: { character: Character }) {
    return (
        <span>
            {character.class!.name} {character.ancestry!.name} niveau{" "}
            {character.level}
        </span>
    );
}

function NameInput() {
    const [character, dispatch] = useCharacter();
    return (
        <section>
            <h2>Nom du personnage</h2>
            <input
                type="text"
                className=""
                value={character.name}
                onInput={(e) =>
                    dispatch({ kind: "setName", name: e.currentTarget.value })
                }
                placeholder="Indiquez un nom"
            />
        </section>
    );
}

function BackgroundInput() {
    const [character, dispatch] = useCharacter();
    return (
        <section className="flex flex-col">
            <h2>Historique</h2>
            <textarea
                onInput={(e) =>
                    dispatch({
                        kind: "setBackground",
                        background: e.currentTarget.value,
                    })
                }
                rows={4}
                placeholder="Que faisiez-vous avant de partir à l'aventure ?"
            >
                {character.background}
            </textarea>
        </section>
    );
}

type PerceptionProps = {
    character: Character;
};
function Perception({ character }: PerceptionProps) {
    const proficiency =
        2 * getProficiency(character, "perception") + character.level;
    const wisdom = getAttributes(character)[Attribute.Wisdom];
    const perception = proficiency + wisdom;
    const senses = getSenses(character);
    return (
        <section className="grid grid-cols-3 place-items-stretch gap-4">
            <section>
                <h2>Perception</h2>
                <div class="flex justify-center items-center">
                    <div className="border-2 w-[3.5ch] aspect-square py-px rounded-full inset-shadow shadow-primary font-bold text-xl grid place-content-center">
                        +{perception}
                    </div>
                </div>
            </section>
            <section className="col-span-2">
                <h2>Sens spéciaux</h2>
                {senses.length > 0
                    ? senses.map((s) => <div>{s}</div>)
                    : "Aucun"}
            </section>
        </section>
    );
}
function getSenses(character: Character): string[] {
    const senses = iterModifiers(character)
        .filter(isSense)
        .map((s) => s.name);
    const set = new Set(senses);
    if (set.has("Vision dans le noir")) set.delete("Vision en basse lumière");
    return Array.from(set);
}

type ActionsProps = {
    actions: Action[];
    category: string;
    title: string;
};
function Actions(props: ActionsProps) {
    const [character] = useCharacter();
    const found = new Set<Action>();
    const count = iterModifiers(character)
        .filter((m) => m.kind === "knownItems")
        .find((m) => m.forCategory === props.category)?.count;
    const actions = props.actions
        .filter((a) => a.category === props.category)
        .filter((a) => (found.has(a) ? false : (found.add(a), true)))
        .slice(0, count)
        .sort(sort);
    if (!actions || !actions.length) return <></>;
    if (isSpellCategory(props.category))
        actions.forEach((a) => setSpellModifier(character, a));
    return (
        <section>
            <h2>{props.title}</h2>
            <Slots id={props.category} />
            {props.category.startsWith("spell") && (
                <p className="italic">
                    Vous récupérez vos emplacements de sorts pendant vos
                    préparatifs quotidiens.
                </p>
            )}
            {props.category === "focus" && (
                <p className="italic">
                    Vous pouvez récupérez un point de focalisation en vous
                    Reconcentrant 10 minutes.
                </p>
            )}
            <div className="flex flex-col gap-4">
                {actions.map((a) => (
                    <ActionView action={a} />
                ))}
            </div>
        </section>
    );
}
function isSpellCategory(category: string): boolean {
    return (
        category === "cantrip" ||
        category === "focus" ||
        category.startsWith("spell")
    );
}
function setSpellModifier(character: Character, action: Action) {
    // The way characters are built, their spellcasting attribute should be
    // their highest attribute
    const attribute = Math.max(
        getAttributes(character)[Attribute.Intelligence],
        getAttributes(character)[Attribute.Wisdom],
        getAttributes(character)[Attribute.Charisma],
    );
    if (action.attack) {
        const rank = getProficiency(character, "spellAttackModifier");
        const p = rank ? 2 * rank + 1 : rank;
        action.modifiers = formatModifiers(p + attribute, -5);
        return;
    }
    //@ts-ignore
    if (action.dc) {
        const rank = getProficiency(character, "spellDC");
        const p = rank ? 2 * rank + 1 : rank;
        action.modifiers = `DD ${10 + p + attribute}`;
    }
    return;
}
function updateAlchemicalBombs(character: Character, actions: Action[]) {
    const proficiencyRank = Math.max(
        getProficiency(character, "martialWeapons"),
        getProficiency(character, "alchemicalBombs"),
    );
    const proficiency = proficiencyRank && 2 * proficiencyRank + 1;
    const first = proficiency + getAttributes(character)[Attribute.Dexterity];
    const modifier = formatModifiers(first, -5);
    actions
        .filter((a) => a.traits?.includes("bombe"))
        .forEach((b) => updateAlchemicalBomb(b, modifier));
}
function updateAlchemicalBomb(bomb: Action, modifier: string) {
    console.log(bomb.name);
    bomb.category = "strike";
    bomb.modifiers = modifier;
}
