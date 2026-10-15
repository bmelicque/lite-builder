import { weapons } from "../items/weapons";
import {
    expert,
    trained,
    type CustomCategory,
    type GrantedAction,
} from "../modifiers";
import { Attribute } from "../rules/attributes";
import { Flag, type Class } from "./types";

const runes: CustomCategory = {
    kind: "customCategory",
    id: "runes",
    name: "Runes",
    introText:
        "_Grâce à une étude méticuleuse, vous avez gravé la connaissance des runes secrètes dans votre esprit et votre corps. Vous pouvez appliquer des runes spéciales sur des objets et des créatures, qui confèrent au porteur des effets magiques._\n" +
        "Toute rune peut être appliquée de deux manières : gravée ou tracée.\n" +
        "Une rune gravée est sculptée, encrée ou marquée ; cette application n'endommage pas la créature ou l'objet. Votre magie peut maintenir jusqu'à deux runes gravées à la fois. Vous pouvez graver n'importe quel nombre de runes jusqu'à votre maximum en 10 minutes. Vos runes gravées persistent jusqu'à ce qu'elles soient dépensées ou supprimées.\n" +
        "Une rune tracée est dessinée dans la poussière, la lumière ou un support éphémère similaire. Vous pouvez tracer une rune par une action @oneAction sur une cible au contact, ou par deux actions @twoActions sur une cible dans les 9 mètres. Une rune tracée rune ne persiste que jusqu'à la fin de votre prochain tour.\n" +
        "Vous pouvez Invoquer une ou deux rune dans un rayon de 9 mètres par une action @oneAction pour déclencher son effet d'invocation. Une rune invoquée disparaît alors, sa tâche accomplie.",
    actions: { kind: "trait", value: "rune" },
};

const esvadir: GrantedAction = {
    kind: "action",
    id: "esvadir",
    name: "Esvadir, rune des pierres à aiguiser",
    traits: ["rune", "magique", "forgerune"],
    category: "action",
    text:
        "**Utilisation** dessinée sur une arme qui inflige des dégâts perforants ou tranchants.\n" +
        "Cette rune cuspidée, lorsqu'elle est placée sur une lame, garantit qu'elle ne s'émoussera pas. Les Frappes avec l'arme infligent {{2*steps(4, 11)}} dégâts de saignement persistants supplémentaires.\n" +
        "**Invocation** Une explosion d'énergie tranchante est libérée vers l'extérieur de la rune, infligeant {{ceil(level/2)}}d8 dégâts tranchants à une créature adjacente au porteur de la rune, avec un jet de sauvegarde de Réflexes basique.",
};

const thullax: GrantedAction = {
    kind: "action",
    combat: true,
    id: "thullax",
    name: "Thullax, rune de corrosion",
    traits: ["acide", "arcane", "rune", "forgerune"],
    category: "action",
    text:
        "**Utilisation** dessinée sur une créature ou un objet.\n" +
        "Les lignes plongeantes de cette rune semblent se fondre les unes dans les autres comme si leurs bords étaient flous et indistincts, même si la signification est claire pour vous. La résistance du porteur de rune aux dégâts physiques est réduite de {{ceil(level/2)}} (s'il possède de telles résistances).\n" +
        "**Invocation** Le porteur subit {{ceil(level/2)}}d6 dégâts d'acide avec un jet de Vigueur de base ; en cas d'échec critique, il subit {{ceil(level/2)}} dégât(s) d'acide persistant(s).",
};

const tilus: GrantedAction = {
    kind: "action",
    id: "tilus",
    name: "Tilus, rune de vocabulaire",
    traits: ["arcane", "forgerune", "mental", "rune"],
    category: "rune" as any,
    text:
        "**Utilisation** dessinée sur une créature.\n" +
        "Après une inspection minutieuse, cette rune comprend des centaines de caractères plus petits de diverses langues runiques. Lorsque vous gravez ou tracez cette rune, choisissez une langue que vous connaissez. Le porteur de la rune peut parler et comprendre la langue choisie et gagne un bonus de statut de +1 aux tests de Société et aux tests de connaissances liés à l'écriture.\n" +
        "**Invocation** La voix du porteur de la rune sonne clairement et juste, lui permettant de réussir automatiquement tout test nu qui pourrait perturber une action auditive (telle que celle imposée par [l'assourdissement](deafened)) pendant 1 tour. Pendant ce temps, le porteur peut également exprimer son véritable esprit même s'il est actuellement [confus](confused), [contrôlé](controlled) ou incapable de parler.",
};

const zohk: GrantedAction = {
    kind: "action",
    id: "zohk",
    name: "Zohk, rune de retour au foyer",
    traits: ["arcane", "forgerune", "rune"],
    category: "rune" as any,
    text:
        "**Utilisation** dessinée sur une créature.\n" +
        "Cette marque circulaire permet aux voyageurs de toujours retrouver le chemin de leur foyer. Le porteur de la rune bénéficie d'un bonus de statut de +4,5 mètres à ses vitesses de déplacement, mais uniquement si son mouvement le rapproche de vous.\n" +
        "**Invocation** (téléportation) vous appelez le porteur de la rune à vos côtés. Vous téléportez la cible vers une case inoccupée adjacente à la vôtre. Si le porteur ne souhaite pas être déplacé, il doit réussir un jet de Volonté pour annuler l'effet.",
};

export const runesmith: Class = {
    id: "runesmith",
    img: "./classes/runesmith.png",
    name: "Forgerune",
    flags: [Flag.Combat, Flag.Magic, Flag.Support],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=76",
    summary:
        "Au cœur de toute communication se trouve la parole, et au cœur de toute magie se trouve la rune. À la fois érudit et artiste, vous vous consacrez à l'étude de ces symboles mystiques, apprenant à sculpter, graver, marquer et peindre les éléments constitutifs de la magie pour canaliser des pouvoirs plus grands que vous.",
    keyAttributes: [Attribute.Intelligence],
    forbiddenFlaws: [Attribute.Strength, Attribute.Intelligence],
    hp: 8,
    skills: 2,
    grants: [
        trained("perception"),
        expert("fortitude"),
        trained("reflex"),
        expert("will"),
        trained("crafting"),
        trained("arcana"), // This should be a choice
        trained("unarmedAttacks"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmoredDefense"),
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("runesmithClassDC"),

        runes,

        esvadir,
        thullax,
        tilus,
        zohk,

        { kind: "attributeArray", array: [2, 1, 1, 3, 0, 0] },
        { kind: "weapon", ...weapons.warhammer },
        { kind: "weapon", ...weapons.throwingKnife },
    ],
    choices: [],
};
