import Builder from "./builder";
import type { Character } from "./character/character";
import type { Enum } from "./types";
import Sheet, { CharacterInfo } from "./sheet";
import { CharacterProvider, useCharacter } from "./useCharacter.tsx";
import Popover from "./components/Popover.tsx";
import { loadACharacter } from "./builder/localStorage.ts";

export const Step = {
    Ancestry: 0,
    Heritage: 1,
    Class: 2,
    ClassFirstChoice: 3,
    ClassSecondChoice: 4,
    Skills: 5,
    Complete: 6,
} as const;
export type Step = Enum<typeof Step>;

function characterStep(c: Character): Step {
    if (!c.ancestry) return Step.Ancestry;
    if (c.ancestry.heritages.length && !c.heritage) return Step.Heritage;
    if (!c.class) return Step.Class;
    if (!c.firstClassChoice) return Step.ClassFirstChoice;
    if (c.class.secondChoice && !c.secondClassChoice)
        return Step.ClassSecondChoice;
    if (!c.skills) return Step.Skills;
    return Step.Complete;
}

export function App() {
    return (
        <CharacterProvider>
            <Header />
            <main>
                <AppRouter />
            </main>
            <Footer />
        </CharacterProvider>
    );
}

function Header() {
    return (
        <header className="p-4 flex justify-between">
            <Popover button={<MenuIcon />}>
                <CharacterSelector />
            </Popover>
            <div className="font-bold">LITE-BUILDER</div>
            <div></div>
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

function AppRouter() {
    const [character] = useCharacter();
    const step = characterStep(character);
    return step === Step.Complete ? <Sheet /> : <Builder step={step} />;
}

function Footer() {
    return (
        <footer className="mt-8 w-screen bg-contrasting text-white pt-8 pb-12 flex flex-col gap-4 items-center">
            <p>
                Cette application est un logiciel libre distribué sous licence
                MIT.
            </p>
            <p>
                Toutes les images présentes sur ce site sont la propriété de
                ©Paizo.
            </p>
        </footer>
    );
}
