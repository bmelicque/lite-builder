import { createContext } from "preact";
import {
    type Dispatch,
    type PropsWithChildren,
    useContext,
    useReducer,
} from "preact/compat";

type Params = {
    displayCombat: boolean;
};
function defaultParams(): Params {
    return { displayCombat: true };
}
type ParamsContextValue = [Params, Dispatch<ParamsAction>];
const ParamsContext = createContext<ParamsContextValue | undefined>(undefined);

type ParamsAction = { kind: "toggleDisplayCombat" };

function paramsReducer(params: Params, action: ParamsAction): Params {
    switch (action.kind) {
        case "toggleDisplayCombat":
            return { ...params, displayCombat: !params.displayCombat };
    }
}

export function ParamsProvider({ children }: PropsWithChildren) {
    const value = useReducer(paramsReducer, defaultParams());

    return (
        <ParamsContext.Provider value={value}>
            {children}
        </ParamsContext.Provider>
    );
}

export function useParams(): [Params, Dispatch<ParamsAction>] {
    return useContext(ParamsContext)!;
}
