import { Attribute } from "../rules/attributes";
import { handlePreselected } from "../builder/utils";
import { getAttributes, getProficiency, type Character } from "../character";
import { acrobatics, athletics, stealth, thievery } from "../rules/skills";
import { unwrap } from "../utils";

type ArmorProficiency =
    | "unarmoredDefense"
    | "lightArmor"
    | "mediumArmor"
    | "heavyArmor";

export type Armor = {
    name: string;
    proficiency: ArmorProficiency;
    ac: number;
    dexCap: number;
    checkPenalty?: number;
    flexible?: boolean;
    noisy?: boolean;
    speedPenalty?: number;
    strengthReq?: number;
    price: number;
};

const clothes: Armor = {
    name: "Vêtements de voyageur",
    proficiency: "unarmoredDefense",
    ac: 0,
    dexCap: 5,
    price: 10,
};

const leatherArmor: Armor = {
    name: "Armure de cuir",
    proficiency: "lightArmor",
    ac: 1,
    dexCap: 4,
    checkPenalty: -1,
    strengthReq: 0,
    price: 200,
};

const kiltedBreastplate: Armor = {
    name: "Brigandine",
    proficiency: "lightArmor",
    ac: 2,
    dexCap: 3,
    checkPenalty: -1,
    strengthReq: 1,
    price: 300,
};

const hideArmor: Armor = {
    name: "Armure de Peau",
    proficiency: "mediumArmor",
    ac: 3,
    dexCap: 2,
    checkPenalty: -2,
    speedPenalty: -1,
    strengthReq: 2,
    price: 200,
};

const breastplate: Armor = {
    name: "Cuirasse",
    proficiency: "mediumArmor",
    ac: 4,
    dexCap: 1,
    checkPenalty: -2,
    speedPenalty: -1,
    strengthReq: 3,
    price: 800,
};

const chainMail: Armor = {
    name: "Cotte de maille",
    proficiency: "mediumArmor",
    ac: 4,
    dexCap: 1,
    checkPenalty: -2,
    flexible: true,
    noisy: true,
    speedPenalty: -1,
    strengthReq: 3,
    price: 600,
};

const skirtedChainMail: Armor = {
    name: "Cotte de maille kiltée",
    proficiency: "heavyArmor",
    ac: 5,
    dexCap: 0,
    checkPenalty: -3,
    noisy: true,
    flexible: true,
    speedPenalty: -1,
    strengthReq: 5,
    price: 800,
};

const armors = [
    clothes,
    leatherArmor,
    kiltedBreastplate,
    hideArmor,
    breastplate,
    chainMail,
    skirtedChainMail,
];

const ARMOR = Symbol();
export function getArmor(character: Character): Armor {
    //@ts-ignore
    if (character[ARMOR] != null) return character[ARMOR];
    const armor = selectArmor(character);
    //@ts-ignore
    character[ARMOR] = armor;
    return armor;
}
function selectArmor(character: Character): Armor {
    const withPenalties = armors
        .filter((a) => givesPenaltyToChosenSkill(character, a))
        .reduce<[Armor, number] | null>(makeArmorReducer(character), null);

    const withoutPenalties = armors
        .filter((a) => !givesPenaltyToChosenSkill(character, a))
        .reduce<[Armor, number] | null>(makeArmorReducer(character), null);

    if (!withPenalties) return withoutPenalties![0];
    if (!withoutPenalties) return withPenalties![0];

    return withPenalties[1] > withoutPenalties[1] + 2
        ? withPenalties[0]
        : withoutPenalties[0];
}

export function computeArmorAC(character: Character, armor: Armor): number {
    const proficiency = getProficiency(character, armor.proficiency);
    const proficiencyBonus = proficiency && proficiency * 2 + 1;
    const dex = Math.min(
        getAttributes(character)[Attribute.Dexterity],
        armor.dexCap,
    );
    return 10 + proficiencyBonus + dex + armor.ac;
}

function givesPenaltyToChosenSkill(
    character: Character,
    armor: Armor,
): boolean {
    if (!armor.checkPenalty) return false;

    const meetsStrengthReq =
        armor.strengthReq == null ||
        armor.strengthReq <= getAttributes(character)[Attribute.Strength];

    const skills = handlePreselected(character).skills.concat(
        unwrap(character.skills),
    );
    if (skills.includes(stealth)) {
        if (!meetsStrengthReq || armor.noisy) return true;
    }
    if (skills.includes(thievery)) {
        if (!meetsStrengthReq) return true;
    }
    if (skills.includes(athletics) || skills.includes(acrobatics)) {
        if (!meetsStrengthReq && !armor.flexible) return true;
    }
    const hindered = !meetsStrengthReq && armor.speedPenalty;
    if (character.ancestry!.speeds.land < 5 && hindered) return true;
    return false;
}

function makeArmorReducer(character: Character) {
    return (best: [Armor, number] | null, cur: Armor): [Armor, number] => {
        const ac = computeArmorAC(character, cur);
        if (!best) return [cur, ac];
        return ac > best[1] ? [cur, ac] : best;
    };
}
