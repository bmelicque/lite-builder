import {
    ancientBloodedDwarf,
    deathWardenDwarf,
    forgeDwarf,
    rockDwarf,
} from "./dwarf";
import { aquaticElf, seerElf, whisperElf, woodlandElf } from "./elf";
import { chameleonGnome, sensateGnome, umbralGnome } from "./gnome";
import {
    charhideGoblin,
    irongutGoblin,
    razortoothGoblin,
    tailedGoblin,
    treedwellerGoblin,
    unbreakableGoblin,
} from "./goblin";
import {
    gutsyHalfling,
    hillockHalfling,
    jinxHalfling,
    wildwoodHalfling,
} from "./halfling";
import {
    leafLeshy,
    lotusLeshy,
    rootLeshy,
    seaweedLeshy,
    vineLeshy,
} from "./leshy";
import { battleReadyOrc, graveOrc, holdScarredOrc, rainfallOrc } from "./orc";

export const heritages = {
    ancientBloodedDwarf,
    deathWardenDwarf,
    forgeDwarf,
    rockDwarf,

    aquaticElf,
    seerElf,
    whisperElf,
    woodlandElf,

    chameleonGnome,
    sensateGnome,
    umbralGnome,

    charhideGoblin,
    irongutGoblin,
    razortoothGoblin,
    tailedGoblin,
    treedwellerGoblin,
    unbreakableGoblin,

    gutsyHalfling,
    hillockHalfling,
    jinxHalfling,
    wildwoodHalfling,

    leafLeshy,
    lotusLeshy,
    rootLeshy,
    seaweedLeshy,
    vineLeshy,

    battleReadyOrc,
    graveOrc,
    holdScarredOrc,
    rainfallOrc,
} as const;
