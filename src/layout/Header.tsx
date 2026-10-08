import { loadACharacter } from "../builder/localStorage";
import type { Character } from "../character/character";
import Popover from "../components/Popover";
import { CharacterInfo } from "../sheet";
import { characterStep, Step } from "../steps";
import { useCharacter } from "../useCharacter";
import { useParams } from "../useParams";

export default function Header() {
    return (
        <header className="p-4 flex justify-between">
            <Popover button={<MenuIcon />}>
                <CharacterSelector />
            </Popover>
            <div className="font-bold">LITE-BUILDER</div>
            <CombatToggle />
        </header>
    );
}
function MenuIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    );
}
function CharacterSelector() {
    const [_, dispatch] = useCharacter();
    const characters = Array(localStorage.length)
        .fill(null)
        .map((_, i) => localStorage.key(i))
        .filter((key) => key != null)
        .map(loadACharacter)
        .filter(isComplete);
    return (
        <div className="min-h-[20rem]">
            <h2>Personnages</h2>
            <section className="flex flex-col gap-2 my-2">
                <button onClick={() => dispatch({ kind: "newCharacter" })}>
                    + Nouveau personnage
                </button>
                {characters.map((c) => (
                    <CharacterCard character={c} />
                ))}
            </section>
        </div>
    );
}
function isComplete(char: Character): char is Character {
    return characterStep(char) === Step.Complete;
}
function CharacterCard({ character }: { character: Character }) {
    const [_, dispatch] = useCharacter();
    const isCurrent = localStorage.getItem("id") === character.id;
    const selectCharacter = () =>
        dispatch({ kind: "selectCharacter", id: character.id });

    return (
        <article className="py-2 flex justify-between">
            <div className="cursor-pointer" onClick={selectCharacter}>
                {character.name || <span className="italic">Sans nom</span>} (
                <CharacterInfo character={character} />)
            </div>
            <div className="">{isCurrent && "(courant)"}</div>
        </article>
    );
}
function CombatToggle() {
    const [params, dispatch] = useParams();
    const [character] = useCharacter();
    if (!isComplete(character)) return <div />;
    const color = params.displayCombat ? "text-contrasting" : "";
    const className = `cursor-pointer ${color}`;
    const toggle = () => dispatch({ kind: "toggleDisplayCombat" });
    return (
        <button className={className} onClick={toggle}>
            <CombatIcon filled={params.displayCombat} />
        </button>
    );
}
function CombatIcon({ filled }: { filled: boolean }) {
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
                fill={filled ? "currentColor" : "white"}
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
        </svg>
    );
}
