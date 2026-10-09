import { Attribute } from "../rules/attributes";
import {
    expert,
    trained,
    type ExtraSkill,
    type GrantedAction,
    type GrantedPassive,
} from "../modifiers";
import { courageousAnthem } from "../spells/cantrips";
import { counterPerformance } from "../spells/focus";
import {
    occultBlaster,
    occultIllusionist,
    occultSupport,
    spellKitToClassChoice,
} from "../spells/kits";
import {
    fear,
    phantasmalMinion,
    soothe,
    summonAnimal,
    sureStrike,
} from "../spells/rank1";
import { spellToModifier } from "../spells/types";
import { Flag, type Class } from "./types";

export const bardicLoreRule = {
    kind: "general",
    name: "Connaissance bardique",
    description:
        "Vos recherches vous permettent de rester informé dans pratiquement tous les domaines. Vous êtes qualifié en Connaissance bardique, une compétence de Connaissance spéciale que vous pouvez utiliser pour Vous souvenir à propos de tout sujet. Si vous êtes légendaire en Occultisme, vous devenez expert en Connaissance bardique mais vous ne pouvez améliorer votre degré de maîtrise dans cette compétence par aucun autre moyen.",
} as const;
export const bardicLore = {
    kind: "extraSkill",
    id: "bardicLore",
    name: "Connaissance bardique",
    summary:
        "Vos recherches vous permettent de rester informé dans pratiquement tous les domaines. Vous pouvez utiliser cette compétence pour [Vous souvenir](recallKnowledge) à propos de tout sujet.",
    attribute: Attribute.Intelligence,
} as const satisfies ExtraSkill;
export const lingeringComposition = {
    kind: "action",
    name: "Composition persistante",
    traits: ["concentration", "focalisation", "métamagie"],
    category: "focus",
    actions: "free",
    text:
        "Vous ajoutez une fioriture à votre composition pour étendre ses avantages. Si votre prochaine action consiste à lancer un tour de magie de composition avec une durée de 1 round, effectuez un test de Représentation. Le DD est généralement un DD standard d'un niveau égal à celui de la cible de votre composition ayant le niveau le plus élevé, mais le MJ peut assigner un DD différent en fonction des circonstances. L'effet dépend du résultat de votre test.\n" +
        "**Réussite critique** La composition dure 4 rounds.\n" +
        "**Réussite** La composition dure 3 rounds.\n" +
        "**Échec** La composition dure 1 round mais vous ne dépensez pas le point de focalisation pour lancer ce sort.\n",
} as const satisfies GrantedAction;
export const martialPerformance = {
    kind: "passive",
    name: "Représentation martiale",
    text:
        "Votre muse vous a appris à manier une plus grande variété d'armes que la plupart des bardes, ce qui vous permet d'intégrer sans effort vos représentations aux outils de combat.\n" +
        "Lorsque [Hymne de courage](courageousAnthem) est actif et que vous blessez un ennemi avec une Frappe, la durée du sort est augmentée de 1 round. Vous pouvez étendre une incantation particulière qu'une seule fois de la sorte.\n" +
        "Si vous obtenez les tours de magie de composition Hymne de ralliement ou Chanson de force , vous pouvez appliquer cet avantage à ces tours de magie également.",
} as const satisfies GrantedPassive;
export const versatilePerformance = {
    kind: "passive",
    name: "Polyvalence artistique",
    text: "Vous vous fiez à la grandeur de vos représentations au lieu des compétences sociales ordinaires. Vous pouvez utiliser Représentation au lieu de Diplomatie pour [Faire bonne impression](makeAnImpression) et au lieu d'Intimidation pour [Démoraliser](demoralize). Vous pouvez également utiliser une Représentation d'interprétation théâtrale au lieu de Duperie pour [Vous faire passer pour](impersonate) quelqu'un d'autre. Vous pouvez utiliser votre degré de maîtrise en Représentation pour remplir les conditions des dons de compétence nécessitant un degré de qualification particulier en Duperie, Diplomatie ou Intimidation.",
} as const satisfies GrantedPassive;
export const zoophonicCommunication = {
    kind: "passive",
    name: "Communication zoophonique",
    text: "Vos études ont étendu votre capacité à parlementer et à négocier au sein du royaume animal. Vous pouvez [Solliciter](request) les animaux en utilisant Représentation à la place de Diplomatie comme si vous partagiez une langue, bien que cela ne vous donne aucune capacité de comprendre leurs réponses. Vous pouvez aussi utiliser Représentation au lieu de Nature pour [Diriger un animal](commandAnAnimal).",
} as const satisfies GrantedPassive;

export const bard: Class = {
    id: "bard",
    img: "./classes/bard.png",
    name: "Barde",
    flags: [Flag.Magic, Flag.Questing, Flag.Support],
    ref: "https://pf2e.pathfinder-fr.org/classes?name=Barde",
    summary:
        "Vous êtes un maître des arts, un érudit des secrets cachés et un persuadeur envoûtant. Grâce à de puissantes représentations, vous influencez les esprits et élevez les âmes à de nouveaux niveaux d'héroïsme. Vous pouvez utiliser vos pouvoirs pour devenir un leader charismatique, mais vous pouvez aussi être un conseiller, un manipulateur, un érudit, un scélérat ou un virtuose. Si votre polyvalence conduit certains à vous considérer comme un séduisant bonimenteur et un touche-à-tout, il est dangereux de ne pas vous considérer comme un maître en la matière.",
    keyAttributes: [Attribute.Charisma],
    forbiddenFlaws: [Attribute.Charisma],
    hp: 8,
    skills: 4,
    grants: [
        expert("perception"),
        trained("fortitude"),
        trained("reflexes"),
        expert("will"),
        trained("occultism"),
        // TODO: replace with performanceAce
        trained("performance"),
        trained("unarmedAttacks"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmoredDefense"),
        trained("lightArmor"),
        trained("bardClassDC"),
        trained("spellAttackModifier"),
        trained("spellDC"),
        { kind: "slots", forCategory: "spell1", quantity: 2 },
        { kind: "knownItems", forCategory: "spell1", count: 3 },
        { kind: "action", ...counterPerformance },
        // TODO: counter performance
        { ...courageousAnthem, kind: "action" },
        { kind: "attributeArray", array: [0, 1, 2, 1, 0, 3] },
    ],
    choices: [
        {
            title: "Muse",
            description:
                "Choisissez une muse. Cette muse vous conduit à faire de grandes choses et pourrait être quelqu'un que vous connaissez, une créature surnaturelle, un lieu, une divinité, une philosophie ou un mystère fascinant. En fonction du type d'inspiration que vous recevez, votre muse vous accorde un don de barde et ajoute un sort à votre répertoire.",
            options: [
                {
                    name: "Combattant",
                    description:
                        "Le champ de bataille est votre scène, le fracas de l'acier, votre musique. Votre muse a vu d'innombrables combats, qu'elle se révèle dans le combat ou qu'elle se résigne à sa nécessité. Un soldat ou un général peut vous inspirer, tout comme un champ de bataille ou une arme dont l'histoire est particulièrement riche. Si votre muse est une créature, il peut s'agir d'un soldat d'un autre monde. L'art inspiré par une muse combattante est triomphant et strident, décrivant souvent des batailles épiques.\n" +
                        "En tant que barde avec une muse combattante, vous vous entraînez pour la bataille en plus de la représentation et vous préparez vos alliés aux dangers du combat. Vous pourriez même entrer dans le vif du sujet avec eux.\n" +
                        "**Don de muse** [Représentation martiale](martialPerformance)\n" +
                        "**Sort de muse** [Effroi](fear)",
                    grants: [martialPerformance, spellToModifier(fear)],
                },
                {
                    name: "Énigmatique",
                    description:
                        "Votre muse est un mystère qui vous pousse à percer les secrets bien cachés de la vie et du multivers. Ces muses peuvent être des personnes que vous n'arrivez pas à cerner, des textes profondément chargés de symbolisme ou des paradoxes émotionnels qui soulignent le travail de toute une vie. L'art inspiré par une muse énigmatique peut être cryptique, inquiétant ou chargé de spéculations et de conspirations. En tant que barde ayant la muse énigmatique, vous soutenez vos alliés en leur apportant des connaissances, de l'inspiration et un soutien occulte.\n" +
                        "**Don de muse** [Connaissance bardique](bardicLore)\n" +
                        "**Sort de muse** [Coup assuré](sureStrike)",
                    grants: [bardicLore, spellToModifier(sureStrike)],
                },
                {
                    name: "Virtuose",
                    description:
                        "Votre muse vous inspire constamment à atteindre des hauteurs supérieures de prouesse artistique. Pour de nombreux bardes, un enseignant ou un rival remplit ce rôle, bien que certains voient plus loin et tentent de surpasser les plus grands compositeurs du passé ou à tracer un chemin entièrement nouveau. L'art d'un barde inspiré par une muse virtuose est précis et inventif, une réussite en terme de formalisme.\n" +
                        "En tant que barde avec une muse virtuose, vous êtes une source d'inspiration pour vos alliés et vous êtes confiant dans vos capacités musicales comme oratoires.\n" +
                        "**Don de muse** [Composition persistante](lingeringComposition)\n" +
                        "**Sort de muse** [Apaisement](soothe)",
                    grants: [lingeringComposition, spellToModifier(soothe)],
                },
                {
                    name: "Touche-à-tout",
                    description:
                        "Votre muse est un touche-à-tout aussi actif que talentueux, qui passe d'une compétence à une autre et d'un but à un autre. Certains bardes sont constamment attirés par de nouvelles muses ou tirent leur inspiration d'un être idéalisé, qu'il s'agisse d'une personne réelle ou d'un être purement philosophique. Si votre muse est une unique créature, il peut s'agir d'une créature éclectique comme une fée ou une personne qui a beaucoup appris au cours de sa longue vie. L'art inspiré par une muse touche-à-tout est agité, chaque composition présentant de nouvelles techniques et un style en perpétuelle évolution.\n" +
                        "En tant que barde dont la muse est touche-à-tout, vous vous intéressez à un large éventail de sujets, mais vous ne vous êtes que rarement dédié à l'un d'entre eux et vous ne vous décidez que rarement : vous voulez tout essayer.\n" +
                        "**Don de muse** [Polyvalence artistique](versatilePerformance)\n" +
                        "**Sort de muse** [Sbire fantasmagorique](phantasmalMinion)",
                    grants: [
                        versatilePerformance,
                        spellToModifier(phantasmalMinion),
                    ],
                },
                {
                    name: "Zoophonie",
                    description:
                        "Votre muse est un maître du chant d'oiseau, des hurlements du loup, du barrissement des éléphants et des autre communications animales, vous poussant vers de nouveaux sommets et vous encourageant à vous lier avec la nature. Si votre muse est tune créature, il pourrait s'agir d'un animal éclairé ou d'un guide spirituel.\n" +
                        "**Don de muse** [Communication zoophonique](zoophonicCommunication)\n" +
                        "**Sort de muse** [Convocation d'animal](summonAnimal)",
                    grants: [
                        zoophonicCommunication,
                        spellToModifier(summonAnimal),
                    ],
                },
            ],
        },
        {
            title: "Kit de sorts",
            description:
                "Choisissez un kit thématique qui reflète votre façon d'aborder la magie. Il remplit d'avance vos tours de magie et vos sorts de rang 1, dans la limite de ce que votre classe vous permet de connaître. Vous pourrez modifier cette sélection par la suite, selon les règles de votre classe.",
            options: [
                spellKitToClassChoice(occultBlaster, "bard"),
                spellKitToClassChoice(occultIllusionist, "bard"),
                spellKitToClassChoice(occultSupport, "bard"),
            ],
        },
    ],
};
