import type { PropsWithChildren } from "preact/compat";

export default function ({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(55ch,1fr))] gap-x-16 gap-y-8 mt-8">
            {children}
        </div>
    );
}
