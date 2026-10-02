import type { Action } from "../actions";
import type { Character } from "../character/character";
import RichText from "../RichText";
import ActionCount from "./ActionCount";
import Trait from "./Trait";

type Props = {
    action: Action;
    character?: Character;
    stack?: string[];
};
export default function ({ action, stack }: Props) {
    return (
        <article className="action">
            <h3 className="flex gap-2 font-bold">
                <ActionCount actions={action.actions} />
                {action.name}
                <div className="flex-1"></div>
                {action.modifiers && <span>{action.modifiers}</span>}
            </h3>
            <div className="flex flex-wrap gap-1">
                {action.traits?.map((t) => (
                    <Trait id={t} />
                ))}
            </div>
            <RichText stack={stack}>{action.text}</RichText>
        </article>
    );
}
