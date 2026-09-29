import { useCharacter } from "../Character.tsx";
import { iterModifiers, type Character } from "../character";
import { isGrantedAction, isSlots } from "../modifiers";

type Props = {
    id: string;
};

export default function Slots({ id }: Props) {
    const [character, dispatch] = useCharacter();
    const slotCount = getSlotCount(character, id);
    if (slotCount === 0) return <></>;
    const usedSlots = (character.status.usedSlots ??= {});
    const used = (usedSlots[id] ??= 0);
    const remaining = slotCount - used;

    const toggleSlot = (i: number) => {
        const action = i < remaining ? "useSlot" : "regainSlot";
        dispatch({ kind: action, category: id });
    };
    return (
        <div className="flex justify-center gap-4">
            {Array.from({ length: slotCount }, (_, i) => (
                <div
                    className={slotStyle(i >= remaining)}
                    onClick={() => toggleSlot(i)}
                >
                    <SlotIcon />
                </div>
            ))}
        </div>
    );
}
export function getSlotCount(character: Character, category: string): number {
    if (category === "focus") {
        const spells = iterModifiers(character)
            .filter(isGrantedAction)
            .filter((a) => a.category === "focus")
            .toArray().length;
        return Math.min(spells, 3);
    }
    return iterModifiers(character)
        .filter(isSlots)
        .filter((s) => s.forCategory === category)
        .reduce((sum, cur) => sum + cur.quantity, 0);
}
function slotStyle(used: boolean): string {
    let className =
        "border-2 border-contrasting rounded-full square basis-[2rem] h-[2rem] cursor-pointer grid items-center justify-center ";
    className += !used ? "bg-contrasting text-white" : "text-contrasting";
    return className;
}

/** `fire` icon from heroicons */
function SlotIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
        </svg>
    );
}
