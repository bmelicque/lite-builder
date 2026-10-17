import {
    climb,
    demoralize,
    disarm,
    highJump,
    longJump,
    raiseAShield,
    reposition,
    shove,
    swim,
    trip,
    tumbleThrough,
    type Action,
    type Passive,
} from "./actions";
import { callOnAncientBlood } from "./heritages/dwarf";
import { jinx } from "./heritages/halfling";
import {
    bardicLoreRule,
    lingeringComposition,
    martialPerformance,
    versatilePerformance,
    zoophonicCommunication,
} from "./classes/bard";
import { dieHard } from "./feats/general";
import { bonMot, intimidatingGlare } from "./feats/skill";
import { featToPassive } from "./feats/types";
import { courageousAnthem } from "./spells/cantrips";
import {
    fear,
    phantasmalMinion,
    soothe,
    summonAnimal,
    sureStrike,
} from "./spells/rank1";
import { omit } from "./utils";

type ActionRule = { kind: "action" } & Action;
type GeneralRule = { kind: "general"; name: string; description: string };

export type Rule = ActionRule | GeneralRule;

const finisher: GeneralRule = {
    kind: "general",
    name: "Aboutissement",
    description:
        "Les aboutissements sont des mouvements spectaculaires qui viennent conclure une attaque. Vous ne pouvez utiliser un aboutissement que si vous avez du panache, et vous perdez immédiatement ce panache après avoir accompli un aboutissement. Certains aboutissement incluent un effet en cas d'échec ; vous pouvez également utiliser cet effet en cas de réussite. Une fois que vous avez utilisé un aboutissement, vous ne pouvez plus utiliser d'attaques pendant le reste de votre tour.",
};
const death: GeneralRule = {
    kind: "general",
    name: "Mort",
    description:
        "Un effet doté du trait « mort » vous tue immédiatement s'il réduit vos points de vie à 0. Certains effets de mort peuvent vous rapprocher de la mort ou vous tuer sur-le-champ sans pour autant réduire vos points de vie à 0.",
};
const fleeing: GeneralRule = {
    kind: "general",
    name: "En fuite",
    description:
        "Vous êtes forcé de prendre la fuite à cause de la peur ou d'une autre compulsion. Lors de votre tour, vous devez utiliser chacune de vos actions pour échapper à la source de votre état de fuite aussi rapidement que possible (en utilisant des actions de mouvement pour fuir ou ouvrir des portes qui vous barrent le chemin, par exemple). La source est habituellement l'effet ou l'incantateur qui vous a infligé cet état, bien que certains effets puissent désigner quelque chose d'autre comme en étant la source. Vous ne pouvez pas utiliser les actions [Retarder](dealy) ou [Préparer](ready) lorsque vous êtes en fuite.",
};
const frightened: GeneralRule = {
    kind: "general",
    name: "Effrayé",
    description:
        "Vous êtes paralysé par la peur et vous luttez pour ne pas céder à la panique. L'état Effrayé est toujours accompagné d'une intensité. Vous subissez une pénalité de statut égal à cette valeur pour tous vos tests et DD. Sauf indication contraire, l'intensité de votre état effrayé décroît de 1 à la fin de chacun de vos tours.",
};
const offGuard: GeneralRule = {
    kind: "general",
    name: "Pris au dépourvu",
    description:
        "Vous êtes distrait ou autrement incapable de consacrer votre pleine attention à votre défense. Vous subissez une pénalité de circonstances de -2 à la CA. Certains effets vous donnent l'état Pris au dépourvu seulement à l'encontre de certaines créatures ou contre certaines attaques. D'autres peuvent vous rendre Pris au dépourvu contre tout. Si une règle ne spécifie pas que cet état ne s'applique que dans certaines circonstances, il s'applique à toutes les circonstances.",
};
const prone: GeneralRule = {
    kind: "general",
    name: "À terre",
    description:
        "Vous êtes étendu au sol. Vous êtes [pris au dépourvu](offGuard) et subissez une pénalité de circonstances de -2 à vos jets d'attaque. Les seules actions de mouvement que vous pouvez utiliser lorsque vous êtes à terre sont Ramper et Vous relever. Vous pouvez vous Mettre à l'abri lorsque vous êtes à terre pour bénéficier d'un [abri](cover) contre les attaques à distance, même si vous ne vous abritez pas derrière un objet.\n" +
        "Si vous devriez tomber à terre alors que vous [Escaladez](climb) ou [Volez](fly), vous [chutez](fall). Vous ne pouvez pas être à terre quand vous [Nagez](swim).",
};
const senses: GeneralRule = {
    kind: "general",
    name: "Sens",
    description:
        "La manière dont une créature peut utiliser la Perception dépend des sens dont elle dispose. Un sens peut être précis, imprécis ou vague. La vue, l'ouïe et l'odorat sont trois sens majeurs, mais chacun possède un degré d'acuité différent.\n" +
        "## Sens précis\n" +
        "La vue, dans des conditions normales, est un sens précis — un sens qui permet de percevoir le monde avec une grande finesse de détails. Pour cibler une créature sans subir de pénalités, il est indispensable d'utiliser un sens précis. En règle générale, un sens précis permet de détecter automatiquement une créature, sauf si celle-ci se cache ou est dissimulée par l'environnement ; dans ce cas, vous pouvez [Chercher](seek) pour mieux la localiser.\n" +
        "## Sens imprécis\n" +
        "L'ouïe, dans sa forme courante, est un sens imprécis : elle ne permet pas de percevoir la même finesse de détails qu'un sens précis. Un sens imprécis vous permet généralement de détecter automatiquement une créature, mais celle-ci rest [cachée](hidden) plutôt que [observée](observed). Il est même possible qu'elle demeure [indétectée](undetected) si elle utilise la compétence Discrétion ou si elle se trouve dans un environnement qui perturbe ce sens (par exemple, une pièce bruyante pour ce qui est de l'ouïe). Dans de tels cas, vous devez [Chercher](seek) pour détecter la créature et la faire passer à l'état [caché](hidden).\n" +
        "## Sens vagues\n" +
        "Un personnage dispose également de plusieurs sens vagues : ils vous alertent de la présence de quelque chose, sans pour autant vous permettre de localiser précisément l'objet ou la créature en question, ni d'en déterminer la nature exacte. Pour un personnage type, l'odorat est le plus utile de ces sens vagues. Au mieux, un sens vague permet de déceler la présence d'une créature qui n'avait pas été remarquée, la faisant passer à l'état [indétecté](undetected). Cela reste toutefois insuffisant pour que la créature soit considérée comme [cachée](hidden) ou [observée](observed).",
};
const void_: GeneralRule = {
    kind: "general",
    name: "Vide",
    description:
        "Les effets dotés de ce trait soignent les créatures mortes-vivantes grâce à l'énergie du Vide, infligent des dégâts du Vide aux créatures vivantes ou manipulent l'énergie du Vide.",
};
const weaponActions: GeneralRule = {
    kind: "general",
    name: "Autres actions avec une arme",
    description:
        "Certaines vous permettent d'effectuer d'autres actions en plus de la Frappe habituelle. Dans ce cas, vous pouvez ignorer la condition d'avoir une main libre pour effectuer l'action en question. En cas d'échec critique, vous pouvez choisir de lâcher votre arme plutôt que de subir les effets normaux de l'échec critique.",
};

export const rules: Record<string, Rule> = {
    aboutissement: finisher,
    bardicLore: bardicLoreRule,
    belchSmoke: {
        kind: "action",
        name: "Rejet de fumée",
        category: "action",
        actions: "one",
        text: "Vous expirez ce qui reste de fumée, mettant un terme au sort et créant un nuage de fumée dans une sphère de 1,5 mètres, jusqu'à 6 mètres de distance.",
    },
    bonMot: { ...bonMot, kind: "action" },
    callOnAncientBlood: { ...callOnAncientBlood, kind: "action" },
    courageousAnthem: { ...courageousAnthem, kind: "action" },
    climb: { ...climb, kind: "action" },
    death,
    demoralize: { ...demoralize, kind: "action" },
    dieHard: passiveToGeneral(dieHard),
    disarm: { ...disarm, kind: "action" },
    fear: { ...fear, kind: "action" },
    fleeing,
    frightened,
    highJump: { ...highJump, kind: "action" },
    jinx: { ...jinx, kind: "action" },
    intimidatingGlare: passiveToGeneral(featToPassive(intimidatingGlare)),
    lifeBlock: {
        kind: "action",
        name: "Blocage vital",
        category: "reaction",
        actions: "reaction",
        text:
            "**Déclencheur** La cible du sort devrait subir des dégâts.\n" +
            "Réduisez les dégâts déclencheurs de 10, mais vous perdez 5 Points de vie. Même si cela réduit les dégâts à 0, la cible subit toujours tout effet qui devrait être appliqué avec les dégâts, comme le poison sur la Frappe de crochets d'une vipère.",
    },
    lingeringComposition,
    longJump: { ...longJump, kind: "action" },
    martialPerformance: passiveToGeneral(martialPerformance),
    offGuard,
    phantasmalMinion: { ...phantasmalMinion, kind: "action" },
    prone,
    raiseAShield: { ...raiseAShield, kind: "action" },
    reposition: { ...reposition, kind: "action" },
    senses,
    shove: { ...shove, kind: "action" },
    soothe: { ...soothe, kind: "action" },
    summonAnimal: { ...summonAnimal, kind: "action" },
    sureStrike: { ...sureStrike, kind: "action" },
    swim: { ...swim, kind: "action" },
    trip: { ...trip, kind: "action" },
    tumbleThrough: { ...tumbleThrough, kind: "action" },
    versatilePerformance: passiveToGeneral(versatilePerformance),
    void: void_,
    weaponActions,
    zoophonicCommunication: passiveToGeneral(zoophonicCommunication),
};

function passiveToGeneral(feat: Passive): GeneralRule {
    return {
        ...omit(feat, "text"),
        kind: "general",
        description: feat.text,
    };
}
