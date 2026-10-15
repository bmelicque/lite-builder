import { DamageType, weapons } from "../items/weapons";
import {
    expert,
    hl1PhysicalRes,
    resistance,
    trained,
    type CustomCategory,
} from "../modifiers";
import { Attribute } from "../rules/attributes";
import {
    detectMagic,
    electricArc,
    forbiddingWard,
    guidance,
    ignition,
    light,
    readAura,
    rousingSplash,
    shield,
    stabilize,
    timeSense,
    vitalityLash,
    voidWarp,
} from "../spells/cantrips";
import {
    ashenWind,
    athleticRush,
    brainDrain,
    callToArms,
    cinderGaze,
    cloakOfShadow,
    deathsCall,
    healersBlessing,
    incendiaryAura1,
    lifeLink,
    pushingGust,
    readFate,
    scholarlyRecollection,
    soulSiphon,
    sprayOfStars,
    tempestTouch,
    temporalDistortion,
} from "../spells/focus";
import {
    airBubble,
    alarm1,
    blessingOfVigor1,
    boneShield1,
    breadcrumbs1,
    breatheFire1,
    cinderScribe1,
    command,
    createWater,
    dejaVu,
    dizzyingColors,
    fear,
    forcedMercy1,
    grimTendrils,
    heal1,
    infuseVitality1,
    mending1,
    mindlink,
    skySight,
    sureStrike,
    thunderstrike1,
} from "../spells/rank1";
import { spellToModifier } from "../spells/types";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const oracularCurse: CustomCategory = {
    kind: "customCategory",
    id: "oracularCurse",
    name: "Sorts de révélation & malédiction oraculaire",
    introText:
        "Les pouvoirs de votre mystère se manifestent sous la forme de sorts de révélation, qui sont un type de sort de focalisation. Lancer un sort de révélation aggrave les effets de votre malédiction oraculaire (voir plus bas). Vous réduisez les effets de votre malédiction en vous [Recentrant](refocus) pour harmoniser la nature contradictoire ou atypique de votre mystère divin. Vous ne pouvez pas lancer de sort de révélation si votre malédiction en est à ses effets les plus graves.",
    actions: { kind: "category", category: "oracle" },
};

const _ashes: ClassChoiceOption = {
    name: "Cendre",
    description:
        "Vous percevez tout ce qui existe en ce monde comme étant essentiellement éphémère et transitoire, attendant d'être purifié pour retrouver son essence fondamentale : la cendre laissée par un brasier. Bien que vous compreniez que le feu est un élément nécessaire de ce processus, vous le voyez avant tout comme un outil pour atteindre la pureté ultime, et non comme une fin en soi. Vous voyez peut-être la cendre comme la seule véritable incarnation de la nature impermanente de la vie et de la vanité de l'existence. À l'inverse, vous pourriez percevoir les bienfaits de la cendre pour les sols et les terres agricoles comme un maillon d'un vaste cycle de mort et de renaissance.",
    grants: [
        ...hl1PhysicalRes(),
        {
            kind: "passive",
            name: "Mystère des cendres",
            text: "Votre chair se déplace autour des menaces physiques tel un nuage de cendres. Vous bénéficiez d'un bonus de circonstances de +2 contre les manœuvres de [Saisie](grab), de [Bousculade](shove) et les déplacements forcés.",
        },
        trained("occultism"),

        spellToModifier(ignition),

        spellToModifier(ashenWind),
        spellToModifier(cinderGaze),

        spellToModifier(breatheFire1),
    ],
};

const battle: ClassChoiceOption = {
    name: "Bataille",
    description:
        "Des forces belliqueuses vous confèrent une puissance physique et un savoir tactique, vous incitant à honorer la gloire du combat, à lutter pour améliorer le monde, à vous préparer à l'éventualité d'un conflit ou à affronter l'inéluctabilité de la guerre.",
    grants: [
        trained("mediumArmor"),
        trained("heavyArmor"),
        trained("martialWeapons"),
        trained("athletics"),

        spellToModifier(shield),
        // TODO: needle darts

        spellToModifier(callToArms),
        spellToModifier(athleticRush),

        spellToModifier(sureStrike),
        spellToModifier(blessingOfVigor1),
        spellToModifier(command),

        { kind: "attributeArray", array: [1, 2, 1, 0, 0, 3] },
        { kind: "weapon", ...weapons.rapier },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction du fardeau héros** _Vous vous épanouissez lorsque l'adrénaline coule à flots et que votre vie ne dépend que de votre propre puissance. Toutefois, le fait de porter en vous la prouesse martiale collective des âges laisse votre corps affaibli après le combat. Vous dégagez une légère odeur d'acier et de sang, impossible à éliminer ou à masquer ; vous paraissez plus musclé que vous ne l'êtes réellement et vous entendez en permanence, au loin, le fracas et le tumulte de la bataille._\n" +
                "@checkbox **Malédiction mineure** Votre corps dépérit lorsque vous ne blessez pas vos ennemis. Vous subissez un malus de statut de –2 à la CA et aux jets de sauvegarde, mais chaque fois que vous portez une Frappe, vous pouvez suspendre ces malus jusqu'au début de votre prochain tour.\n" +
                "@checkbox **Malédiction modérée** La tension du conflit éprouve votre corps, même si vous en tirez de la vitalité. Porter une attaque réduit le malus de votre malédiction mineure à –1 au lieu de le suspendre totalement. Vous bénéficiez d'un bonus de statut de +2 aux jets de dégâts des Frappes. Vous obtenez également [guérison rapide](fastHealing) {{max(1, floor(level/2))}} tant que vous participez à un combat significatif.",
        },
    ],
};

const bones: ClassChoiceOption = {
    name: "Os",
    description:
        "Votre mystère vous confère une compréhension de la mort et de la non-mort dans toute leur complexité macabre. Il se peut que vous ayez frôlé la mort — voire que vous soyez mort avant de revenir à la vie — ou que vous portiez en vous la marque de la non-mort.",
    grants: [
        {
            kind: "passive",
            name: "Mystère des os",
            text: "Vous pouvez tirer habilement parti des subtilités de la vie et de la mort à votre avantage. Chaque jour, lors de vos préparatifs, vous pouvez choisir de vous placer au confluent du vide et de la vitalité afin de bénéficier d'une [guérison du vide](voidHealing) : vous subissez alors des dégâts face aux effets de vitalité et êtes soigné par les effets de vide, tout comme le serait une créature morte-vivante.",
        },
        trained("medicine"),

        spellToModifier(vitalityLash),

        spellToModifier(soulSiphon),
        spellToModifier(deathsCall),

        spellToModifier(grimTendrils),
        spellToModifier(boneShield1),
        spellToModifier(heal1),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction de mort-vivance** _Votre corps se décompose lentement alors même que vous êtes en vie, et l'utilisation de vos pouvoirs aggrave cette mort-vivance contre-nature. Vous portez en vous une empreinte de la tombe, qui se manifeste par une pâleur livide, une légère odeur de terre ou une peau glacée._\n" +
                "@checkbox **Malédiction mineure** Vos os percent votre peau et votre chair pourrit, s'accompagnant d'une odeur de putréfaction et d'un froid surnaturel. Les effets non magiques censés restaurer vos Points de vie ne vous en rendent que la moitié de la quantité habituelle.\n" +
                "@checkbox **Malédiction modérée** Votre chair morte continue de pourrir, affectant votre santé. Vous subissez l'état [affaibli 1](enfeebled), et cet état se cumule avec tout autre état affaibli que vous pourriez subir. Cet état ne disparaît que lorsque vous vous [Recentrez](refocus), et les effets qui suppriment normalement l'état affaibli le réduisent simplement au niveau affaibli 1. De plus, vous gagnez une résistance au poison égale à {{max(1, floor(level/2))}}. Vous bénéficiez d'un bonus de statut de +4 aux jets de sauvegarde contre les maladies, les poisons et les effets de mort ; si vous obtenez un succès à un tel jet, vous obtenez un succès critique à la place.",
        },
    ],
};

const cosmos: ClassChoiceOption = {
    name: "Cosmos",
    description:
        "Les corps célestes, grands et petits, exercent une influence sur vous et vous confèrent un pouvoir cosmique sublime. Peut-être voyez-vous dans les étoiles scintillantes une bénédiction divine, ou peut-être vous sentez-vous attiré par les espaces d'une noirceur infinie qui s'étendent entre elles.",
    grants: [
        resistance(DamageType.Bludgeoning, "hlPlus2"),
        resistance(DamageType.Piercing, "hlPlus2"),
        resistance(DamageType.Slashing, "hlPlus2"),
        trained("nature"),

        spellToModifier(light),

        spellToModifier(sprayOfStars),
        spellToModifier(cloakOfShadow),

        spellToModifier(dizzyingColors),
        spellToModifier(fear),
        spellToModifier(skySight),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction de l'Appel du Ciel** _Vous avez la tête dans les nuages, et pas seulement au sens figuré. Votre corps est attiré vers les cieux, ce qui vous rend plus léger et moins matériel que vous ne devriez l'être. Vos yeux brillent d'une lueur étoilée, tandis que vos cheveux et vos vêtements flottent et dérivent autour de vous._\n" +
                "@checkbox **Malédiction mineure** Votre légèreté surnaturelle rend difficile le fait de garder pied et d'interagir avec des objets physiques. Vous êtes [affaibli 1](enfeebled) et subissez un malus de –2 contre les manœuvres pour vous [Saisir](grab), [Bousculer](shove) et les autres formes de déplacement forcé.\n" +
                "@checkbox **Malédiction modérée** Votre corps est davantage attiré vers le ciel. Vous êtes [affaibli 2](enfeebled) et le malus de votre malédiction mineure passe à –3. Vous êtes considéré comme étant d'une taille inférieure pour les effets du vent. Vous bénéficiez d'un bonus de statut de +2 contre les [Croc-en-jambe](trip), vous ne subissez que la moitié des dégâts de chute et vous bénéficiez des effets des dons de compétence [Bond puissant](powerfulLeap) et [Saut rapide](quickJump). Votre poids est réduit de moitié et votre Encombrement, si quelqu'un devait vous porter, est également réduit de moitié.",
        },
    ],
};

const flames: ClassChoiceOption = {
    name: "Flammes",
    description:
        "Le feu réside au centre du monde, au centre du soleil et au centre de la civilisation.",
    grants: [
        expert("reflexes"),
        trained("acrobatics"),

        spellToModifier(ignition),

        spellToModifier(cinderGaze),
        spellToModifier(incendiaryAura1),

        spellToModifier(breatheFire1),
        spellToModifier(airBubble),
        spellToModifier(cinderScribe1),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction des flammes dévorantes** _Vous voyez des flammes et de la fumée partout où vous portez le regard. Ces flammes sont peut-être le fruit de votre imagination, ou peut-être s'agit-il d'un aperçu surnaturel des feux métaphoriques qui alimentent le multivers tout entier. Des flammes s'intensifient de manière visible (bien que sans danger) en votre présence, de la fumée s'échappe parfois légèrement de vous et votre corps est brûlant au toucher, au point d'en être douloureux.\n" +
                "@checkbox **Malédiction mineure** La fumée, la chaleur et le crépitement des flammes de votre malédiction envahissent votre champ de vision ainsi que vos autres sens. Les créatures situées à plus de 9 mètres de vous vous sont [dissimulées](concealed).\n" +
                "@checkbox **Malédiction modérée** La fumée et les visions vacillantes de flammes envahissent totalement vos sens, tandis que des flammèches innoffesnives envahissent votre espace. Vous êtes [dissimulé](concealed) vis-à-vis des autres créatures. Toutes les autres créatures et tous les autres objets sont dissimulés à votre égard, quelle que soit la distance. Lorsque vous lancez un sort de feu, vous réussissez automatiquement le test brut lié à cette condition pour les cibles situées à moins de 9 mètres. Tous vos sens deviennent imprécis au-delà de 9 mètres.",
        },
    ],
};

const life: ClassChoiceOption = {
    name: "Vie",
    description:
        "Le flux incessant de l'énergie vitale au sein des êtres vivants est palpable pour vous. Vous pouvez défendre le caractère sacré de la vie, ou peut-être cherchez-vous à le saper.",
    grants: [
        { kind: "hp", value: 2, perLevel: true },
        trained("medicine"),

        spellToModifier(stabilize),

        spellToModifier(lifeLink),
        spellToModifier(healersBlessing),

        spellToModifier(heal1),
        spellToModifier(forcedMercy1),
        spellToModifier(infuseVitality1),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction de l'effusion vitale** _L'énergie vitale s'écoule de vous vers l'extérieur et vous relie à tous les êtres vivants, mais vous dépensez votre propre essence vitale pour ce faire. Votre présence réconforte les malades et les blessés, atténue légèrement les cicatrices, stimule la croissance des plantes et insuffle de la vitalité à votre environnement._\n" +
                "@checkbox **Malédiction mineure** À mesure que votre force vitale s'échappe, il devient plus difficile de maintenir le fonctionnement de votre corps. Les effets qui vous rendent des points de vie subissent une pénalité de statut de {{max(1, floor(level/2))}} sur le nombre de PV récupérés.\n" +
                "@checkbox **Malédiction modérée** Le flux d'énergie vitale s'échappant de vous ne peut être inversé. Outre les effets de votre malédiction mineure, vous ne pouvez pas être soigné par des effets magiques provenant d'autres créatures. Toutefois, si vous êtes inconscient, des effets magiques peuvent vous ramener à 1 PV (mais pas au-delà). Lorsque vous lancez le sort Guérison et que toutes vos cibles sont des créatures vivantes, vous lancez des d12 au lieu de d8 pour déterminer la quantité de soins prodigués. Chaque fois que vous terminez de lancer un sort autre qu'un tour de magie, sa cible ou la créature la plus proche de vous (mais pas vous) récupère un nombre de points de vie égal au rang du sort. Ce soin est un effet de vitalité.",
        },
    ],
};

const lore: ClassChoiceOption = {
    name: "Connaissance",
    description:
        "Les connaissances et les informations vous parviennent librement. Vous pourriez utiliser ce savoir pour acquérir du pouvoir ou, peut-être, pour comprendre les mystères divins du multivers.",
    grants: [
        trained("occultism"),

        spellToModifier(readAura),

        spellToModifier(brainDrain),
        spellToModifier(scholarlyRecollection),

        spellToModifier(mindlink),
        spellToModifier(alarm1),
        spellToModifier(breadcrumbs1),
        spellToModifier(heal1),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction du savoir torrentiel** _Vous êtes relié à une véritable connaissance divine, mais votre esprit de mortel peine à assimiler ces informations et à agir en conséquence. Les éléments meubles autour de vous — poussière, grains de riz, gouttelettes d'eau — se déplacent lentement pour former d'étranges runes ou des inscriptions indistinctes et indéchiffrables ; il vous arrive également d'énoncer, sans même vous en rendre compte, des vérités ou des affirmations inintelligibles dans des langues inconnues.\n" +
                "@checkbox **Malédiction mineure** Vous subissez un malus de –4 à l'initiative, car l'effort nécessaire pour assimiler le flot d'informations concernant votre environnement ralentit votre capacité de réaction.\n" +
                "@checkbox **Malédiction modérée** Le flux d'informations traversant votre esprit s'intensifie. L'attention que vous devez consacrer au traitement de cet afflux massif de données vous laisse en permanence [pris au dépourvu](offGuard). Au début de chacun de vos tours, vous effectuez automatiquement un test pour [Vous rappeler des informations](recallKnowledge) en tant qu'action gratuite. Vous utilisez pour cela la compétence de votre choix associée à l'action Se rappeler des informations, en retenant un résultat égal à 10 + votre bonus de maîtrise dans cette compétence (sans aucun autre bonus, malus ou modificateur).",
        },
    ],
};

const tempest: ClassChoiceOption = {
    name: "Tempête",
    description:
        "La fureur du vent et des vagues résonne au rythme de votre cœur, que votre pouvoir provienne de tempêtes naturelles, d'un lien avec les Plans élémentaires de l'Air et de l'Eau, ou de la vénération de divinités liées à eclles-ci.",
    grants: [
        {
            kind: "passive",
            name: "Mystère des tempêtes",
            text: "Vous voyez parfaitement à travers le vent et l'eau, et vous pouvez projeter des décharges électriques aussi bien dans l'air que dans l'eau. Vous ne subissez jamais de malus de Perception dus au vent, à la pluie, au brouillard ou à d'autres précipitations, ni lorsque vous regardez à travers l'eau ou que vous êtes immergé ; de telles conditions ne permettent pas de vous [dissimuler](concealed) quoi que ce soit. Lorsque vous infligez des dégâts physiques avec un sort d'air ou d'eau qui n'est pas un tour de magie, vous infligez 1 point de dégâts d'électricité supplémentaire par rang du sort.",
        },
        trained("nature"),

        spellToModifier(electricArc),
        spellToModifier(rousingSplash),

        spellToModifier(tempestTouch),
        spellToModifier(pushingGust),

        spellToModifier(thunderstrike1),
        spellToModifier(airBubble),
        spellToModifier(createWater),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction de la tempête perpétuelle** _Vous êtes le centre de votre propre tempête miniature, constamment entouré de vent et de pluie ; ces phénomènes s'intensifient à mesure que vous puisez dans vos pouvoirs élémentaires. Même lorsque vous êtes calme et au repos, vos cheveux et vos vêtements sont agités par une brise légère, vous êtes légèrement humide et votre toucher provoque souvent une décharge d'électricité statique._\n" +
                "@checkbox **Malédiction mineure** Une aura de tempête tourbillonnante se déchaîne dans une émanation de 1,5 mètre autour de vous. Cette aura éteint les petits feux non magiques un tour après qu'ils ont été allumés ou introduits dans l'aura. De l'énergie électrique s'accumule au sein de votre tempête, faisant de vous un véritable paratonnerre ; vous gagnez une faiblesse de 2 à l'électricité, et les sorts ou effets électriques ayant des conséquences supplémentaires pour une créature portant ou tenant du métal vous affectent comme si vous portiez du métal.\n" +
                "**Malédiction modérée** L'aura de votre malédiction mineure s'étend pour former une émanation de 3 mètres et s'accompagne de pluie portée par le vent. Les vents tourbillonnants imposent un malus de circonstances de -2 aux jets d'attaque à distance utilisant des munitions physiques, que ces attaques vous visent ou proviennent de vous. Votre faiblesse à l'électricité passe à 5, mais la pluie torrentielle vous confère une résistance au feu équivalente.",
        },
    ],
};

const time: ClassChoiceOption = {
    name: "Temps",
    description:
        "Que ce soit par accident, par le jeu du destin ou par une ingérence délibérée, vous existez quelque peu en dehors du temps. Bien que vous ne soyez pas immédiatement affecté par le cours des instants, l'accumulation incessante des millisecondes finit par vous décaler toujours davantage de votre ligne temporelle naturelle, souvent dans des directions contradictoires.",
    grants: [
        {
            kind: "passive",
            name: "Mystère du temps",
            text: "Le temps s'écoule plus rapidement pour vous que pour ceux qui vous entourent, ce qui vous permet de parcourir une plus grande distance durant ce que les autres perçoivent comme une durée identique. Vous bénéficiez d'un bonus de statut de +3 mètres à votre Vitesse. Vos déplacements saccadés rendent plus difficile pour les créatures de vous toucher lorsque vous bougez. Vous bénéficiez d'un bonus de statut de +1 à la CA contre les attaques effectuées à votre encontre via des réactions ou des actions gratuites pendant que vous vous déplacez.",
        },
        trained("occultism"),

        spellToModifier(timeSense),

        spellToModifier(temporalDistortion),
        spellToModifier(readFate),

        spellToModifier(dejaVu),
        spellToModifier(heal1),
        spellToModifier(mending1),

        { kind: "attributeArray", array: [0, 2, 1, 0, 1, 3] },
        { kind: "weapon", ...weapons.throwingKnife },
        { kind: "weapon", ...weapons.flintlockPistol },

        {
            ...oracularCurse,
            outroText:
                "**Malédiction des instants tumultueux** _Le temps s'écoule différemment pour vous par rapport aux autres. Vous subissez des fluctuations qui peuvent se manifester par des changements mineurs et quotidiens de votre âge apparent — comme une mèche de cheveux grisonnante ou une ride qui s'efface — ou par des rémanences temporelles spectrales qui semblent traîner légèrement derrière vous lorsque vous bougez.\n" +
                "@checkbox **Malédiction mineure** À mesure que vous puisez dans votre mystère, l'écoulement du temps devient plus chaotique, vous faisant vieillir, rajeunir ou vous décalant temporellement. Vous devenez [affaibli 1](enfeebled). De plus, vous subissez un malus de –2 aux jets de sauvegarde contre les effets qui vous rendraient [fatigué](fatigued) ou [ralenti](slowed).\n" +
                "@checkbox **Malédiction modérée** Le temps se distord davantage, accentuant l'atrophie musculaire, la régression de l'âge ou les distorsions temporelles, tout en accélérant la vitesse à laquelle les effets vous affectent. La valeur de votre état affaibli passe à 2 et le malus de votre malédiction mineure passe à –3. Votre bonus de statut à la CA contre les attaques portées par des réactions ou des actions gratuites pendant que vous vous déplacez passe à +2. De plus, les effets qui vous affectent durent moitié moins longtemps, avec un minimum de 1 round. Cela ne modifie pas la durée de votre immunité temporaire, la fréquence à laquelle vous pouvez utiliser des capacités limitées dans le temps, ni aucune autre caractéristique fondée sur l'écoulement du temps.",
        },
    ],
};

export const oracle: Class = {
    id: "oracle",
    img: "./classes/oracle.png",
    name: "Oracle",
    flags: [Flag.Magic, Flag.Questing, Flag.Support],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=61",
    summary:
        "Votre lien avec la puissance divine délaisse les voies traditionnelles de la prière et de la servitude ; vous glanez plutôt des vérités sacrées et de grands mystères incarnés par des concepts universels, que ce soit en percevant les points communs entre plusieurs divinités ou en contournant totalement leur pouvoir. Vous explorez l'un de ces mystères et puisez dans sa puissance pour lancer des sorts miraculeux, mais ce pouvoir s'accompagne d'un prix terrible : une malédiction qui s'intensifie à mesure que vous y faites appel — une malédiction que vous pouvez considérer comme un instrument du divin ou comme une punition infligée par les dieux.",
    keyAttributes: [Attribute.Charisma],
    forbiddenFlaws: [Attribute.Charisma],
    hp: 8,
    skills: 3,
    grants: [
        trained("perception"),
        trained("fortitude"),
        trained("reflexes"),
        expert("will"),
        trained("religion"),
        trained("simpleWeapons"),
        trained("unarmedAttacks"),
        trained("lightArmor"),
        trained("unarmoredDefense"),
        trained("oracleClassDC"),
        trained("spellAttackModifier"),
        trained("spellDC"),
        { kind: "slots", forCategory: "spell1", quantity: 2 },

        spellToModifier(detectMagic),
        spellToModifier(forbiddingWard),
        spellToModifier(guidance),
        spellToModifier(voidWarp),
    ],
    choices: [
        {
            title: "Mystère",
            description:
                "Un oracle canalise une puissance divine, mais celle-ci ne provient pas d'une divinité unique. Ce pouvoir peut émaner d'un concept ou d'un idéal puissant, de l'attention portée par plusieurs entités divines dont les domaines de prédilection convergent vers ce sujet, ou encore d'un canal direct et périlleux vers une énergie divine brute. C'est là le mystère de l'oracle : une source de magie divine qui ne dépend d'aucune divinité.\n" +
                "Choisissez le mystère qui alimente votre magie. Votre mystère vous confère des sorts supplémentaires, et vous octroie également une capacité unique liée à votre malédiction, vous permettant de puiser dans le divin, tout en déterminant les effets de la malédiction oraculaire qui s'abat sur vous lorsque vous entrez trop intensément en contact avec ce pouvoir.",
            options: [battle, bones, cosmos, flames, life, lore, tempest, time],
        },
    ],
};
