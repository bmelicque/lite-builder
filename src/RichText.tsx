import ActionView from "./components/ActionView";
import Popover from "./components/Popover";
import { rules, type Rule } from "./rules";
import { omit } from "./utils";

type Props = {
    stack?: string[];
    children: string | string[];
};
export default function RichText({ children, stack = [] }: Props) {
    if (!children) return <></>;
    if (Array.isArray(children)) children = children.join("");
    const lines = children.split(/(\n)/);
    return (
        <div>
            {lines.map((line, i) => (
                <RichLine key={line + i} line={line} stack={stack} />
            ))}
        </div>
    );
}

type LineProps = {
    line: string;
    stack: string[];
};
function RichLine({ line, stack }: LineProps) {
    line = line.trim();
    let head = 0;
    while (line.startsWith("#")) {
        line = line.slice(1);
        head++;
    }
    const tokens = line
        .split(/({{.*?}})/g)
        .flatMap((text) => text.split(/(\*\*.*?\*\*)/g))
        .flatMap((text) => text.split(/(_.*?_)/g))
        .flatMap((text) => text.split(/(\[.*?\]\(.*?\))/g));
    const content = tokens.map((token, i) => (
        <RichToken key={token + i} token={token} stack={stack} />
    ));

    switch (head) {
        case 1:
            return <h1>{content}</h1>;
        case 2:
            return <h2>{content}</h2>;
        case 3:
            return <h3>{content}</h3>;
        default:
            return <div>{content}</div>;
    }
}

type TokenProps = {
    token: string;
    stack?: string[];
};
function RichToken({ token, stack }: TokenProps) {
    if (!token) return <></>;
    if (token === "\n") return <br />;
    if (token.startsWith("{{") && token.endsWith("}}")) {
        return <Evaluate expr={token.slice(2, -2)} />;
    }
    if (token.startsWith("**") && token.endsWith("**")) {
        return <strong>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("_") && token.endsWith("_")) {
        return <div>COUCOU</div>;
    }
    let match;
    if ((match = token.match(/\[(.*?)\]\((.*?)\)/))) {
        return (
            <RichPopover text={match[1]} id={match[2]} stack={stack ?? []} />
        );
    }
    return token;
}

function Evaluate({ expr }: { expr: string }) {
    return <span>{evaluate(expr)}</span>;
}
function evaluate(expr: string): number {
    expr = expr.replace(/floor\(([^()]*)\)/g, (sub) =>
        Math.floor(evaluate(sub.slice(6, -1))).toString(),
    );
    expr = expr.replace(/ceil\(([^()]*)\)/g, (sub) =>
        Math.ceil(evaluate(sub.slice(5, -1))).toString(),
    );
    expr = expr.replace(/max\(([^()]*)\)/g, (sub) =>
        Math.max(...sub.slice(4, -1).split(",").map(evaluate)).toString(),
    );
    if (expr.match(/[*/]/)) {
        const operators = expr.match(/([*/])/g);
        const operands = expr.split(/[*/]/);
        return operands.slice(1).reduce((res, cur, i) => {
            const c = evaluate(cur);
            return operators?.[i - 1] === "/" ? res * c : res / c;
        }, evaluate(operands[0]));
    }
    if (expr.includes("+")) {
        const operands = expr.split("+");
        return operands.reduce((res, cur) => res + evaluate(cur), 0);
    }
    expr = expr.trim();
    // FIXME:
    if (expr === "level") return 1;
    return parseInt(expr);
}

type RichPopoverProps = {
    text: string;
    id: string;
    stack: string[];
};
function RichPopover(props: RichPopoverProps) {
    const r = rules[props.id];
    if (!r || props.stack.includes(props.id)) return <span>{props.text}</span>;
    const isBold = props.text.startsWith("*") && props.text.endsWith("*");
    const text = isBold ? props.text.slice(1, -1) : props.text;
    const className = isBold ? "font-bold underline" : "underline";
    return (
        <Popover className={className} button={text}>
            <DisplayRule rule={r} stack={[...props.stack, props.id]} />
        </Popover>
    );
}

type RuleProps = {
    rule: Rule;
    stack?: string[];
};
export function DisplayRule({ rule, stack = [] }: RuleProps) {
    switch (rule.kind) {
        case "action":
            return <ActionView action={omit(rule, "kind")} stack={stack} />;
        case "general":
            return (
                <RichText stack={stack}>
                    #{rule.name}
                    {"\n"}
                    {rule.description}
                </RichText>
            );
    }
}
