import Builder from "./builder";
import Sheet from "./sheet";
import { CharacterProvider, useCharacter } from "./useCharacter.tsx";
import { ParamsProvider } from "./useParams.tsx";
import Layout from "./layout/Layout.tsx";
import { characterStep, Step } from "./steps.ts";

export function App() {
    return (
        <ParamsProvider>
            <CharacterProvider>
                <Layout>
                    <AppRouter />
                </Layout>
            </CharacterProvider>
        </ParamsProvider>
    );
}

function AppRouter() {
    const [character] = useCharacter();
    const step = characterStep(character);
    return step === Step.Complete ? <Sheet /> : <Builder step={step} />;
}
