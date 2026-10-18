import { dubiousKnowledge } from "../feats/skill";
import { weapons } from "../items/weapons";
import {
    expert,
    trained,
    type GrantedAction,
    type GrantedPassive,
} from "../modifiers";
import { Attribute } from "../rules/attributes";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const esotericLore: GrantedPassive = {
    kind: "passive",
    name: "Connaissances ésotériques",
    text: "Votre expérience de l'inconnu vous a familiarisé avec toutes sortes de phénomènes étranges. Vous pouvez [Vous remémorer des informations](recallKnowledge) à propos de n'importe quel sujet avec un modificateur de +{{cha+2*step(3,7,15)}}.",
};

const exploitVulnerability: GrantedAction = {
    kind: "action",
    name: "Exploiter une vulnérabilité",
    combat: true,
    traits: ["gestuel", "thaumaturge"],
    category: "action",
    actions: "one",
    text:
        "**Fréquence** une fois par tour.\n" +
        "**Prérequis** vous tenez votre instrument ésotérique.\n" +
        "Vous puisez dans vos expériences et vos connaissances pour identifier un élément susceptible de repousser votre adversaire. Choisissez une créature que vous pouvez voir et effectuez un test de Connaissances ésotériques contre le DD standard correspondant à son niveau. Vous bénéficiez des effets suivants jusqu'à ce que vous utilisiez à nouveau Exploiter une vulnérabilité.\n" +
        "**Réussite critique** Vous vous remémorez les faiblesses de la créature. Vous découvrez toutes les résistances, faiblesses et immunités de la créature, y compris les valeurs chiffrées des résistances et faiblesses, ainsi que toute vulnérabilité inhabituelle. Vous pouvez exploiter soit la faiblesse mortelle de la créature, soit son antithèse personnelle (voir ci-dessous). De plus, vos attaques à mains nues ou avec des armes contre cette créature deviennent magiques, si elles ne l'étaient pas déjà.\n" +
        "**Réussite** Vous vous rappelez un détail crucial concernant la créature : vous découvrez sa faiblesse la plus importante (ou l'une des plus importantes, si elle en possède plusieurs de valeur équivalente), mais pas ses autres faiblesses, résistances ou immunités. Vous pouvez exploiter soit la faiblesse mortelle de la créature, soit son antithèse personnelle. De plus, vos attaques à mains nues ou avec des armes contre cette créature deviennent magiques, si elles ne l'étaient pas déjà.\n" +
        "**Échec** Faute de pouvoir identifier une faiblesse majeure, vous tentez d'exploiter une vulnérabilité plus personnelle. Vous ne pouvez exploiter que l'antithèse personnelle de la créature. De plus, vos attaques à mains nues ou avec des armes contre cette créature deviennent magiques, si elles ne l'étaient pas déjà.\n" +
        "**Échec critique** Vous ne parvenez pas à identifier de faiblesse et vous vous laissez distraire. Vous êtes [pris au dépourvu](offGuard) pendant 1 tour.\n" +
        "**Faiblesse mortelle** Après avoir identifié la faiblesse d'une créature, vous adaptez vos attaques à votre découverte. Vos Frappes tirent parti de la faiblesse la plus élevée que vous avez révélée grâce à Exploiter les vulnérabilités, sans pour autant modifier le type de dégâts infligés par votre arme. Ces dégâts affectent la cible visée par votre action, ainsi que toute autre créature du même type.\n" +
        "**Antithèse personnelle** Vous improvisez une faiblesse spécifique pour une créature donnée. Cette action confère à la créature ciblée — et uniquement à elle — une faiblesse face à vos Frappe égale à {{2+floor(level/2)}}.",
};

const amulet: ClassChoiceOption = {
    name: "Amulette",
    description:
        "Les amulettes sont des objets que l'on porte pour s'attirer la chance ou se protéger. Une amulette peut prendre la forme d'un diagramme magique, d'un symbole religieux, d'une partie de corps conservée — comme une patte de lapin — ou encore d'une pièce porte-bonheur.",
    grants: [
        {
            kind: "action",
            name: "Sursis de l'amulette",
            combat: true,
            traits: ["magique", "gestuel", "thaumaturge"],
            category: "reaction",
            actions: "reaction",
            text:
                "**Déclencheur** La cible de [Exploiter une vulnérabilité](exploitVulnerability) s'apprête à infliger des dégâts à vous-même ou à un allié situé à moins de 4,5 mètres de vous.\n" +
                "**Conditions** Vous tenez votre amulette.\n" +
                "Vous présentez votre amulette avec détermination pour détourner le danger. Vous ou un allié ciblé à moins de 4,5 mètres de vous bénéficiez d'une résistance de {{2+level}} à tous les types de dégâts infligés par l'attaque déclencheuse.",
        },
    ],
};

const bell: ClassChoiceOption = {
    name: "Clochette",
    description:
        "Les clochettes symbolisent le pouvoir que les sons et les émotions exercent sur autrui ; elles peuvent apaiser par une certaine tonalité ou, au contraire, surprendre par une autre. Si les clochettes, tambours, cymbalettes et autres instruments à percussion sont les plus courants, ces objets peuvent en réalité prendre la forme de n'importe quel instrument de musique portatif se jouant d'une seule main.",
    grants: [
        {
            kind: "action",
            name: "Son de cloche",
            combat: true,
            traits: ["auditif", "magique", "gestuel", "sonique", "thaumaturge"],
            category: "reaction",
            actions: "reaction",
            text:
                "**Déclencheur** La cible de votre [Exploiter une vulnérabilité](exploitVulnerability) effectue une attaque ou lance un sort qui vous affecterait vous ou l'un de vos alliés.\n" +
                "**Portée** 9 mètres.\n" +
                "Votre instrument émet soudainement une sonorité qui perturbe votre adversaire. L'effet produit dépend de la nature du déclencheur (attaque ou sort) et s'applique à cette action, sauf indication contraire.\n" +
                "**Cacophonie distrayante** Le déclencheur est un sort. Vous générez une décharge sonore brutale qui assaille la cible et brise sa concentration. La cible doit réussir un jet de Vigueur contre votre DD de classe, sous peine d'être [stupéfiée 1](stupefied) jusqu'à la fin de votre prochain tour (stupéfiée 2 en cas d'échec critique). La cible n'a pas besoin d'effectuer de test nu pour éviter de perdre le sort, mais l'état [stupéfié](stupefied) réduit le modificateur d'attaque ou le DD du sort en question.\n" +
                "**Harmonie perturbatrice** Le déclencheur est une attaque. Vous créez une harmonie étrangement discordante qui s'insinue dans le corps de votre adversaire et entrave ses mouvements. La cible doit réussir un jet de Volonté contre votre DD de classe, sous peine de devenir, au choix, [affaiblie 1](enfeebled) ou [maladroite 1](clumsy) jusqu'à la fin de votre prochain tour (affaiblie 2 ou maladroite 2 en cas d'échec critique).",
        },
    ],
};

const chalice: ClassChoiceOption = {
    name: "Calice",
    description:
        "Les calices sont des récipients destinés à contenir un liquide ; ils sont ainsi associés à la guérison, à la nourriture et à la vie. Votre calice peut prendre la forme d'une coupe ou d'un gobelet traditionnel, mais il peut tout aussi bien s'agir d'une petite amphore, d'une calebasse polie, voire d'un crâne évidé.",
    grants: [
        {
            kind: "action",
            name: "Boire au calice",
            traits: ["magique", "gestuel", "thaumaturge"],
            category: "action",
            actions: "one",
            text:
                "**Fréquence** une fois par tour.\n" +
                "Vous buvez le liquide qui s'accumule lentement dans votre calice, ou vous le faites boire à un allié adjacent. La personne qui boit choisit de prendre une petite gorgée ou de vider le contenu du calice.\n" +
                "**Gorgée** une gorgée confère à celui qui boit {{max(3,level)}} points de vie temporaires, qui durent jusqu'à la fin de son prochain tour.\n" +
                "**Vider** (soin, vitalité) en buvant tout le contenu, la personne récupère {{3*level}} points de vie. Une fois le calice vidé, il ne reste plus que des résidus qui s'accumulent lentement ; le calice ne peut plus être vidé, bien qu'il soit toujours possible d'y prendre une gorgée. Si 10 minutes s'écoulent sans que personne ne boive au calice, celui-ci se remplit à nouveau et peut être vidé une fois de plus.",
        },
    ],
};

const lantern: ClassChoiceOption = {
    name: "Lanterne",
    description:
        "Les lanternes projettent la lumière de la révélation, dissipant les ombres pour mettre la vérité au jour. Vous pouvez utiliser une lanterne en verre ordinaire, une torche, une lanterne en papier ou toute autre source lumineuse similaire.",
    grants: [
        {
            kind: "passive",
            name: "Lanterne ésotérique",
            text:
                "Tant que vous tenez votre lanterne, sa lumière ardente ne laisse aucun refuge aux secrets. Vous pouvez allumer ou éteindre votre lanterne par une simple pensée ; il s'agit d'une action gratuite de [concentration](concentrate). Lorsqu'elle est allumée, la lanterne diffuse une aura magique lumineuse s'étendant sur un rayon de 6 mètres. Tout ce qui se trouve dans l'aura est baigné d'une lumière vive, indépendamment de tout abri, tandis qu'une lumière faible s'étend au-delà de l'aura sur une distance équivalente à la taille de celle-ci.\n" +
                "L'aura de la lanterne cherche à révéler ce qui est invisible. Vous et vos alliés situés dans l'aura bénéficiez d'un bonus de statut de +1 aux tests de Perception basés sur la vue pour remarquer tout élément présent dans l'aura, ainsi que d'un bonus de statut de +1 aux tests pour [Vous remémorer des connaissances](recallKnowledge) concernant les créatures s'y trouvant, la lumière mettant en évidence leur véritable nature. En phase d'exploration, même si vous ne [Cherchez](search) pas, le MJ réalise un test secret pour vous permettre de détecter des pièges, des dangers environnementaux, des manifestations surnaturelles ou des éléments cachés (comme des portes secrètes).",
        },
    ],
};

const tome: ClassChoiceOption = {
    name: "Tome",
    description:
        "Les tomes incarnent des connaissances perdues et des révélations venues d'ailleurs. Bien qu'un livre usé en soit la forme la plus courante, ces objets peuvent revêtir autant de formes qu'il existe de manières de conserver le savoir, des tablettes d'argile gravées aux assemblages de cordelettes nouées.",
    grants: [
        {
            kind: "passive",
            name: "Tome ésotérique",
            text:
                "Lorsque vous tenez votre tome, des lignes de texte apparaissent sur les pages ouvertes, révélant des informations utiles. Tant que vous tenez votre tome, vous bénéficiez d'un bonus de circonstance de +1 à tous les tests pour [Vous remémorer des connaissances](recallKnowledge).\n" +
                "Lors de vos préparatifs quotidiens, vous pouvez devenir qualifié dans deux compétences de votre choix, et ce jusqu'à vos prochains préparatifs. Vous conservez cet avantage tant que le tome est en votre possession, même si vous ne le tenez pas en main.\n" +
                "@textArea",
        },
    ],
};

const weapon: ClassChoiceOption = {
    name: "Arme",
    description:
        "Les armes sont les instruments ésotériques les plus directes et les plus axées sur la confrontation ; elles évoquent la bataille, la lutte et, potentiellement, la violence. Vous ne pouvez choisir qu'une arme à une main en guise d'instrument, ce qui vous permet de canaliser des énergies dans cette arme, tout en conservant la possibilité de tenir vos autres instruments une fois que vous les aurez obtenus.",
    grants: [
        {
            kind: "action",
            name: "Interruption de l'instrument",
            combat: true,
            traits: ["magique", "thaumaturge"],
            category: "reaction",
            actions: "reaction",
            text:
                "**Déclenchement** La cible de votre Exploiter une vulnérabilité utilise une action de concentration, gestuelle ou de déplacement, ou quitte une case au cours d'une action de déplacement.\n" +
                "**Conditions** Vous tenez votre arme (qui sert d'instrument). La créature doit se trouver à votre allonge si vous maniez une arme de corps à corps, ou à une distance maximale de 3 mètres si vous maniez une arme à distance.\n" +
                "Votre arme perçoit un instant de faiblesse et guide votre main pour frapper votre adversaire. Effectuez une Frappe contre la créature ayant déclenché cet effet, en utilisant votre arme. Si votre attaque est un coup critique, vous interrompez l'action qui a provoqué ce déclenchement.",
        },
    ],
};

export const thaumaturge: Class = {
    id: "thaumaturge",
    img: "./classes/thaumaturge.png",
    name: "Thaumaturge",
    flags: [Flag.Combat, Flag.Magic, Flag.Questing],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=69",
    summary:
        "Le monde regorge de phénomènes inexplicables : magie ancestrale, divinités disparues et bien d'autres choses encore plus étranges. Pour y faire face, vous avez glané les meilleurs éléments de diverses traditions magiques et constitué une collection d'objets ésotériques — une relique sacrée brisée par-ci, un brin de gui par-là — qui vous permettent de triompher de n'importe quelle créature en exploitant ses faiblesses et ses vulnérabilités. L'instrument mystique que vous portez fait office à la fois d'arme et d'emblème ; son poids symbolique vous aide à négocier avec le surnaturel, voire à le dompter. Chaque voie vers la puissance comporte ses contraintes et ses coûts, mais vous savez les tourner à votre avantage. Vous êtes un thaumaturge, et vous accomplissez des prodiges.",
    keyAttributes: [Attribute.Charisma],
    forbiddenFlaws: [Attribute.Charisma],
    hp: 8,
    skills: 3,
    grants: [
        expert("perception"),
        expert("fortitude"),
        trained("reflex"),
        expert("will"),
        trained("arcana"),
        trained("nature"),
        trained("occultism"),
        trained("religion"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmedAttacks"),
        trained("lightArmor"),
        trained("mediumArmor"),
        trained("unarmoredDefense"),
        trained("thaumaturgeClassDC"),
        esotericLore,
        { kind: "passive", ...dubiousKnowledge },
        exploitVulnerability,
        { kind: "extraStrikeDamage", damage: 2 },
        { kind: "attributeArray", array: [1, 2, 1, 0, 0, 3] },
        { kind: "weapon", ...weapons.shortswort },
        { kind: "weapon", ...weapons.flintlockPistol },
    ],
    choices: [
        {
            title: "Instrument ésotérique",
            description:
                "Votre instrument ésotérique est un objet particulier, doté d'une importance symbolique : il fait office d'emblème lorsque vous traitez avec le surnaturel, et constitue un outil puissant si la situation tourne à la violence.",
            options: [amulet, bell, chalice, lantern, tome, weapon],
        },
    ],
};
