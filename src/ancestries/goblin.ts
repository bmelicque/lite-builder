import { Attribute } from "../attributes";
import { combatClimber } from "../feats/skill";
import { featToPassive } from "../feats/types";
import { DamageType, weapons } from "../items/weapons";
import { nature, stealth } from "../skills";
import { Size, type Ancestry, type Heritage } from "./types";

const charhide: Heritage = {
    id: "charhide",
    name: "Gobelin peaud'charbon",
    text: "Vos ancêtres ont toujours eu une connexion avec le feu et une peau plus épaisse que la norme, qui vous permet de mieux résister aux flammes. Vous obtenez une résistance au feu égale à la moitié de votre niveau (avec un minimum de 1). Vous vous remettez également plus vite des brûlures causées par le feu. Votre test nu pour guérir des dégâts de feu persistants se fait contre un DD 10 au lieu de 15 et est réduit à un DD 5 si une autre créature utilise une action particulièrement adaptée pour vous aider.",
    grants: [
        {
            kind: "resistance",
            to: "aux dégâts de feu",
            value: (c) => Math.max(1, Math.floor(c.level / 2)),
        },
        {
            kind: "passive",
            name: "Gobelin peaud'charbon",
            text: "Vos ancêtres ont toujours eu une connexion avec le feu et une peau plus épaisse que la norme. Vous vous remettez plus vite des brûlures causées par le feu. Votre test nu pour guérir des dégâts de feu persistants se fait contre un DD 10 au lieu de 15 et est réduit à un Test nu, DD 5 si une autre créature utilise une action particulièrement adaptée pour vous aider.",
        },
    ],
};

const irongutText =
    "Vous pouvez vous nourrir d'aliments que la plupart des gens considéreraient comme avariés. Quand vous vous trouvez dans une agglomération, tant qu'il y a des ordures disponibles, vous pouvez vous nourrir convenablement avec de maigres repas, sans devoir utiliser l'activité [Subsister](subsist). Vous pouvez manger et boire même quand vous êtes [nauséeux](sickened).\n" +
    "Vous obtenez un bonus de circonstances de +2 à vos jets de sauvegarde contre les afflictions, contre l'état nauséeux et pour supprimer l'état nauséeux. Quand vous obtenez un succès sur un jet de Vigueur affecté par ce bonus, vous bénéficiez d'un succès critique. Tous ces avantages ne s'appliquent que lorsque l'affliction ou l'état résulte de quelque chose que vous avez ingéré.";
const irongut: Heritage = {
    id: "irongut",
    name: "Gobelin boyaud'fer",
    text: irongutText,
    grants: [
        { kind: "passive", name: "Gobelin boyaud'fer", text: irongutText },
    ],
};

const razortooth: Heritage = {
    id: "razortooth",
    name: "Gobelin dent'rasoir",
    text: "Dans votre famille, les dents constituent des armes formidables. Vous obtenez une attaque sans armes avec votre mâchoire qui inflige 1d6 dégâts perforants.",
    grants: [
        {
            kind: "weapon",
            id: "razortooth",
            name: "Morsure",
            damageDie: 6,
            damageType: DamageType.Piercing,
            finesse: true,
            hands: 0,
            price: 0,
            proficiency: "unarmedAttacks",
            group: "brawling",
            bulk: 0,
            description:
                "Dans votre famille, les dents constituent des armes formidables.",
        },
    ],
};

const tailed: Heritage = {
    id: "tailed",
    name: "Gobelin à queue",
    text: "Vous disposez d'une queue puissante, sans doute parce que vous descendez d'une communauté de singes gobelins. Vous bénéficiez d'un bonus de circonstances de +2 aux tests d'Athlétisme pour [Escalader](climb), vous obtenez [Combattant-grimpeur](combatClimber) comme don supplémentaire et vous réduisez de une le nombre de mains libres qui sont nécessaires pour Escalader ou faire un [Croc-en-jambe](trip).",
    grants: [
        { kind: "passive", ...featToPassive(combatClimber) },
        {
            kind: "passive",
            name: "Gobelin à queue",
            text: "Vous disposez d'une queue puissante, sans doute parce que vous descendez d'une communauté de singes gobelins. Vous bénéficiez d'un bonus de circonstances de +2 aux tests d'Athlétisme pour [Escalader](climb) et vous réduisez de une le nombre de mains libres qui sont nécessaires pour Escalader ou faire un [Croc-en-jambe](trip).",
        },
    ],
};

const treedwellerText =
    "Vous vous êtes adapté particulièrement bien en vivant dans les environnements forestiers. Tant que vous vous trouvez dans une forêt ou une jungle, vous obtenez un bonus de circonstances de +2 aux tests de Discrétion pour [Vous cacher](hide) et [Être furtif](avoidNotice), aux tests de Survie pour [Subsister](subsist) et à votre DD de Survie pour [Dissimuler des traces](coverTracks).";
const treedweller: Heritage = {
    id: "treedweller",
    name: "Gobelin arboricole",
    text: treedwellerText,
    grants: [
        { kind: "passive", name: "Gobelin arboricole", text: treedwellerText },
    ],
};

const unbreakable: Heritage = {
    id: "unbreakable",
    name: "Gobelin incassable",
    text: "Votre crâne exceptionnellement épais, vos os cartilagineux et de nombreuses autres particularités physiques vous permettent de vous remettre promptement de vos blessures. Votre ascendance vous fait gagner 4 points de vie supplémentaires. Quand vous tombez, les dégâts que vous subissez correspondent à ceux d'une chute deux fois moins importante.",
    grants: [
        { kind: "hp", value: 4, perLevel: false },
        {
            kind: "passive",
            name: "Gobelin incassable",
            text: "Votre crâne exceptionnellement épais, vos os cartilagineux et de nombreuses autres particularités physiques vous permettent de vous remettre promptement de vos blessures. Quand vous tombez, les dégâts que vous subissez correspondent à ceux d'une chute deux fois moins importante.",
        },
    ],
};

export const goblin: Ancestry = {
    id: "goblin",
    img: "./ancestries/goblin.png",
    name: "Gobelin",
    summary:
        "Les gobelins sont un peuple de petite taille, pugnace et énergique, qui a passé des millénaires à être décrié et redouté.\n" +
        "Si vous voulez incarner un personnage excentrique, enthousiaste et qui aime s'amuser, vous devriez jouer un gobelin.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Gobelin",
    hp: 6,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [nature, stealth],
    attributes: {
        boosts: [Attribute.Dexterity, Attribute.Charisma, "Libre"],
        flaw: Attribute.Wisdom,
    },
    heritages: [
        // TODO: dokkaebi goblin
        // TODO: snow goblin
        charhide,
        irongut,
        razortooth,
        tailed,
        treedweller,
        unbreakable,
    ],
    familiarity: [
        // TODO: big boom gun
        weapons.dogSlicer,
        weapons.flingflenser,
        weapons.horseChopper,
        // TODO: spoon gun
    ],
    grants: [{ kind: "sense", name: "Vision dans le noir" }],
};
