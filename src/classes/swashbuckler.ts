import { Attribute } from "../attributes";
import { bonMot, dirtyTrick, fascinatingPerformance } from "../feats/skill";
import { featToPassive } from "../feats/types";
import {
    expert,
    trained,
    type ActionModifier,
    type GrantedAction,
    type GrantedPassive,
} from "../modifiers";
import { Flag, type Class } from "./types";

const confidentFinisher: GrantedAction = {
    kind: "action",
    name: "Aboutissement assuré",
    category: "action",
    actions: "one",
    traits: ["aboutissement"],
    text:
        "Vous portez une attaque incroyablement élégante qui transperce les défenses de votre ennemi. Faites une Frappe avec l'effet suivant en cas d'échec :\n" +
        "**Échec** Vous infligez la moitié de vos dégâts de votre Frappe précise à la cible. Le type de ces dégâts est le même que celui de l'arme utilisée pour la Frappe.",
};
const flyingBlade: GrantedPassive = {
    kind: "passive",
    name: "Lame volante",
    text: "Vous appliquez vos techniques démonstratives aux armes de jet aussi facilement qu'avec vos attaques au corps-à-corps. Vous appliquez vos dégâts de Frappe précise sur les Frappes à distance que vous réalisez avec une arme de jet dans leur premier facteur de portée. L'arme de jet doit posséder les traits agile ou finesse. Cela vous permet aussi de faire une Frappe de jet à distance pour Aboutissement assuré et tout autre aboutissement qui inclut une Frappe qui peut bénéficier de votre Frappe précise.",
};
const focusedFascination: GrantedPassive = {
    kind: "passive",
    name: "Fascination focalisée",
    text: "Lorsque vous utilisez [Représentation fascinante](fascinatingPerformance) lors d'une rencontre de combat, vous n'avez besoin que d'un succès à la place d'un succès critique pour [Fasciner](fascinated) votre cible. Cela ne fonctionne que si vous tentez de fasciner une seule cible.",
};
const goadingFeint: GrantedPassive = {
    kind: "passive",
    name: "Feinte provocante",
    text:
        "Vos ruse poussent vos adversaires à porter trop loin leurs attaques. Sur une [Feinte](feint), vous pouvez choisir d'utiliser les effets ci-dessous au lieu de tout autre effet que vous pourriez obtenir lorsque vous Feintez.\n" +
        "**Réussite critique** La cible subit un malus de circonstances de -2 à tous les jets d'attaque contre vous jusqu'à la fin de son prochain tour.\n" +
        "**Réussite** La cible subit un malus de circonstances de -2 à son prochain jet d'attaque contre vous avant la fin de son prochain tour.",
};
const oneForAll: GrantedAction = {
    kind: "action",
    name: "Un pour tous",
    category: "action",
    actions: "one",
    traits: ["audible", "émotion", "linguistique"],
    text: "Avec précisément les bons mots d'encouragement, vous soutenez les efforts d'un allié. Désignez un allié dans les 9 mètres. Cette action compte comme une préparation suffisante pour [Aider](aid) cet allié. Lorsque vous utilisez la réaction Aider pour aider cet allié, vous pouvez lancer un test de Diplomatie au lieu du test habituel et l'action acquiert le trait bravade.",
};
const panache: GrantedPassive = {
    kind: "passive",
    name: "Panache",
    text:
        "Vous vous souciez autant de la manière d'accomplir quelque chose que du fait de l'accomplir. Quand vous réalisez une action avec une élégance particulière, vous pouvez tirer parti de ce moment de grâce pour réaliser des manœuvres spectaculaires et mortelles. Cet état de grâce s'appelle le panache.\n" +
        "Vous obtenez du panache en accomplissant des actions qui possèdent le trait bravade. [Déplacement acrobatique](tumbleThrough) et des actions supplémentaires déterminées par votre style de bretteur obtiennent le trait bravade. Normalement, vous obtenez et utilisez votre panache uniquement lors des rencontres de combat.\n" +
        "De puissantes actions d'[aboutissement](finisher) ne peuvent être utilisées que si vous disposez de panache, et elles vous font perdre ce panache.",
};
const preciseStrike: GrantedPassive = {
    kind: "passive",
    name: "Frappe précise",
    text: "Lorsque vous portez une Frappe au corps-à-corps, vous infligez {{1 + ceil(level/4)}} dégâts de précision supplémentaires. Si la Frappe fait partie d'un aboutissement, les dégâts supplémentaires passent à {{1 + ceil(level/4)}}d6 dégâts de précision à la place.",
};
const stylishCombatant: GrantedPassive = {
    kind: "passive",
    name: "Combattant gracieux",
    text: "Vous obtenez un bonus de circonstances de +1 aux tests de compétences ayant le trait bravade au cours d'un combat. Tant que vous avez du panache, vous bénéficiez d'un bonus de statut de +1,50 mètre à vos Vitesses.",
};
const youreNext: GrantedAction = {
    kind: "action",
    name: "T'es le suivant",
    category: "reaction",
    actions: "reaction",
    traits: ["peur"],
    text:
        "**Déclencheur** Vous réduisez un ennemi à 0 Point de vie.\n" +
        "Après avoir abattu un adversaire, vous promettez à un autre de venir le chercher ensuite. Faites un test d'Intimidation avec un bonus de circonstances de +2 pour [Démoraliser](demoralize) une unique créature que vous pouvez voir et qui peut vous voir. Si vous êtes légendaire en Intimidation, vous pouvez utiliser ce pouvoir par une action gratuite ayant le même déclencheur.",
};

export const swashbuckler: Class = {
    id: "swashbuckler",
    img: "./classes/swashbuckler.png",
    name: "Bretteur",
    flags: [Flag.Combat, Flag.Questing],
    ref: "https://pf2e.pathfinder-fr.org/classes?name=Bretteur",
    summary:
        "De nombreux combattants se reposent principalement sur la force brute, les armures lourdes ou les armes encombrantes. Pour vous, le combat est une danse au cours de laquelle vous vous déplacez parmi vos adversaires avec style et grâce. Vous glissez entre les combattants avec élégance et portez de puissantes bottes précises d'un geste du poignet et d'un bref éclair de votre lame, tout en parant les attaques avec des ripostes élégantes qui déstabilisent vos ennemis. Harceler et déjouer vos ennemis vous permet de charmer le destin et de tromper la mort à maintes reprises, avec brio et une touche de flamboyance.",
    keyAttributes: [Attribute.Dexterity],
    forbiddenFlaws: [Attribute.Dexterity, Attribute.Constitution],
    hp: 10,
    skills: 4,
    grants: [
        { kind: "keyAttribute", value: Attribute.Dexterity },
        expert("perception"),
        trained("fortitude"),
        expert("reflexes"),
        expert("will"),
        trained("acrobatics"),
        trained("unarmedAttacks"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmoredDefense"),
        trained("lightArmor"),
        trained("swashbucklerClassDC"),
        preciseStrike,
        confidentFinisher,
        panache,
        stylishCombatant,
    ],
    firstChoice: {
        title: "Style de bretteur",
        description:
            "Votre propre style distinctif vous permet de gérer avec élégance chaque situation. Choisissez un style de bretteur. Ce style détermine les actions supplémentaires que vous pouvez utiliser pour gagner du panache et vous rend qualifié dans la compétence liée à cette action.",
        options: [
            {
                name: "Danseur de combat",
                description:
                    "Pour vous, un combat est une sorte de représentation artistique et vous captez l'attention de vos ennemis par des mouvements hypnotisants. Vous êtes qualifié en Représentation et obtenez le don de compétence Représentation fascinante. Quand vous Vous produisez, l'action obtient le trait bravade.",
                requirement: [
                    { kind: "ancestryFlaw", isNot: Attribute.Charisma },
                ],
                grants: [
                    { kind: "secondaryAttribute", value: Attribute.Charisma },
                    trained("performance"),
                    addBravado("perform"),
                    {
                        kind: "passive",
                        ...featToPassive(fascinatingPerformance),
                    },
                    focusedFascination,
                ],
            },
            {
                name: "Escrimeur",
                description:
                    "Vous vous déplacez précautionneusement, en feintant et en créant de fausses ouvertures pour conduire vos adversaires à faire des attaques inopportunes. Vous êtes qualifié en Duperie. Lorsque vous Feintez ou Créez une diversion, l'action obtient le trait bravade.",
                requirement: [
                    { kind: "ancestryFlaw", isNot: Attribute.Charisma },
                ],
                grants: [
                    { kind: "secondaryAttribute", value: Attribute.Charisma },
                    trained("deception"),
                    addBravado("feint"),
                    addBravado("createADiversion"),
                    goadingFeint,
                ],
            },
            {
                name: "Esprit",
                description:
                    "Vous êtes amical, intelligent et plein d'humour et vous savez toujours quoi dire. Vos traits d'esprit laissent vos ennemis à la merci du talent et de la rapidité de vos attaques. Vous êtes qualifié en Diplomatie et obtenez le don de compétence [Bon Mot](bonMot). Lorsque vous utilisez Bon mot, l'action obtient le trait bravade.",
                requirement: [
                    { kind: "ancestryFlaw", isNot: Attribute.Charisma },
                ],
                grants: [
                    { kind: "secondaryAttribute", value: Attribute.Charisma },
                    trained("diplomacy"),
                    { ...bonMot, kind: "action" },
                    addBravado("bonMot"),
                    oneForAll,
                ],
            },
            {
                name: "Fanfaron",
                description:
                    "Vous vous vantez, vous moquez et aiguillonnez psychologiquement vos ennemis. Vous êtes qualifié en Intimidation. Lorsque vous Démoralisez, l'action obtient le trait bravade.",
                requirement: [
                    { kind: "ancestryFlaw", isNot: Attribute.Charisma },
                ],
                grants: [
                    { kind: "secondaryAttribute", value: Attribute.Charisma },
                    trained("intimidation"),
                    addBravado("demoralize"),
                    youreNext,
                ],
            },
            {
                name: "Fripouille",
                description:
                    "Vous n'avez pas peur d'utiliser des tactiques fourbes pour prendre l'avantage sur vos adversaires. Vous êtes qualifié en Larcin et obtenez le don général Sale coup. Lorsque vous utilisez Sale coup, l'action obtient le trait bravade.",
                grants: [
                    trained("thievery"),
                    { kind: "action", ...dirtyTrick },
                    addBravado("dirtyTrick"),
                    flyingBlade,
                ],
            },
            {
                name: "Gymnaste",
                description:
                    "Vous vous repositionnez, manœuvrez et déroutez vos ennemis par des prouesses physiques audacieuses. Vous êtes qualifié en Athlétisme. Lorsque vous Saisissez, Poussez, Repositionnez ou faites un Croc-en-jambe à un adversaire, l'action obtient le trait bravade.",
                requirement: [
                    { kind: "ancestryFlaw", isNot: Attribute.Strength },
                ],
                grants: [
                    { kind: "secondaryAttribute", value: Attribute.Strength },
                    trained("athletics"),
                    addBravado("grab"),
                    addBravado("shove"),
                    addBravado("reposition"),
                    addBravado("trip"),
                    addBravado("disarm"),
                ],
            },
        ],
    },
};

function addBravado(to: string): ActionModifier {
    return {
        kind: "actionModifier",
        actionId: to,
        modification: "push",
        onField: "traits",
        value: "bravade",
    };
}
