import { Rarity } from "../items/utils";
import type { Spell } from "./types";

export const counterPerformance: Spell = {
    id: "counterPerformance",
    name: "Contre-représentation",
    rarity: Rarity.Uncommon,
    traits: [
        "composition",
        "concentration",
        "focalisation",
        "fortune",
        "manipulation",
        "mental",
    ],
    category: "focus",
    actions: "reaction",
    text:
        "**Zone** émanation de 18 m.\n" +
        "**Déclencheur** Vous ou un allié dans les 18 mètres lancez un jet de sauvegarde contre un effet audible ou visuel.\n" +
        "Votre représentation vous protège vous et vos alliés. Effectuez un test de Représentation d'un type correspondant au déclencheur. Vous et vos alliés dans la zone pouvez utiliser le meilleur résultat entre votre test de Représentation et leur jet de sauvegarde.",
};
