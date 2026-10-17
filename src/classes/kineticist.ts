import type { Action } from "../actions";
import { formatDistance } from "../formatting";
import { DamageType, printDamageType } from "../items/weapons";
import {
    expert,
    trained,
    type CustomCategory,
    type GrantedAction,
} from "../modifiers";
import { Attribute } from "../rules/attributes";
import { Flag, type Class, type ClassChoiceOption } from "./types";

const impulses: CustomCategory = {
    kind: "customCategory",
    id: "impulse",
    name: "Impulsions",
    introText:
        "Par le biais de votre portail cinétique, des éléments affluent depuis un plan élémentaire pour graviter autour de vous. La forme et l'apparence de cette aura cinétique vous sont propres.\n" +
        "Vous pouvez activer cette aura par une action @oneAction, et dans le cadre de cette action, vous pouvez utiliser une [Décharge élémentaire](elementalBlast) nécessitant 1 action, ou une impulsion de type [posture](stance) nécessitant 1 action. Votre aura cinétique est une émanation de 3 mètres, au sein de laquelle des fragments de votre élément cinétique gravitent autour de vous. L'aura cinétique ne peut infliger de dégâts ni affecter l'environnement, sauf si une autre capacité le lui permet.\n" +
        "Votre aura cinétique se désactive automatiquement si vous tombez inconscient, si vous utilisez une impulsion dotée du trait [débordement](overflow), ou si vous choisissez de [Révoquer](dismiss) l'aura.",
    actions: { kind: "category", category: "impulse" },
};

const baseKinesis: GrantedAction = {
    kind: "action",
    name: "Cinétique élémentaire",
    traits: ["impulsion", "cinétiste", "primordial"],
    category: "impulse",
    actions: "two",
    text:
        "Il vous est très facile de créer une portion de votre élément ou de modifier une partie de celui-ci qui existe déjà. Choisissez l'un de vos éléments cinétiques sur lequel agir. Cette impulsion a une portée de 9 mètres et l'encombrement de la cible doit être négligeable ou léger. Vous ne pouvez pas agir sur un élément magique, fixé en place (comme une pierre scellée dans un mur) ou tenu par une créature qui s'y oppose.\n" +
        "Choisissez l'une des options suivantes ; le MJ peut toutefois vous autoriser à effectuer d'autres modifications mineures similaires.\n" +
        "**Générer** Vous faites apparaître une portion ordinaire, non magique, de l'élément choisi, en provenance de son plan élémentaire. Cet élément peut être utilisé de manière habituelle ; par exemple, l'air peut être respiré par une créature qui a besoin d'air, tandis que le feu émet de la lumière et peut enflammer des substances combustibles.\n" +
        "**Déplacer** Vous déplacez une portion existante de l'élément jusqu'à 6 mètres dans n'importe quelle direction. Si vous l'amenez dans votre espace, vous pouvez la saisir dans une main libre. Vous pouvez [Maintenir](sustain) l'impulsion pour continuer à déplacer l'élément.\n" +
        "**Supprimer** Vous détruisez une portion existante de l'élément, par exemple en éteignant une flamme ou en faisant évaporer l'eau contenue dans un récipient. Cela ne s'applique qu'aux formes naturelles de l'élément, et non aux objets façonnés et durables, tels qu'une statue en pierre, une serrure en métal ou une porte en bois.",
};

function elementalBlast(
    dice: number,
    type: DamageType[],
    range: number,
    trait: string,
): Action {
    return {
        combat: true,
        name: "Décharge élémentaire",
        traits: ["cinétiste", "impulsion", "primordial", trait],
        attack: true,
        category: "impulse",
        actions: "one-two",
        text:
            `**Portée** ${formatDistance(range)} mètres.\n` +
            "D'un geste de la main, vous rassemblez de la matière élémentaire issue de votre aura, puis vous la projetez ou frappez avec. Effectuez un jet d'attaque d'impulsion (au corps à corps ou à distance) contre la CA d'une créature. Ajoutez votre Force au jet de dégâts d'une Décharge élémentaire au corps à corps. Si vous utilisez 2 actions, vous bénéficiez d'un bonus de statut au jet de dégâts égal à votre Constitution.\n" +
            `En cas de réussite, la cible subit 1d${dice} dégâts ${printDamageType(type)}, doublés en cas de réussite critique`,
    };
}

const air: ClassChoiceOption = {
    name: "Air",
    description:
        "Vous manipulez les masses d'air et l'électricité qu'elles produisent.",
    grants: [
        {
            ...impulses,
            outroText:
                "Avant ou après avoir utilisé une impulsion nécessitant au moins deux actions @twoActions, vous pouvez [Faire un pas](step) ou [Vous déplacer](stride) à la moitié de votre vitesse.",
        },

        {
            kind: "action",
            ...elementalBlast(
                6,
                [DamageType.Slashing, DamageType.Electricity],
                12,
                "air",
            ),
        },

        {
            kind: "action",
            name: "Coussin d'air",
            traits: ["air", "cinétiste", "impulsion", "primordial"],
            category: "impulse",
            actions: "reaction",
            text:
                "**Déclencheur** Une créature à moins de 18 mètres est en train de chuter.\n" +
                "Des courants d'air ascendants ralentissent la chute de la cible, la limitant à 18 mètres par tour. Ce coussin d'air se dissipe lorsque la cible atteint le sol ; la créature ne subit alors aucun dégât lié à la chute. Si la créature n'atteint pas le sol dans un délai d'une minute, le coussin d'air disparaît. Vous ne pouvez pas utiliser Coussin d'air à nouveau tant qu'un tel effet est déjà actif.",
        },
        {
            kind: "action",
            name: "Quatre vents",
            traits: ["air", "impulsion", "cinétiste", "primordial"],
            category: "impulse",
            actions: "two",
            text: "Ciblez jusqu'à quatre créatures consentantes dans les 9 mètres. Chacune de ces créatures peut [Se déplacer](stride) jusqu'à la moitié de sa vitesse.",
        },
        {
            kind: "action",
            name: "Murmure porté par le vent",
            traits: [
                "air",
                "auditif",
                "illusion",
                "impulsion",
                "cinétiste",
                "linguistique",
                "primordial",
            ],
            category: "impulse",
            actions: "one",
            text:
                "**Portée** 150 mètres ; **Cible** une créature entourée d'air.\n" +
                "Vous murmurez, et un léger vent emporte vos paroles au loin. Bien que les autres ne puissent pas entendre vos paroles — pas plus que si vous vous contentiez de remuer les lèvres sans émettre de son —, la cible, elle, les perçoit comme si elle se tenait juste à côté de vous. La cible peut formuler une brève réponse en guise de réaction, ou bien en tant qu'action gratuite lors de son prochain tour si elle le souhaite. Si elle répond, sa réponse vous parvient directement à l'oreille, tout comme le message initial. Vous devez voir la cible, ou commencer votre message en prononçant son nom.",
        },

        { kind: "attributeArray", array: [1, 2, 3, 0, 1, 0] },
    ],
};

const earth: ClassChoiceOption = {
    name: "Terre",
    description: "Vous manipulez la terre et la roche.",
    grants: [
        {
            ...impulses,
            outroText:
                "Après avoir utilisé une impulsion nécessitant au moins deux actions @twoActions, des fragments de pierre se mettent à flotter autour de vous, vous conférant un bonus de circonstance de +1 à la CA pendant 1 tour.",
        },

        {
            kind: "action",
            ...elementalBlast(
                8,
                [DamageType.Bludgeoning, DamageType.Piercing],
                6,
                "terre",
            ),
        },

        {
            kind: "action",
            name: "Harmonie géologique",
            traits: [
                "terre",
                "cinétiste",
                "impulsion",
                "posture",
                "primordial",
            ],
            category: "impulse",
            actions: "one",
            text: "Vous vous mettez à l'unisson de la terre et de la pierre qui vous entourent, prolongeant vos sens à travers elles sous forme d'ondes qui se propagent. Vous obtenez le [sens des vibrations (imprécis)](senses) au sein de votre aura cinétique. Une fois par tour, vous pouvez [Pointer](pointOut) une créature que vous percevez grâce à ce sens par une action gratuite.",
        },
        {
            kind: "action",
            name: "Pierres de gué",
            traits: [
                "terre",
                "cinétiste",
                "impulsion",
                "gestuel",
                "primordial",
            ],
            category: "impulse",
            actions: "two",
            text:
                "**Durée** maintenue.\n" +
                "Des disques de roche volent vers des points que vous désignez afin de créer un nouveau passage. Vous pouvez les disposer horizontalement pour former un chemin au sol ou à la surface d'un liquide, ou les ancrer dans une surface verticale pour créer des marches. Le passage peut atteindre une longueur de {{dist(3+level)}} mètres, et les marches peuvent s'élever jusqu'à {{dist(3+level/2)}} mètres le long d'une surface. Toutes les cases doivent être contiguës et se situer à moins de {{dist(11+level)}} mètres de vous. Lorsqu'une créature se déplace sur ce passage, elle ignore le terrain difficile ainsi que les terrains dangereux présents sur le sol en dessous.",
        },
        {
            kind: "action",
            combat: true,
            name: "Séisme",
            traits: [
                "terre",
                "impulsion",
                "cinétiste",
                "débordement",
                "primordial",
            ],
            category: "impulse",
            actions: "two",
            dc: true,
            text:
                "**Portée** 9 mètres ; **Zone** une sphère de 3 mètres de rayon.\n" +
                "Vous déclenchez un séisme mineur et localisé. Chaque créature présente dans cette zone subit 1d8 dégâts contondants avec un jet de Vigueur basique contre votre DD de classe. Une créature qui obtient un échec critique est mise [à terre](prone). La terre et la pierre dans la zone deviennent un terrain difficile pendant 1 tour.",
        },

        { kind: "attributeArray", array: [2, 1, 3, 0, 1, 0] },
    ],
};

const fire: ClassChoiceOption = {
    name: "Feu",
    description: "Vous manipulez le feu.",
    grants: [
        {
            ...impulses,
            outroText:
                "Lorsque vous utilisez une impulsion infligeant des dégâts et nécessitant au moins deux actions @twoActions, augmentez la taille des dés de dégâts d'un cran.",
        },

        {
            kind: "action",
            ...elementalBlast(6, [DamageType.Fire], 12, "feu"),
        },

        {
            kind: "action",
            name: "Fusée ardente",
            traits: ["feu", "impulsion", "cinétiste", "primordial"],
            category: "impulse",
            actions: "two",
            text: "Une décharge concentrée de flammes jaillit derrière vous, vous propulsant vers l'avant par sa force pure. [Déplacez-vous](stride) sur une distance maximale de 12 mètres en ligne droite. Ce déplacement ignore les terrains difficiles et ne déclenche pas de réactions.",
        },
        {
            kind: "action",
            name: "Flamme volante",
            combat: true,
            traits: ["feu", "impulsion", "cinétiste", "primordial"],
            category: "impulse",
            actions: "two",
            dc: true,
            text: "Une minuscule forme de flamme apparaît, adoptant l'apparence de votre choix — par exemple un oiseau, une flèche ou une simple sphère. Elle s'éloigne de vous en volant sur une distance maximale de 9 mètres, en suivant une trajectoire que vous déterminez. Chaque créature qu'elle traverse subit {{ceil(level/2)}}d6 dégâts de feu avec un jet de Réflexes basique contre votre DD de classe. Une créature ne tente ce jet qu'une seule fois, même si la flamme la traverse à plusieurs reprises.",
        },
        {
            kind: "action",
            combat: true,
            name: "Colonne incandescente",
            traits: [
                "feu",
                "impulsion",
                "cinétiste",
                "débordement",
                "primordial",
            ],
            category: "impulse",
            actions: "three",
            dc: true,
            text:
                "**Portée** 18 mètres ; **Zone** un cylindre de 3 mètres de diamètre et 9 mètres de haut.\n" +
                "D'un geste vers le haut, vous façonnez une colonne verticale d'une chaleur extrême. Chaque créature présente dans la zone subit {{ceil(level/3)}}d6 dégâts de feu, avec un jet de Réflexes de base contre le DD de classe de votre cinétiste.\n" +
                "La flamme persiste un court instant, transformant toutes les cases de la colonne en terrain dangereux jusqu'à la fin de votre prochain tour ; vous pouvez par ailleurs [Maintenir](sustain) ces flammes pendant une durée maximale de 1 minute. Une créature subit {{ceil(level/3)+ceil(level/3)-1}} dégât(s) de feu chaque fois qu'elle pénètre dans l'une de ces cases.",
        },

        { kind: "attributeArray", array: [1, 2, 3, 0, 1, 0] },
    ],
};

const metal: ClassChoiceOption = {
    name: "Métal",
    description: "Vous manipulez le métal et le magnétisme.",
    grants: [
        {
            ...impulses,
            outroText:
                "Après avoir utilisé une impulsion  nécessitant au moins deux actions @twoActions, choisissez entre acide, électricité ou perforant. Pendant 1 tour, chaque fois qu'une créature vous touche ou vous inflige des dégâts avec une attaque au corps à corps sans [allonge](reach), elle subit {{max(1, level/2)}} dégâts du type choisi.",
        },

        {
            kind: "action",
            ...elementalBlast(
                8,
                [DamageType.Piercing, DamageType.Slashing],
                6,
                "metal",
            ),
        },

        {
            kind: "action",
            name: "Forge instantanée",
            traits: ["metal", "impulsion", "cinétiste", "primordial"],
            category: "impulse",
            actions: "two",
            text:
                "**Portée** 9 mètres.\n" +
                "Un objet métallique artificiel se forme entre vos mains ou celles d'un allié consentant. Vous pouvez choisir une arme courante de niveau 0 ou un équipement d'aventure d'un encombrement de 1 ou moins. L'objet est entièrement constitué de métal et peut être doté de mécanismes simples ou fonctionnant par magnétisme, comme une boussole, une serrure rudimentaire ou une balance de marchand. L'objet persiste pendant 10 minutes ; toutefois, à chaque utilisation, l'utilisateur doit réussir un test nu de DD 5, faute de quoi l'objet est détruit une fois l'action terminée.",
        },
        {
            kind: "action",
            name: "Pignons magnétiques",
            combat: true,
            traits: [
                "metal",
                "impulsion",
                "cinétiste",
                "débordement",
                "primordial",
            ],
            category: "impulse",
            actions: "three",
            attack: true,
            text:
                "**Portée** 18 mètres ; **Cibles** jusqu'à 3 créatures.\n" +
                "De petits fragments de métal s'échappent de vous, propulsés à grande vitesse par magnétisme. Effectuez des jets d'attaque d'impulsion à distance contre chaque cible ; vous bénéficiez d'un bonus de circonstances de +1 à votre jet d'attaque contre toute cible composée de métal ou portant une armure métallique. Ces trois attaques comptent pour le calcul de votre pénalité d'attaques multiples, mais celle-ci ne s'applique qu'une fois toutes les attaques effectuées. En cas de réussite, les fragments de métal infligent {{ceil(level/2)}}d4 dégâts contondants et {{ceil(level/2)}}d4 dégâts perforants (ou le double en cas de coup critique).",
        },
        {
            kind: "action",
            combat: true,
            name: "Frappe d'éclats",
            traits: ["impulsion", "cinétiste", "metal", "primordial"],
            category: "impulse",
            actions: "two",
            dc: true,
            text: "Des éclats de métal dentelés se forment dans les airs et jaillissent depuis votre position. Vous choisissez entre des éclats ou des pointes ; ce choix détermine la zone d'effet, le type de dégâts et l'effet en cas d'échec critique. Chaque créature située dans la zone doit effectuer un jet de Réflexes de base contre le DD de classe de votre cinétiste. Les éclats infligent {{ceil(level/2)}}d6 dégâts tranchants dans un cône de 4,5 mètres ; une créature qui obtient un échec critique subit, en outre, 1d6 dégâts de saignement persistants. Les pointes infligent {{ceil(level/2)}}d6 dégâts perforants dans une ligne de 9 mètres ; une créature qui obtient un échec critique devient [maladroite 1](clumsy) jusqu'au début de votre prochain tour.",
        },

        { kind: "attributeArray", array: [2, 1, 3, 0, 1, 0] },
    ],
};

const water: ClassChoiceOption = {
    name: "Eau",
    description: "Vous manipulez l'eau et la glace.",
    grants: [
        {
            ...impulses,
            outroText:
                "Après avoir utilisé une impulsion  nécessitant au moins deux actions @twoActions, vous pouvez déplacer une créature ciblée par l'impulsion de 1,5 mètres dans n'importe quelle direction — ou de 3 mètres si elle se trouve dans une étendue d'eau. Ce déplacement ne peut pas amener la créature dans les airs. Vous ne pouvez choisir qu'une créature consentante, qui a échoué à son jet de sauvegarde contre l'impulsion, ou contre laquelle vous avez réussi un jet d'attaque lié à l'impulsion.",
        },

        {
            kind: "action",
            ...elementalBlast(
                8,
                [DamageType.Bludgeoning, DamageType.Cold],
                6,
                "eau",
            ),
        },

        {
            kind: "action",
            name: "Vague de déviation",
            combat: true,
            traits: ["eau", "impulsion", "cinétiste", "primordial"],
            category: "impulse",
            actions: "reaction",
            text:
                "**Déclencheur** Vous êtes sur le point de subir des dégâts d'acide, contondants, de feu ou tranchants, et vous n'êtes [pris au dépourvu](offGuard) face à cet effet.\n" +
                "Une cascade d'eau amortit ou disperse l'attaque entrante. Vous obtenez une résistance aux dégâts infligés par l'effet déclencheur égale {{level}} s'il s'agit de dégâts contondants ou tranchants, ou égale à {{level*2}} s'il s'agit de dégâts d'acide ou de feu. Si l'effet inflige plusieurs types de dégâts concernés, appliquez la résistance la plus élevée.",
        },
        {
            kind: "action",
            name: "Baume de l'océan",
            traits: [
                "guérison",
                "impulsion",
                "cinétiste",
                "gestuel",
                "primordial",
                "vitalité",
                "eau",
            ],
            category: "impulse",
            actions: "one",
            text:
                "**Portée** toucher ; **Cible** une créature vivante consentante.\n" +
                "Une bénédiction de la mer vivante apaise les blessures et éteint les flammes. La cible récupère {{ceil(level/2)}}d8 points de vie et obtient une résistance de {{1+ceil(level/2)}} contre le feu pendant 1 minute. Si elle subit des dégâts de feu persistants, elle peut tenter un test nu avec un DD réduit pour y mettre fin. La cible devient temporairement immunisée contre les soins prodigués par Baume de l'océan pendant 10 minutes.",
        },
        {
            kind: "action",
            combat: true,
            name: "Emprise de l'hiver",
            traits: ["impulsion", "cinétiste", "eau", "froid", "primordial"],
            category: "impulse",
            actions: "two",
            dc: true,
            text:
                "**Portée** 18 mètres ; **Zone** une sphère de 3 mètres de rayon.\n" +
                "Des flocons étincelants d'une neige glaciale tombent dans la zone d'effet. Chaque créature présente dans cette zone subit {{1+ceil(level/2)}}d4 dégâts de froid avec un jet de Réflexes basique contre votre DD de classe. Le sol de la zone se couvre d'une accumulation de neige, constituant un terrain difficile. Chaque case ainsi recouverte le reste jusqu'à ce que la neige fonde, soit naturellement, soit à la suite de dégâts de feu infligés dans cette case.",
        },

        { kind: "attributeArray", array: [1, 2, 3, 0, 1, 0] },
    ],
};

const wood: ClassChoiceOption = {
    name: "Bois",
    description: "Vous manipulez le bois et les plantes.",
    grants: [
        {
            ...impulses,
            outroText:
                "Après avoir utilisé une impulsion  nécessitant au moins deux actions @twoActions, vous gagnez {{level}} point(s) de vie temporaire(s).",
        },

        {
            kind: "action",
            ...elementalBlast(
                8,
                [DamageType.Bludgeoning, DamageType.Vitality],
                6,
                "bois",
            ),
        },

        {
            kind: "action",
            name: "Produit frais",
            traits: [
                "guérison",
                "impulsion",
                "cinétiste",
                "plante",
                "primordial",
                "vitalité",
                "bois",
            ],
            category: "impulse",
            actions: "one",
            text: "Vous faites pousser une noix, un légume, une graine ou un fruit nourrissant. Choisissez une créature située dans votre aura cinétique. Le produit apparaît dans sa main libre, ou bien à ses pieds. Une créature peut le consommer en [Interagissant](interact) pour récupérer {{ceil(level/2)}}d4 + {{5*ceil(level/2)-4}} PV. La créature se sent rassasiée pendant 10 minutes ; durant cette période, elle bénéficie d'une résistance de {{2*ceil(level/2)}} aux dégâts de vide et ne peut consommer aucun autre produit de ce type. Tout produit non consommé avant le début de votre prochain tour se flétrit et disparaît.",
        },
        {
            kind: "action",
            name: "Nuée d'échardes",
            combat: true,
            traits: [
                "impulsion",
                "cinétiste",
                "débordement",
                "primordial",
                "bois",
            ],
            category: "impulse",
            actions: "two",
            dc: true,
            text:
                "**Zone** un cône de 9 mètres.\n" +
                "Une rafale d'échardes acérées jaillit de vous. Les créatures situées dans la zone subissent {{ceil(level/2)}}d4 dégâts perforants ainsi que {{ceil(level/2)}}d4 dégâts de saignement persistant, avec un jet de Réflexes basique contre votre DD de classe.",
        },
        {
            kind: "action",
            name: "Sentinelle sylvestre",
            traits: ["impulsion", "cinétiste", "plante", "bois", "primordial"],
            category: "impulse",
            actions: "two",
            text:
                "**Portée** 9 mètres ; **Durée** 1 minute.\n" +
                "Un arbre fin et symétrique surgit du Plan du Bois. L'arbre possède une CA de 10 et {{10*ceil(level/2)}} points de vie. Lorsqu'un allié adjacent à l'arbre est touché par une attaque, l'arbre interpose ses branches et subit les dégâts à sa place. Tout excédent de dégâts, au-delà de ce qui est nécessaire pour réduire les points de vie de l'arbre à 0, est infligé à la cible initiale. L'arbre n'est pas assez volumineux pour entraver le déplacement à travers sa case.\n" +
                "Si l'arbre se trouve sur un sol propice et survit jusqu'à la fin de la durée de l'effet, il demeure sous la forme d'un arbre ordinaire, non magique, et continue de croître et de se développer.",
        },

        { kind: "attributeArray", array: [2, 1, 3, 0, 1, 0] },
    ],
};

export const kineticist: Class = {
    id: "kineticist",
    img: "./classes/kineticist.png",
    name: "Cinétiste",
    flags: [Flag.Combat, Flag.Magic, Flag.Support],
    ref: "https://2e.aonprd.com/Classes.aspx?ID=23",
    summary:
        "La puissance des éléments émane de votre être. Feu rugissant, eau pure, air évanescent, terre immuable, bois tournoyant, métal tranchant. Un portail cinétique, indissociable de votre corps, canalise l'énergie directement depuis les plans élémentaires ; les éléments surgissent alors dans votre main, tourbillonnent autour de vous et frappent vos ennemis au gré de vos volontés. À mesure que votre lien avec ces plans se renforce, vous accédez à une véritable maîtrise des éléments que vous avez choisis.",
    keyAttributes: [Attribute.Constitution],
    forbiddenFlaws: [Attribute.Constitution],
    hp: 8,
    skills: 3,
    grants: [
        trained("perception"),
        expert("fortitude"),
        expert("reflex"),
        trained("will"),
        trained("nature"),
        trained("simpleWeapons"),
        trained("unarmedAttacks"),
        trained("lightArmor"),
        trained("unarmoredDefense"),
        trained("kineticistClassDC"),
        baseKinesis,
    ],
    choices: [
        {
            title: "Élément cinétique",
            description:
                "En tant que cinésiste, vous avez éveillé ou ouvert un portail cinétique, un conduit surnaturel au sein de votre corps capable de canaliser les forces élémentaires directement depuis les plans élémentaires. Choisissez un élément pour votre portail cinétique",
            options: [air, earth, fire, metal, water, wood],
        },
    ],
};
