import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import { arcana, nature } from "../rules/skills";
import { Size, type Ancestry } from "./types";
import { aquaticElf, seerElf, whisperElf, woodlandElf } from "../heritages/elf";
import { trained } from "../modifiers";

export const elf: Ancestry = {
    id: "elf",
    img: "./ancestries/elf.png",
    name: "Elfe",
    summary:
        "Les Elfes sont un peuple de grande taille et à la longue espérance de vie, doté d'une forte tradition artistique et magique.\n" +
        "Si vous voulez incarner un personnage magique, mystique et mystérieux, vous devriez jouer un elfe.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Elfe",
    hp: 6,
    size: Size.Medium,
    speeds: { land: 6 },
    skills: [arcana, nature],
    attributes: {
        boosts: [Attribute.Dexterity, Attribute.Intelligence, "Libre"],
        flaw: Attribute.Constitution,
    },
    heritages: [
        // TODO: ancient elf
        aquaticElf,
        // TODO: arctic elf
        // TODO: cavern elf
        // TODO: desert elf
        seerElf,
        whisperElf,
        woodlandElf,
    ],
    familiarity: [
        // TODO: bows
        weapons.dawnsilverTree,
        weapons.elvenBranchedSpear,
        weapons.elvenCurveBlade,
        weapons.rapier,
    ],
    grants: [
        { kind: "sense", name: "Vision en basse lumière" },
        trained("arcana"),
        trained("nature"),
    ],
};
