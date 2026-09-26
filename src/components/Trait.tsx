import { DisplayRule } from "../RichText";
import { rules } from "../rules";
import Popover from "./Popover";

export default function Trait({ id }: { id: string }) {
    const rule = rules[id];
    const text = id.toUpperCase().replace("_", " ");
    const className = "border px-1 text-sm";
    if (!rule) return <div className={className}>{text}</div>;
    return (
        <Popover button={text} className={className}>
            <DisplayRule rule={rule} />
        </Popover>
    );
}
