import type { PropsWithChildren } from "preact/compat";
import Header from "./Header";

export default function ({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
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
