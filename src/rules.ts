import {
    climb,
    disarm,
    highJump,
    longJump,
    raiseAShield,
    reposition,
    shove,
    swim,
    trip,
    type Action,
    type Passive,
} from "./actions";
import { callOnAncientBlood } from "./ancestries/dwarf";
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
    bonMot: { ...bonMot, kind: "action" },
    callOnAncientBlood: { ...callOnAncientBlood, kind: "action" },
    courageousAnthem: { ...courageousAnthem, kind: "action" },
    climb: { ...climb, kind: "action" },
    death,
    dieHard: passiveToGeneral(dieHard),
    disarm: { ...disarm, kind: "action" },
    fear: { ...fear, kind: "action" },
    fleeing,
    frightened,
    highJump: { ...highJump, kind: "action" },
    intimidatingGlare: passiveToGeneral(featToPassive(intimidatingGlare)),
    lingeringComposition,
    longJump: { ...longJump, kind: "action" },
    martialPerformance: passiveToGeneral(martialPerformance),
    offGuard,
    phantasmalMinion: { ...phantasmalMinion, kind: "action" },
    prone,
    raiseAShield: { ...raiseAShield, kind: "action" },
    reposition: { ...reposition, kind: "action" },
    shove: { ...shove, kind: "action" },
    soothe: { ...soothe, kind: "action" },
    summonAnimal: { ...summonAnimal, kind: "action" },
    sureStrike: { ...sureStrike, kind: "action" },
    swim: { ...swim, kind: "action" },
    trip: { ...trip, kind: "action" },
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
