type Props = {
    value: number;
};

export default function (props: Props) {
    return (
        <div className="grid grid-cols-4 grid-flow-row gap-x-px">
            <div className="text-center text-sm">Q</div>
            <div className="text-center text-sm">E</div>
            <div className="text-center text-sm">M</div>
            <div className="text-center text-sm">L</div>
            <Checkbox checked={props.value >= 1} />
            <Checkbox checked={props.value >= 2} />
            <Checkbox checked={props.value >= 3} />
            <Checkbox checked={props.value >= 4} />
        </div>
    );
}

type CheckboxProps = {
    checked: boolean;
};

function Checkbox(props: CheckboxProps) {
    return (
        <div className="aspect-square w-3 border grid place-content-center">
            {props.checked && (
                <div className="aspect-square w-2 bg-black"></div>
            )}
        </div>
    );
}
