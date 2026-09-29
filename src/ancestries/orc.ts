import {
    battleReadyOrc,
    graveOrc,
    holdScarredOrc,
    rainfallOrc,
} from "../heritages/orc";
import { weapons } from "../items/weapons";
import { athletics, survival } from "../rules/skills";
import { Size, type Ancestry } from "./types";

export const orc: Ancestry = {
    id: "orc",
    img: "./ancestries/orc.png",
    name: "Orc",
    summary:
        "Les orcs sont un peuple fier et vigoureux, au physique endurci, qui prise la puissance physique et la gloire au combat.\n" +
        "Si vous voulez un personnage robuste, sans peur et qui excelle dans les prouesses physiques, vous devriez jouer un orc.\n",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Orc",
    hp: 10,
    size: Size.Medium,
    speeds: { land: 5 },
    skills: [athletics, survival],
    attributes: { boosts: ["Libre", "Libre"] },
    heritages: [battleReadyOrc, graveOrc, holdScarredOrc, rainfallOrc],
    familiarity: [
        weapons.barricadeBuster,
        weapons.butcheringAxe,
        weapons.falchion,
        weapons.greataxe,
        weapons.orcKnuckleDagger,
        weapons.orcNecksplitter,
    ],
    grants: [{ kind: "sense", name: "Vision dans le noir" }],
};
