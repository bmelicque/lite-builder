import { forensicAcumen, quickIdentification } from "../feats/skill";
import {
    cognitiveMutagen,
    elixirOfLife,
    forensicDye,
    glowRod,
    sereneMutagen,
    silvertongueMutagen,
} from "../items/alchemical";
import { weapons } from "../items/weapons";
import { expert, trained, type GrantedAction } from "../modifiers";
import { Attribute } from "../rules/attributes";
import { guidance, telekineticHand } from "../spells/cantrips";
import { spellToModifier } from "../spells/types";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const pursueALead: GrantedAction = {
    kind: "action",
    name: "Suivre une piste",
    category: "action",
    text:
        "Vous désignez un détail que vous avez remarqué et qui, selon vous, s'inscrit dans un mystère plus vaste, puis vous consacrez une minute à l'examiner. Ce détail est généralement soit évident, soit quelque chose que vous avez déjà découvert grâce à une action telle que [Se remémorer des connaissances](recallKnowledge), [Percevoir une intention](senseMotive) ou une action similaire. Une fois la minute écoulée, le MJ confirme soit l'existence d'un mystère plus vaste, soit qu'il n'y a rien de plus à apprendre. S'il existe effectivement un mystère plus vaste, vous ne pouvez Poursuivre de piste à nouveau avant 10 minutes, mais vous pouvez choisir d'ouvrir une enquête. Pour ce faire, définissez la question au cœur du mystère, par exemple : « Où a été emportée l'œuvre d'art inestimable qui devait se trouver ici ? » ou « Qui ou quoi a tué ce prêtre ? ». Travaillez avec votre MJ pour affiner la question si nécessaire.\n" +
        "**Bonus d'enquête** : Lorsque vous effectuez un test visant à vous rapprocher de la réponse à la question au cœur d'une enquête en cours, vous bénéficiez d'un bonus de circonstance de +1 à ce test.\n" +
        "**Enquêtes en cours** Vous pouvez mener deux enquêtes simultanément. Si vous décidez de « Poursuivre une piste » supplémentaire, celle-ci doit porter sur une affaire différente de celles que vous menez déjà (pour autant que vous le sachiez), et vous devez abandonner l'une de vos enquêtes en cours, au choix. Une fois qu'une enquête a été abandonnée, vous ne pouvez plus « Poursuivre une piste » à son sujet avant d'avoir effectué vos prochaines préparations quotidiennes.\n" +
        "**Résolution d'une enquête** Si vous parvenez à répondre à la question au cœur de votre enquête, le MJ vous confirme que vous avez réussi. Vous ne perdez ni le bonus ni les autres avantages tant que vous ne choisissez pas de clore l'enquête. Si vos découvertes révèlent un mystère d'une ampleur plus vaste, vous pouvez collaborer avec le MJ pour adapter l'intitulé de l'enquête.\n" +
        "@textArea",
};

const clueIn: GrantedAction = {
    kind: "action",
    name: "Mise au courant",
    category: "reaction",
    actions: "reaction",
    text:
        "**Fréquence** une fois toutes les 10 minutes.\n" +
        "**Déclenchement** une autre créature tente un test qui pourrait contribuer à vous rapprocher de la réponse à la question au cœur de l'une de vos enquêtes en cours.\n" +
        "Vous partagez des informations avec la créature à l'origine du déclenchement. Celle-ci obtient un bonus de circonstance à son test, égal à votre bonus d'enquête issu de l'action [Suivre une piste](pursueALead).",
};

const deviseAStratagem: GrantedAction = {
    kind: "action",
    combat: true,
    name: "Élaborer un stratagème",
    category: "action",
    actions: "free-one",
    text:
        "**Fréquence** une fois par tour.\n" +
        "Vous évaluez les faiblesses d'un adversaire au combat et les utilisez pour élaborer un plan d'attaque. Choisissez une créature que vous pouvez voir. Vous pouvez Élaborer un stratagème en tant qu'action gratuite si vous savez que cette créature pourrait contribuer à répondre à la question au cœur de l'une de vos enquêtes en cours. Lancez un d20, puis déterminez s'il s'agit d'un stratagème d'attaque ou d'un stratagème de compétence.\n" +
        "**Stratagème d'attaque** Lors de la première Frappe que vous portez contre la créature choisie avant le début de votre prochain tour, vous devez utiliser le résultat du d20 pour le jet d'attaque, au lieu d'effectuer un nouveau lancer. Vous obtenez alors un bonus de +{{int-dex}} à ce jet d'attaque, et la Frappe inflige {{ceil(level/4)}}d6 dégâts de précision supplémentaires.\n" +
        "**Stratagème de compétence** Vous ne pouvez pas tenter de Frapper la cible avant le début de votre prochain tour. Vous bénéficiez d'un bonus de circonstance de +1 à votre prochain test basé sur l'Intelligence, la Sagesse ou le Charisme impliquant la cible, avant le début de votre prochain tour. Si vous deviez bénéficier du bonus d'enquête issu de votre aptitude [Suivre une piste](pursueALead) pour un tel test, ces deux bonus se cumulent.",
};

const alchemicalSciences: ClassChoiceOption = {
    name: "Sciences alchimiques",
    description:
        "Votre méthodologie privilégie l'analyse chimique et alchimique, consistant à recueillir des informations à partir de particules et de fluides insolites découverts sur les lieux. Vous possédez des connaissances alchimiques suffisantes pour concocter quelques teintures susceptibles de vous aider dans vos enquêtes.",
    grants: [
        trained("crafting"),
        trained("society"),
        { kind: "action", ...elixirOfLife },
        { kind: "action", ...cognitiveMutagen },
        { kind: "action", ...sereneMutagen },
        { kind: "action", ...silvertongueMutagen },
        { kind: "action", ...forensicDye },
        { kind: "action", ...glowRod },
        { kind: "slots", forCategory: "alchemy", quantity: 4 },
    ],
};

const esoterica: ClassChoiceOption = {
    name: "Ésotérisme",
    description:
        "Vous vous êtes plongé dans l'étude de l'occulte et du divin, acquérant une compétence exceptionnelle pour déceler quand de telles forces sont à l'œuvre. Vous faites appel à votre esprit, à votre perspicacité et à vos capacités de déduction pour affronter les divers mystères de l'existence que vous rencontrez, ainsi que les adversaires surnaturels qui se dressent sur votre chemin.",
    grants: [
        trained("occultism"),
        trained("religion"),
        spellToModifier(guidance),
        spellToModifier(telekineticHand),
        quickIdentification,
    ],
};

const battleMedicine: GrantedAction = {
    kind: "action",
    id: "battleMedicine",
    combat: true,
    name: "Médecine de combat",
    traits: ["enquêteur", "gestuel", "guérison"],
    category: "action",
    actions: "one",
    proficiency: "medicine",
    text: "Vous pouvez panser des blessures, même en plein combat. Effectuez un test de Médecine avec un DD de 15. En cas de réussite, la cible récupère 2d8+{{level}} points de vie, doublés en cas de réussite critique. La cible devient alors immunisée contre votre Médecine de combat pendant 1 heure.",
};
const forensicMedicine: ClassChoiceOption = {
    name: "Médecine légale",
    description:
        "Vous avez appris que, dans la plupart des cas — et tout particulièrement lors de meurtres —, les criminels ont tendance à laisser sur le corps davantage de preuves du crime qu'ils ne voudraient le croire. Les informations tirées des ecchymoses, des fractures osseuses, des projections de sang, voire du cycle de vie des insectes nécrophages, peuvent fournir des indices précieux pour reconstituer la scène.",
    grants: [
        trained("medicine"),
        trained("society"),
        forensicAcumen,
        battleMedicine,
    ],
};

export const investigator: Class = {
    id: "investigator",
    img: "./classes/investigator.png",
    name: "Enquêteur",
    flags: [Flag.Support, Flag.Questing],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=59",
    summary:
        "Vous cherchez à faire éclater la vérité, en suivant avec ténacité des pistes pour dévoiler les machinations de vils scélérats, mettre au jour des secrets ancestraux ou élucider d'autres mystères. Votre esprit analytique formule rapidement des solutions à des problèmes complexes, et vos sens aiguisés vous permettent de déceler les indices les plus dissimulés. Faisant du savoir une véritable arme, vous étudiez les créatures et les dangers que vous rencontrez afin d'en exploiter les faiblesses.",
    keyAttributes: [Attribute.Intelligence],
    forbiddenFlaws: [Attribute.Intelligence],
    hp: 8,
    skills: 3, // + duplicate society in some methodologies
    grants: [
        expert("perception"),
        trained("fortitude"),
        expert("reflex"),
        expert("will"),
        trained("society"),
        trained("simpleWeapons"),
        trained("martialWeapons"),
        trained("unarmedAttacks"),
        trained("lightArmor"),
        trained("unarmoredDefense"),
        trained("investigatorClassDC"),

        pursueALead,
        clueIn,
        deviseAStratagem,

        { kind: "weapon", ...weapons.rapier },
        { kind: "weapon", ...weapons.flintlockPistol },
        { kind: "attributeArray", array: [0, 2, 1, 3, 1, 0] },
    ],
    choices: [
        {
            title: "Méthodologie",
            description:
                "Vos études vous ont permis d'acquérir des compétences dans des domaines très variés, mais un processus d'investigation en particulier a suscité chez vous un intérêt intense, voire obsessionnel. Choisissez une méthodologie.",
            options: [alchemicalSciences, esoterica, forensicMedicine],
        },
    ],
};
