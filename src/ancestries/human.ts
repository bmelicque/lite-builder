import { Size, type Ancestry } from "./types";

export const human: Ancestry = {
    id: "human",
    img: "./ancestries/human.png",
    name: "Humain",
    summary:
        "Les êtres humains sont divers et capables de s'adapter, dotés d'un vaste potentiel et d'ambitions profondes.\n" +
        "Si vous voulez un personnage capable d'être à peu près n'importe quoi, vous devriez jouer un humain.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Humain",
    hp: 8,
    size: Size.Medium,
    speeds: { land: 5 },
    skills: "Au choix",
    attributes: { boosts: ["Libre", "Libre"] },
    heritages: [],
    familiarity: [],
};
