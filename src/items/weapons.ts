import { disarm, shove, trip, type Action } from "../actions";
import { Attribute } from "../attributes";
import { gatherModifiers, type Character } from "../character";
import { isProficiency } from "../modifiers";
import { proficiencyValue } from "../proficiencies";
import type { Enum } from "../types";
import { unwrap } from "../utils";
import { GP, Rarity, SP, type Bulk } from "./utils";

export const DamageType = {
    Bludgeoning: "contondant$",
    Piercing: "perforant$",
    Slashing: "tranchant$",
};
export type DamageType = Enum<typeof DamageType>;
export function printDamageType(
    damageType: string | string[],
    plural?: boolean,
) {
    return [damageType]
        .flat()
        .map((t) => t.replace("$", plural ? "s" : ""))
        .join(" ou ");
}

export type Weapon = {
    id: string;
    name: string;
    rarity?: Rarity;
    damageDie: number;
    damageType: DamageType | DamageType[];
    fatal?: number;
    deadly?: number;
    traits?: string[];
    additionalActions?: Action[];
    finesse?: boolean;
    agile?: boolean;
    hands: number;
    twoHanded?: number;
    range?: number;
    reload?: number;
    price: number;
    proficiency:
        | "unarmedAttacks"
        | "simpleWeapons"
        | "martialWeapons"
        | "advancedWeapons";
    group:
        | "axe"
        | "brawling"
        | "club"
        | "firearm"
        | "flail"
        | "hammer"
        | "knife"
        | "pick"
        | "polearm"
        | "sling"
        | "spear"
        | "sword";
    bulk: Bulk;
    description: string;
};

const barricadeBuster: Weapon = {
    id: "barricadeBuster",
    name: "Brise-barricade",
    rarity: Rarity.Uncommon,
    damageDie: 10,
    damageType: DamageType.Bludgeoning,
    traits: ["recul", "démolition", "volée_6m"],
    hands: 2,
    range: 8,
    reload: 0,
    price: 9 * GP,
    proficiency: "advancedWeapons",
    group: "firearm",
    bulk: 3,
    description:
        "Développé par un inventeur dromaar, le brise-barricade comporte huit canons fixés autour d'un pivot central attaché à une poignée et à un mécanisme de mise à feu. Un brise-barricade tire des sphères métalliques avec une vélocité extrême et très peu de précision.",
};

const bastardSword: Weapon = {
    id: "bastardSword",
    name: "Épée bâtarde",
    damageDie: 8,
    damageType: DamageType.Slashing,
    hands: 1,
    twoHanded: 12,
    price: 4 * GP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: 1,
    description:
        "Cette épée à large lame, parfois appelée épée à une-main-et-demie, a une prise plus longue et peut donc être tenue d'une main ou utilisée à deux mains pour fournir une puissance tranchante supplémentaire.",
};

const battleAxe: Weapon = {
    id: "battleAxe",
    name: "Hache d'armes",
    damageDie: 8,
    damageType: DamageType.Slashing,
    traits: ["balayage"],
    hands: 1,
    price: 1 * GP,
    proficiency: "martialWeapons",
    group: "axe",
    bulk: 1,
    description:
        "Ces haches sont conçues explicitement comme des armes plutôt que comme des outils. Elles pèsent généralement moins lourd, avec un manche renforcé de bandes ou de fixations métalliques et une lame plus tranchante, ce qui les rend idéales pour couper des membres bien plus que du bois.",
};

const butcheringAxe: Weapon = {
    id: "butcheringAxe",
    name: "Hachoir de boucher",
    rarity: Rarity.Uncommon,
    damageDie: 12,
    damageType: DamageType.Slashing,
    traits: ["balayage"],
    additionalActions: [shove],
    hands: 2,
    price: 8 * GP,
    proficiency: "advancedWeapons",
    group: "axe",
    bulk: 2,
    description:
        "Le hachoir de boucher possède une tête surdimensionnée et un long et épais manche contrebalancé par de l'acier ou de la pierre. Les coups portés par l'arme infligent d'immenses dégâts, en particulier contre les groupes d'ennemis et peuvent repousser les adversaires dangereux à une distance sûre.",
};

const clanDagger: Weapon = {
    id: "clanDagger",
    name: "Dague de clan",
    rarity: Rarity.Uncommon,
    damageDie: 4,
    damageType: [DamageType.Bludgeoning, DamageType.Piercing],
    agile: true,
    traits: ["parade"],
    hands: 1,
    price: 2 * GP,
    proficiency: "simpleWeapons",
    group: "knife",
    bulk: "L",
    description:
        "Cette large dague est portée par les nains à la fois comme une arme, un outil et pour désigner un clan. Perdre ou devoir rendre une dague de clan est considéré comme une honte pour la plupart des nains.",
};

const clanPistol: Weapon = {
    id: "clanPistol",
    name: "Pistolet de clan",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Piercing,
    traits: ["commotion"],
    hands: 1,
    range: 18,
    reload: 1,
    price: 5 * GP,
    proficiency: "martialWeapons",
    group: "firearm",
    bulk: "L",
    description:
        "La tradition selon laquelle les nains affichent leur appartenance à un clan à l'aide de dagues de clan spécifiques remonte à des millénaires, mais de nombreux clans ont leur propre version de la tradition, les jeunes armuriers prometteurs revendiquant leur âge adulte en fabriquant une arme à feu personnelle spécifique à l'aide des traditions de forge uniques du clan. Perdre ou être forcé de rendre le pistolet de son clan est une honte terrible pour les nains qui le portent.",
};

const dawnsilverTree: Weapon = {
    id: "dawnsilverTree",
    name: "Arbre d'aubargent",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Piercing,
    fatal: 10,
    traits: ["commotion", "parade"],
    hands: 2,
    range: 30,
    reload: 1,
    price: 7 * GP,
    proficiency: "martialWeapons",
    group: "firearm",
    bulk: 1,
    description:
        "Ni aubargent ni arbre, cette longue arme tire son nom des légendes elfes. Arme élégante, l'arbre d'aubargent ressemble tout de même un peu à un arbre. Sa crosse en éventail et son long et large canon renforcé par des anneaux métalliques permettent à celui qui le manie de parer les attaques au corps-à-corps tout en se repliant à une distance de tir suffisamment sûre.",
};

const dogSlicer: Weapon = {
    id: "dogslicer",
    name: "Tranchechien",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Slashing,
    traits: ["traître"],
    finesse: true,
    agile: true,
    hands: 1,
    price: 1 * SP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: "L",
    description:
        "Cette lame de fortune courte, incurvée et grossière, est souvent percée de trous pour en réduire le poids. C'est une arme prisée des gobelins.",
};

const dwarvenScattergun: Weapon = {
    id: "dwarvenScattergun",
    name: "Éparpilleur nain",
    rarity: Rarity.Uncommon,
    damageDie: 8,
    damageType: DamageType.Piercing,
    traits: ["commotion", "recul", "dispersion_3_m"],
    hands: 2,
    range: 10,
    reload: 1,
    price: 10 * GP,
    proficiency: "advancedWeapons",
    group: "firearm",
    bulk: 2,
    description:
        "Arme privilégiée des éclaireurs nains, l'éparpilleur nain est une arme puissante conçue pour tirer parti de la robuste charpente d'un nain. Un éparpilleur nain tire une grande cartouche de papier remplie de poudre noire et de morceaux de métal de la taille d'une articulation, créant une explosion dévastatrice, si destructrice qu'un nain imprudent peut se retrouver blessé par des ricochets douloureux lorsqu'il tire sur une cible trop proche.",
};

const dwarvenWarAxe: Weapon = {
    id: "dwarvenWarAxe",
    name: "Hache de guerre naine",
    rarity: Rarity.Uncommon,
    damageDie: 8,
    damageType: DamageType.Slashing,
    traits: ["balayage"],
    hands: 1,
    twoHanded: 12,
    price: 3 * GP,
    proficiency: "advancedWeapons",
    group: "axe",
    bulk: 2,
    description:
        "Cette arme prisée des nains possède une grande tête décorée montée sur un manche épais. Cette puissante hache peut être utilisée à une ou à deux mains.",
};

const elvenBranchedSpear: Weapon = {
    id: "elvenBranchedSpear",
    name: "Lance ramifiée elfique",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Piercing,
    deadly: 8,
    traits: ["allonge"],
    finesse: true,
    hands: 2,
    price: 3 * GP,
    proficiency: "martialWeapons",
    group: "spear",
    bulk: 1,
    description:
        "Plusieurs branches courtes dépassent du manche de cette délicate lance, chacune étant inclinée vers l'avant et dotée d'une lame en forme de feuille.",
};

const elvenCurveBlade: Weapon = {
    id: "elvenCurveBlade",
    name: "Lame courbe elfique",
    rarity: Rarity.Uncommon,
    damageDie: 8,
    damageType: DamageType.Slashing,
    traits: ["percutant"],
    finesse: true,
    hands: 2,
    price: 4 * GP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: 2,
    description:
        "Version essentiellement plus longue du cimeterre, cette arme elfique traditionnelle possède une lame plus fine que celle de son cousin.",
};

const falchion: Weapon = {
    id: "falchion",
    name: "Cimeterre à deux mains",
    damageDie: 10,
    damageType: DamageType.Slashing,
    traits: ["percutant", "balayage"],
    hands: 2,
    price: 3 * GP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: 2,
    description:
        "Cette arme est une version plus lourde, à deux mains, du cimeterre à lame courbe. Il est lesté vers l'extrémité de la lame, ce qui en fait une puissante arme tranchante.",
};

const fightingStick: Weapon = {
    id: "fightingStick",
    name: "Canne de combat",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Bludgeoning,
    traits: ["prise d'élan", "non-létal"],
    additionalActions: [shove],
    hands: 1,
    price: 5 * SP,
    proficiency: "martialWeapons",
    group: "club",
    bulk: 1,
    description:
        "Cette pièce de bois, dur mais souple, de la taille d'une épée ressemble plus à une perche qu'à une arme, mais peut être mortelle entre de bonnes mains. Bien qu'elle ne soit généralement pas utilisée pour le combat, certains halfelins sont parvenus à la rendre aussi efficace qu'une lame dans un combat. Nombre de halfelins chantent pour maintenir un certain tempo et garder le rythme durant le combat.",
};

const filchersFork: Weapon = {
    id: "filchersFork",
    name: "Fourchette du chapardeur",
    rarity: Rarity.Uncommon,
    damageDie: 4,
    damageType: DamageType.Piercing,
    deadly: 6,
    traits: ["traître", "jet 6 m"],
    agile: true,
    finesse: true,
    hands: 1,
    price: 1 * GP,
    proficiency: "martialWeapons",
    group: "spear",
    bulk: "L",
    description:
        "Cette arme de halfelin ressemble à une longue fourchette à deux branches et s'utilise à la fois comme une arme et un outil de cuisine.",
};

const flingflenser: Weapon = {
    id: "flingflenser",
    name: "Dépeceur",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Slashing,
    fatal: 10,
    traits: ["traître", "dispersion 1,5 m"],
    hands: 2,
    range: 6,
    reload: 1,
    price: 5 * GP,
    proficiency: "advancedWeapons",
    group: "firearm",
    bulk: 1,
    description:
        "Un dépeceur est une arme de conception gobeline se terminant par un tube ovoïde avec une trappe et une poignée à l'extrémité étroite. Un faisceau de lames circulaires maintenues ensemble et attachées à un paquet de poudre noire par une fine lanière de cuir sert de munitions et est chargé par la trappe avant d'être tiré avec une platine à silex ou un autre mécanisme d'allumage externe. La conception robuste du dépeceur le place également parmi les armes gobelines les plus fiables.",
};

const fryingPan: Weapon = {
    id: "fryingPan",
    name: "Poêle à frire",
    damageDie: 4,
    damageType: DamageType.Bludgeoning,
    fatal: 8,
    hands: 1,
    price: 1 * SP,
    proficiency: "simpleWeapons",
    group: "club",
    bulk: "L",
    description:
        "La poêle à frire en fonte est un outil essentiel pour les halfelins aventuriers, les orpailleurs et les taverniers isolés.",
};

const glaive: Weapon = {
    id: "glaive",
    name: "Coutille",
    damageDie: 8,
    damageType: DamageType.Slashing,
    deadly: 8,
    traits: ["percutant", "allonge"],
    hands: 2,
    price: 1 * GP,
    proficiency: "martialWeapons",
    group: "polearm",
    bulk: 2,
    description:
        "Cette arme d'hast est constituée d'une longue lame à un seul tranchant au bout d'un bâton de plus de 2 mètres. Elle est extrêmement efficace pour effectuer des coups tranchants mortels en restant à distance.",
};

const gnomeFlickmace: Weapon = {
    id: "gnomeFlickmace",
    name: "Masse yoyo gnome",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Bludgeoning,
    traits: ["allonge", "balayage"],
    hands: 1,
    price: 3 * GP,
    proficiency: "advancedWeapons",
    group: "flail",
    bulk: 1,
    description:
        "Plus fléau que masse, cette arme possède un manche court attaché à une chaîne avec une boule au bout. Cette dernière est propulsée sur sa distance d'allonge grâce à un coup de poignet, qui la ramène au porteur après la frappe.",
};

const gnomeHookedHammer: Weapon = {
    id: "gnomeHookedHammer",
    name: "Marteau-piolet gnome",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: [DamageType.Bludgeoning, DamageType.Piercing],
    traits: ["croc-en-jambe"],
    hands: 1,
    twoHanded: 10,
    price: 2 * GP,
    proficiency: "martialWeapons",
    group: "hammer",
    bulk: 1,
    description:
        "Cet outil et arme gnome se caractérise par un marteau à une extrémité et une pointe de pioche incurvée de l'autre. C'est une arme tellement étrange et peu commode que les autres races estiment que les gnomes montrent une certaine excentricité à l'utiliser.",
};

const greataxe: Weapon = {
    id: "greataxe",
    name: "Grande hache",
    damageDie: 12,
    damageType: DamageType.Slashing,
    traits: ["balayage"],
    hands: 2,
    price: 2 * GP,
    proficiency: "martialWeapons",
    group: "axe",
    bulk: 2,
    description:
        'Cette grande hache d\'armes est trop lourde pour être maniée à une seule main. Beaucoup de grandes haches comprennent deux lames et sont souvent "barbues", avec un crochet à leur base pour augmenter la force de leur pouvoir tranchant.',
};

const halflingSlingStaff: Weapon = {
    id: "halflingSlingStaff",
    name: "Fustiballe de halfelin",
    rarity: Rarity.Uncommon,
    damageDie: 10,
    damageType: DamageType.Bludgeoning,
    traits: ["propulsif"],
    hands: 2,
    range: 16,
    reload: 1,
    price: 5 * GP,
    proficiency: "martialWeapons",
    group: "sling",
    bulk: 1,
    description:
        "Ce bâton se termine par une fourche en forme de Y supportant une fronde. La longueur du bâton permet un excellent effet de levier lorsqu'on l'utilise à deux mains pour lancer des pierres ou des billes avec la fronde.",
};

const horseChopper: Weapon = {
    id: "horsechopper",
    name: "Coupecheval",
    rarity: Rarity.Uncommon,
    damageDie: 8,
    damageType: [DamageType.Piercing, DamageType.Slashing],
    traits: ["allonge"],
    additionalActions: [trip],
    hands: 2,
    price: 9 * SP,
    proficiency: "martialWeapons",
    group: "polearm",
    bulk: 2,
    description:
        "Créée par les gobelins pour combattre les chevaux, cette arme est pour l'essentiel un long manche se terminant par une lame avec un gros crochet.",
};

const kukri: Weapon = {
    id: "kukri",
    name: "Kukri",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Slashing,
    traits: ["croc-en-jambe"],
    additionalActions: [trip],
    agile: true,
    finesse: true,
    hands: 1,
    price: 6 * SP,
    proficiency: "martialWeapons",
    group: "knife",
    bulk: "L",
    description:
        "La lame de ce couteau long de 30 centimètres se courbe et ne possède pas de garde au niveau de la poignée.",
};

const longHammer: Weapon = {
    id: "longHammer",
    name: "Marteau long",
    damageDie: 8,
    damageType: [DamageType.Bludgeoning, DamageType.Piercing],
    traits: ["allonge", "croc-en-jambe"],
    hands: 2,
    price: 5 * GP,
    proficiency: "martialWeapons",
    group: "hammer",
    bulk: 2,
    description:
        "Le marteau long est doté d'une tête de marteau à dents conçue pour endommager les genoux et les chevilles, contrebalancée par une pointe robuste et fixée à un manche renforcé de 1,50 mètre à 2 mètres de long.",
};

const orcKnuckleDagger: Weapon = {
    id: "orcKnuckleDagger",
    name: "Dague coup-de-poing orque",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Piercing,
    traits: ["désarmer"],
    agile: true,
    hands: 1,
    price: 7 * SP,
    proficiency: "martialWeapons",
    group: "knife",
    bulk: "L",
    description:
        "Cette lame en métal robuste de conception orque possède une garde horizontale sur la poignée et des lames qui sortent de chaque extrémité ou parfois une lame ressemblant à celle d'un katar.",
};

const orcNecksplitter: Weapon = {
    id: "orcNecksplitter",
    name: "Coupe-nuque orc",
    rarity: Rarity.Uncommon,
    damageDie: 8,
    damageType: DamageType.Slashing,
    traits: ["percutant", "balayage"],
    hands: 1,
    price: 2 * GP,
    proficiency: "advancedWeapons",
    group: "axe",
    bulk: 1,
    description:
        "Cette hache possède une lame barbue et dentelée idéale pour séparer l'os du tendon et du cartilage.",
};

const pick: Weapon = {
    id: "pick",
    name: "Pioche de guerre",
    damageDie: 6,
    damageType: DamageType.Piercing,
    fatal: 10,
    hands: 1,
    price: 7 * SP,
    proficiency: "martialWeapons",
    group: "pick",
    bulk: 1,
    description:
        "Une pioche conçue uniquement pour le combat qui possède un manche en bois robuste et une tête lourde et pointue permettant de porter des coups dévastateurs.",
};

const rapier: Weapon = {
    id: "rapier",
    name: "Rapière",
    damageDie: 6,
    damageType: DamageType.Piercing,
    deadly: 8,
    additionalActions: [disarm],
    finesse: true,
    hands: 1,
    price: 2 * GP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: 1,
    description:
        "La rapière est une longue et fine lame perforante, avec une garde en coupe. Elle est prisée de beaucoup en tant qu'arme de duel.",
};

const shortswort: Weapon = {
    id: "shortswort",
    name: "Épée courte",
    damageDie: 6,
    damageType: [DamageType.Piercing, DamageType.Slashing],
    finesse: true,
    agile: true,
    hands: 1,
    price: 9 * SP,
    proficiency: "martialWeapons",
    group: "sword",
    bulk: "L",
    description:
        "Ces lames se présentent dans toute une variété de formes et de styles, mais elles mesurent généralement 60 cm de long.",
};

const sling: Weapon = {
    id: "sling",
    name: "Fronde",
    damageDie: 6,
    damageType: DamageType.Bludgeoning,
    traits: ["propulsif"],
    hands: 1,
    range: 10,
    reload: 1,
    price: 0,
    proficiency: "simpleWeapons",
    group: "sling",
    bulk: "L",
    description:
        "Guère plus qu'une coupelle en cuir fixée à une paire de lanières, la fronde peut être utilisée pour lancer à distance des pierres lisses ou des billes de fronde.",
};

const spraysling: Weapon = {
    id: "spraysling",
    name: "Fronde à dispersion",
    rarity: Rarity.Uncommon,
    damageDie: 6,
    damageType: DamageType.Bludgeoning,
    traits: ["propulsif", "dispersion 1,5 m"],
    hands: 1,
    range: 4,
    reload: 1,
    price: 1 * GP,
    proficiency: "martialWeapons",
    group: "sling",
    bulk: "L",
    description:
        "Une fronde à aspersion est similaire à une fronde ordinaire mais avec une coupelle plus large équipée d'une fine lame fixée sur les bords de la coupe. Lorsqu'elle est utilisée pour effectuer une attaque avec un paquet de granulés à aspersion spécialement préparés, le rasoir tranche le paquet et l'arme lance une volée de granulés cinglants.",
};

const warhammer: Weapon = {
    id: "warhammer",
    name: "Marteau de guerre",
    damageDie: 8,
    damageType: DamageType.Bludgeoning,
    traits: ["pousser"],
    hands: 1,
    price: 1 * GP,
    proficiency: "martialWeapons",
    group: "hammer",
    bulk: 1,
    description:
        "Cette arme possède un manche en bois se terminant par une grande et lourde tête en métal. La tête du marteau peut être à simple face ou à double face, mais elle est toujours capable de délivrer de puissants coups contondants.",
};

export const weapons = {
    barricadeBuster,
    bastardSword,
    battleAxe,
    butcheringAxe,
    clanDagger,
    clanPistol,
    dawnsilverTree,
    dogSlicer,
    dwarvenScattergun,
    dwarvenWarAxe,
    elvenBranchedSpear,
    elvenCurveBlade,
    falchion,
    fightingStick,
    filchersFork,
    flingflenser,
    fryingPan,
    glaive,
    gnomeFlickmace,
    gnomeHookedHammer,
    greataxe,
    halflingSlingStaff,
    horseChopper,
    kukri,
    longHammer,
    orcKnuckleDagger,
    orcNecksplitter,
    pick,
    rapier,
    shortswort,
    sling,
    spraysling,
    warhammer,
} as const;

const familiarity = {
    advancedWeapons: "martialWeapons",
    martialWeapons: "simpleWeapons",
    simpleWeapons: "simpleWeapons",
    unarmedAttacks: "unarmedAttacks",
};
export function attackModifiers(
    character: Partial<Character>,
    weapon: Weapon,
): string {
    const proficiencyBonus = weaponProficiencyBonus(character, weapon);
    const map = weapon.agile ? -4 : -5;
    const first = proficiencyBonus + attribute(character, weapon);
    const second = first + map;
    const third = second + map;
    return [first, second, third]
        .map((m) => (m >= 0 ? `+${m}` : m.toString()))
        .join("/");
}
export function weaponProficiencyBonus(
    character: Partial<Character>,
    weapon: Weapon,
): number {
    const category = character.ancestry?.familiarity.includes(weapon)
        ? familiarity[weapon.proficiency]
        : weapon.proficiency;
    const proficiency = gatherModifiers(character)
        .filter(isProficiency)
        .filter((p) => p.in === category)
        .reduce((max, cur) => Math.max(max, proficiencyValue[cur.rank]), 0);
    return proficiency && 2 * proficiency + 1;
}

function attribute(character: Partial<Character>, weapon: Weapon): number {
    const attributes = unwrap(character.attributes);
    if (weapon.range) return attributes[Attribute.Dexterity];
    if (!weapon.finesse) return attributes[Attribute.Strength];
    return Math.max(
        attributes[Attribute.Strength],
        attributes[Attribute.Dexterity],
    );
}

export function isStrengthWeapon(weapon: Weapon): boolean {
    return !weapon.range;
}
export function isDexterityWeapon(weapon: Weapon): boolean {
    return Boolean(weapon.finesse) || Boolean(weapon.range);
}
