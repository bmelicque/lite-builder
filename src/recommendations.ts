type OrRecommendation = {
    kind: "or";
    options: RecommendationRule[];
};

type HasRecommendation = {
    kind: "has";
    fieldName: string;
};

type ValueRecommendation = {
    kind: "value";
    fieldName: string;
    value: string | number;
};

type ContainsRecommendation = {
    kind: "contains";
    fieldName: string;
    value: string;
};

type RecommendationRule =
    | ContainsRecommendation
    | HasRecommendation
    | OrRecommendation
    | ValueRecommendation;

export type Recommendation = {
    for: string;
    value: RecommendationRule;
};

export const meleeWeaponRecommendation: Recommendation = {
    for: "weapon",
    value: {
        kind: "value",
        fieldName: "type",
        value: "melee",
    },
};

export const dexWeaponRecommendation: Recommendation = {
    for: "weapon",
    value: {
        kind: "or",
        options: [
            {
                kind: "value",
                fieldName: "type",
                value: "ranged",
            },
            {
                kind: "contains",
                fieldName: "traits",
                value: "finesse",
            },
        ],
    },
};

export const oneHandedWeapon: Recommendation = {
    for: "weapon",
    value: {
        kind: "value",
        fieldName: "hands",
        value: 1,
    },
};

export function matchesRule(
    rule: RecommendationRule,
    o: Record<string, unknown>,
): boolean {
    switch (rule.kind) {
        case "contains": {
            const name = rule.fieldName;
            if (!(name in o)) return false;
            const field = o[name];
            if (!Array.isArray(field)) return false;
            return field.includes(rule.value);
        }
        case "has":
            return rule.fieldName in o;
        case "or":
            for (const r of rule.options) if (matchesRule(r, o)) return true;
            return false;
        case "value": {
            const name = rule.fieldName;
            if (!(name in o)) return false;
            return o[name] === rule.value;
        }
    }
}
