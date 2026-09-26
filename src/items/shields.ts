import { raiseAShield, type Action } from "../actions";
import type { Modifier } from "../modifiers";
import { GP, type Bulk } from "./utils";

export type Shield = {
    id: string;
    name: string;
    price: number;
    ac: number;
    speedPenalty?: number;
    bulk: Bulk;
    hardness: number;
    hp: number;
    description: string;
};

function shieldBlock(hardness: number): Action {
    return {
        name: "Parade au bouclier",
        category: "reaction",
        actions: "reaction",
        text:
            "**Déclencheur** Alors que votre bouclier est levé, vous devriez subir des dégâts physiques d'une attaque.\n" +
            `Vous interposez votre bouclier pour vous protéger du coup. Votre bouclier vous empêche de subir ${hardness} dégâts. Vous et le bouclier subissez chacun les dégâts restants, brisant ou détruisant éventuellement le bouclier.`,
    };
}
function shieldHp(name: string, amount: number): Modifier {
    return { kind: "hpBank", name, value: amount };
}

const buckler: Shield = {
    id: "buckler",
    name: "Bocle",
    price: 1 * GP,
    ac: 1,
    bulk: "L",
    hardness: 3,
    hp: 6,
    description:
        "Ce très petit bouclier est le favori des duellistes et des combattants rapides dotés d'armures légères. Il est généralement fabriqué en acier et attaché à votre avant-bras. Vous pouvez [Lever](raiseAShield) votre bocle tant que vous avez cette main libre ou que vous tenez dans cette main un objet léger qui ne soit pas une arme.",
};
const raiseABuckler: Action = {
    ...raiseAShield,
    text:
        "**Conditions** Vous un bocle équipé à l'avant-bras et vous ne tenez pas d'arme dans cette main.\n" +
        "Vous positionnez votre bocle pour vous protéger. Vous bénéficiez d'un bonus de circonstances de +1 à votre CA. Votre bouclier reste levé jusqu'au début de votre prochain tour.",
};
export const bucklerActions: Action[] = [
    raiseABuckler,
    shieldBlock(buckler.hardness),
];
export const bucklerHp = shieldHp("Bocle", buckler.hp);

const steelShield: Shield = {
    id: "steelShield",
    name: "Bouclier en acier",
    price: 2 * GP,
    ac: 2,
    bulk: 1,
    hardness: 5,
    hp: 20,
    description:
        "Tout comme les boucliers en bois, les boucliers en acier se déclinent en une variété de formes et de tailles. Bien que plus coûteux que les boucliers en bois, ils sont aussi bien plus résistants.",
};
const raiseA2Shied: Action = {
    ...raiseAShield,
    text:
        "**Conditions** Vous tenez un bouclier dans une main.\n" +
        "Vous positionnez votre bouclier pour vous protéger. Vous bénéficiez d'un bonus de circonstances de +2 à votre CA. Votre bouclier reste levé jusqu'au début de votre prochain tour.",
};
export const steelShieldActions = [
    raiseA2Shied,
    shieldBlock(steelShield.hardness),
];
export const steelShieldHp = shieldHp("Bouclier en acier", steelShield.hp);
