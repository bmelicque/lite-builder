import type { MouseEventHandler, TargetedMouseEvent } from "preact";
import { useRef, type ReactNode } from "react";

type Props = {
    className?: string;
    button: string | ReactNode;
    children: ReactNode | ((close: () => void) => ReactNode);
};

export default function (props: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const open: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        dialogRef.current?.showModal();
    };
    const close = () => dialogRef.current?.close();
    const handleClickOutside: MouseEventHandler<HTMLDialogElement> = (e) => {
        const box = dialogRef.current!.getBoundingClientRect();
        if (isOut(e, box)) {
            e.stopPropagation();
            close();
        }
    };

    const buttonClassName = "cursor-pointer " + (props.className || "");
    return (
        <div className="inline-block">
            <div className="flex flex-col">
                <div onClick={open} className={buttonClassName}>
                    {props.button}
                </div>

                <dialog
                    ref={dialogRef}
                    className="m-auto px-4 max-h-[calc(100dvh-2rem)] w-dvw max-w-(--prose)"
                    onClick={handleClickOutside}
                >
                    <div className="my-1 flex flex-col max-h-[calc(100dvh-2.5rem)]">
                        {typeof props.children === "function"
                            ? props.children(close)
                            : props.children}
                    </div>
                </dialog>
            </div>
        </div>
    );
}

type Event = TargetedMouseEvent<HTMLDialogElement>;
function isOut(e: Event, box: DOMRect): boolean {
    return (
        e.clientX > box.right ||
        e.clientX < box.left ||
        e.clientY > box.bottom ||
        e.clientY < box.top
    );
}
