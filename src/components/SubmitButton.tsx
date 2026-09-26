import type { PropsWithChildren } from "preact/compat";

type Props = { disabled?: boolean; onClick: () => void };

export default function (props: Props & PropsWithChildren) {
    return (
        <button
            className="mt-4 uppercase bg-contrasting self-center px-4 py-1 text-white rounded not-disabled:cursor-pointer disabled:opacity-50"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
