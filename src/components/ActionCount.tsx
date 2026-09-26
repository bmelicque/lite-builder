type Props = {
    actions: string | undefined;
};
export default function (props: Props) {
    switch (props.actions) {
        case "reaction":
            return <Reaction />;
        case "free":
            return <FreeAction />;
        case "one":
            return <OneAction />;
        case "two":
            return <TwoActions />;
        case "three":
            return <ThreeActions />;
        case "one-two":
            return (
                <span className="flex gap-1">
                    <OneAction /> ou <TwoActions />
                </span>
            );
        case "one-three":
            return (
                <span className="flex">
                    <OneAction />-<ThreeActions />
                </span>
            );
        case "two-three":
            return (
                <span>
                    <TwoActions /> ou <ThreeActions />
                </span>
            );
        default:
            return <></>;
    }
}

export function FreeAction() {
    return <img src="./actions/free-action.svg" height={16} width={16} />;
}

export function OneAction() {
    return <img src="./actions/1-action.svg" height={16} width={16} />;
}

export function TwoActions() {
    return <img src="./actions/2-actions.svg" height={16} width={24} />;
}

export function ThreeActions() {
    return <img src="./actions/3-actions.svg" height={16} width={30.5} />;
}

export function Reaction() {
    return <img src="./actions/reaction.svg" height={16} width={16} />;
}
