import { combatClimber } from "../feats/skill";
import { featToPassive } from "../feats/types";
import { DamageType } from "../items/weapons";
import { type Heritage } from "./types";

export const charhideGoblin: Heritage = {
    id: "charhideGoblin",
    name: "Gobelin peaud'charbon",
    text: "Vos ancêtres ont toujours eu une connexion avec le feu et une peau plus épaisse que la norme, qui vous permet de mieux résister aux flammes. Vous vous remettez également plus vite des brûlures causées par le feu.",
    grants: [
        {
            kind: "resistance",
            to: "aux dégâts de feu",
            value: (c) => Math.max(1, Math.floor(c.level / 2)),
        },
        {
            kind: "passive",
            name: "Gobelin peaud'charbon",
            text: "Vous vous remettez plus vite des brûlures causées par le feu. Le DD du test pour guérir des dégâts de feu persistants est réduit de 5.",
        },
    ],
};

const irongutText =
    "Vous pouvez vous nourrir d'aliments que la plupart des gens considéreraient comme avariés. Quand vous vous trouvez dans une agglomération, tant qu'il y a des ordures disponibles, vous pouvez vous nourrir convenablement avec de maigres repas, sans devoir utiliser l'activité [Subsister](subsist). Vous pouvez manger et boire même quand vous êtes [nauséeux](sickened).\n" +
    "Vous obtenez un bonus de circonstances de +2 à vos jets de sauvegarde contre les afflictions, contre l'état nauséeux et pour supprimer l'état nauséeux. Quand vous obtenez un succès sur un jet de Vigueur affecté par ce bonus, vous bénéficiez d'un succès critique. Tous ces avantages ne s'appliquent que lorsque l'affliction ou l'état résulte de quelque chose que vous avez ingéré.";
export const irongutGoblin: Heritage = {
    id: "irongutGoblin",
    name: "Gobelin boyaud'fer",
    text: irongutText,
    grants: [
        { kind: "passive", name: "Gobelin boyaud'fer", text: irongutText },
    ],
};

export const razortoothGoblin: Heritage = {
    id: "razortoothGoblin",
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

export const tailedGoblin: Heritage = {
    id: "tailedGoblin",
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
export const treedwellerGoblin: Heritage = {
    id: "treedwellerGoblin",
    name: "Gobelin arboricole",
    text: treedwellerText,
    grants: [
        { kind: "passive", name: "Gobelin arboricole", text: treedwellerText },
    ],
};

export const unbreakableGoblin: Heritage = {
    id: "unbreakableGoblin",
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
