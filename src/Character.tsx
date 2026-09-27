import { createContext } from "preact";
import {
    computeAttributes,
    newCharacter,
    newCharacterStatus,
    type Character,
    type CharacterStatus,
} from "./character";
import {
    type Dispatch,
    type ReactNode,
    useContext,
    useReducer,
} from "preact/compat";
import {
    loadACharacter,
    loadCharacter,
    saveCharacter,
} from "./builder/localStorage";
import type { Ancestry } from "./ancestries";
import type { Heritage } from "./ancestries/types";
import type { Class } from "./classes";
import type { ClassChoiceOption } from "./classes/types";
import type { Skill } from "./rules/skills";
import type { Weapon } from "./items/weapons";
import { selectArmor } from "./items/armors";
import { omit } from "./utils";
import { getSlotCount } from "./sheet/Slots";

type CharacterContextValue = [Partial<Character>, Dispatch<CharacterAction>];
const CharacterContext = createContext<CharacterContextValue | undefined>(
    undefined,
);

type Removable =
    | "ancestry"
    | "heritage"
    | "class"
    | "firstClassChoice"
    | "secondClassChoice"
    | "skills"
    | "weapons";
type CharacterAction =
    | { kind: "newCharacter" }
    | { kind: "selectCharacter"; id: string }
    | { kind: "selectAncestry"; ancestry: Ancestry }
    | { kind: "selectHeritage"; heritage: Heritage }
    | { kind: "selectClass"; class: Class }
    | { kind: "selectFirstChoice"; option: ClassChoiceOption }
    | { kind: "selectSecondChoice"; option: ClassChoiceOption }
    | { kind: "selectSkills"; skills: Skill[] }
    | { kind: "selectWeapons"; weapons: Weapon[] }
    | { kind: "remove"; key: Removable }
    | { kind: "setName"; name: string }
    | { kind: "setBackground"; background: string }
    | { kind: "takeDamage"; damage: number }
    | { kind: "heal"; value: number }
    | { kind: "setTemporaryHP"; quantity: number }
    | { kind: "useSlot"; category: string }
    | { kind: "regainSlot"; category: string };

function characterReducer(
    character: Partial<Character>,
    action: CharacterAction,
): Partial<Character> {
    const state = characterReducerHelper(character, action);
    saveCharacter(state);
    return state;
}

function characterReducerHelper(
    character: Partial<Character>,
    action: CharacterAction,
): Partial<Character> {
    const status = character.status ?? newCharacterStatus();

    switch (action.kind) {
        case "newCharacter":
            return newCharacter();
        case "selectCharacter":
            return loadACharacter(action.id);
        case "selectAncestry":
            return { ...character, ancestry: action.ancestry };
        case "selectHeritage":
            return { ...character, heritage: action.heritage };
        case "selectClass":
            return { ...character, class: action.class };
        case "selectFirstChoice":
            return { ...character, firstClassChoice: action.option };
        case "selectSecondChoice":
            return { ...character, secondClassChoice: action.option };
        case "selectSkills": {
            character = { ...character, skills: action.skills };
            character.attributes = computeAttributes(character);
            character.armor = selectArmor(character);
            return character;
        }
        case "selectWeapons":
            return { ...character, weapons: action.weapons };
        case "remove":
            return omit(character, action.key);
        case "setName":
            return { ...character, name: action.name };
        case "setBackground":
            return { ...character, background: action.background };
        case "takeDamage":
            if (action.damage <= status.temporaryHP) {
                const temporaryHP = status.temporaryHP - action.damage;
                return { ...character, status: { ...status, temporaryHP } };
            } else {
                const damage =
                    status.damage + action.damage - status.temporaryHP;
                return {
                    ...character,
                    status: { ...status, temporaryHP: 0, damage },
                };
            }
        case "heal":
            const damage = Math.max(0, status.damage - action.value);
            return { ...character, status: { ...status, damage } };
        case "setTemporaryHP":
            return {
                ...character,
                status: { ...status, temporaryHP: action.quantity },
            };
        case "useSlot": {
            const slotCount = getSlotCount(
                character as Character,
                action.category,
            );
            const usedSlots = (status.usedSlots ??= {});
            const used = (usedSlots[action.category] ??= 0);
            return {
                ...character,
                status: updateSlots(
                    status,
                    action.category,
                    Math.min(slotCount, used + 1),
                ),
            };
        }
        case "regainSlot": {
            const usedSlots = (status.usedSlots ??= {});
            const used = (usedSlots[action.category] ??= 0);
            return {
                ...character,
                status: updateSlots(
                    status,
                    action.category,
                    Math.max(0, used - 1),
                ),
            };
        }
    }
}
function updateSlots(
    status: CharacterStatus,
    category: string,
    count: number,
): CharacterStatus {
    return {
        ...status,
        usedSlots: {
            ...status.usedSlots,
            [category]: count,
        },
    };
}

export function CharacterProvider({ children }: { children: ReactNode }) {
    const value = useReducer(characterReducer, loadCharacter());

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
}

export function usePartialCharacter(): CharacterContextValue {
    return useContext(CharacterContext)!;
}
export function useCharacter(): [Character, Dispatch<CharacterAction>] {
    return useContext(CharacterContext) as any;
}
