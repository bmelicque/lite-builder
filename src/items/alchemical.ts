import type { Action } from "../actions";

export const acidFlask: Action = {
    id: "acidFlask",
    combat: true,
    name: "Fiole d'acide",
    traits: ["bombe", "éclaboussure"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        "Cette fiole renferme un acide corrosif qui inflige {{steps(3, 11, 17)}} dégât d'acide, {{steps(3, 11, 17)}}d6 dégâts d'acide persistants et {{steps(3, 11, 17)}} dégât d'éclaboussure d'acide.",
};

export const alchemistsFire: Action = {
    id: "alchemistsFire",
    combat: true,
    name: "Feu grégeois",
    traits: ["bombe", "éclaboussure"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        "Le feu grégeois est un mélange de liquides volatils qui s'enflamment une fois exposés à l'air. Cette bombe inflige {{steps(3, 11, 17)}}d8 dégâts de feu, {{steps(3, 11, 17)}} dégât de feu persistant et {{steps(3, 11, 17)}} dégât d'éclaboussure de feu.",
};

export const antidote: Action = {
    id: "antidote",
    name: "Antidote",
    traits: ["élixir", "guérison"],
    category: "alchemy",
    actions: "two",
    text: "L'antidote vous protège contre les toxines. Lorsque vous le buvez, vous obtenez un bonus d'objet de +{{1 + steps(6, 10)}} aux jets de Vigueur contre les poisons pendant 6 heures.",
};

export const antiplague: Action = {
    id: "antiplague",
    name: "Antimaladie",
    traits: ["élixir", "guérison"],
    category: "alchemy",
    actions: "two",
    text: "L'antimaladie renforce les défenses du corps contre les maladies. Lorsque vous le buvez, vous obtenez un bonus d'objet de +{{1 + steps(6, 10)}} aux jets de Vigueur contre les maladies pendant 24 heures. Cela s'applique aussi à votre jet de sauvegarde quotidien contre la progression d'une maladie.",
};

export const bottledLightning: Action = {
    id: "bottledLightning",
    combat: true,
    name: "Foudre en bouteille",
    traits: ["bombe", "éclaboussure"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        "La foudre en bouteille déborde de réactifs volatils qui créent une décharge électrique une fois exposés à l'air. Une foudre en bouteille inférieure inflige {{steps(3, 11, 17)}}d6 dégâts d'électricité et {{steps(3, 11, 17)}} dégât d'éclaboussure d'électricité. La cible touchée est [prise au dépourvu](offGuard) jusqu'au début de votre prochain tour.",
};

export const cheetahsElixir: Action = {
    id: "cheetahsElixir",
    name: "Élixir du guépard",
    traits: ["élixir"],
    category: "alchemy",
    actions: "two",
    text: "Les composés enzymatiques de cet élixir renforcent et excitent les muscles de vos jambes. Vous obtenez un bonus de statut de +1,50 mètre à votre Vitesse pendant 1 minute.",
};

export const cognitiveMutagen: Action = {
    id: "cognitiveMutagen",
    name: "Mutagène cognitif",
    traits: ["élixir", "mutagène"],
    category: "alchemy",
    actions: "two",
    text:
        "**Durée** 1 minute.\n" +
        "Votre esprit s'éclaircit, mais les choses physiques semblent éphémères.\n" +
        "**Avantage** Vous obtenez un bonus d'objet de +1 aux tests d'Arcane, d'Artisanat, de Connaissances, d'Occultisme et de Société, ainsi qu'à tous les tests de [Rappel de connaissances](recallKnowledge). Vos échecs critiques aux tests de Rappel de connaissances deviennent des échecs.\n" +
        "**Inconvénient** Vous subissez un malus de -2 aux jets d'attaque avec et sans armes, aux tests d'Athlétisme et aux tests d'Acrobaties. Vous pouvez transporter 2 unités d'encombrement en moins avant d'être encombré, et l'encombrement maximal que vous pouvez transporter est réduit de 4.",
};

export const elixirOfLife: Action = {
    id: "elixirOfLife",
    name: "Élixir de vie",
    traits: ["elixir", "guérison"],
    category: "alchemy",
    actions: "two",
    text: "L'élixir de vie accélère le processus de guérison naturel du corps et son système immunitaire. En le buvant, vous récupérez {{ceil(level/2)}}d6+{{floor(3*level/2)-1}} Points de vie et obtenez un bonus d'objet de +{{steps(9, 15, 19)}} aux jets de sauvegarde contre la maladie et le poison pendant 10 minutes.",
};

export const forensicDye: Action = {
    id: "forensicDye",
    name: "Teinture médico-légale",
    category: "alchemy",
    actions: "two",
    text:
        "L'activation de cette fiole contenant un liquide incolore nécessite d'y introduire une petite quantité d'une autre substance chimique ou d'un matériau, comme du sang ou de la boue. La fiole réagit rapidement, se transformant en une substance trouble d'un brun rougeâtre pendant un bref instant, avant de redevenir limpide.\n" +
        "Une fois activée, la teinture reste efficace pendant une durée maximale de 10 minutes. Durant ce laps de temps, vous pouvez consacrer 1 minute à l'appliquer sur un objet (d'un encombrement maximal de 1) ou sur une zone au sol correspondant à un carré de 5 pieds (environ 1,5 mètre) de côté. Aux endroits où la teinture entre en contact avec une substance identique à celle ayant servi à l'activation, elle prend une teinte bleu vif, tout en restant transparente là où aucun composant activateur n'est présent.",
};

export const frostVial: Action = {
    id: "frostVial",
    combat: true,
    name: "Fiole de givre",
    traits: ["bombe", "éclaboussure"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        "Les réactifs liquides d'un bleu brillant de cette fiole absorbent rapidement la chaleur une fois exposés à l'air. Cette bombe inflige {{steps(3, 11, 17)}}d6 dégâts de froid et {{steps(3, 11, 17)}} dégât d'éclaboussure de froid. Si elle touche, la cible subit une pénalité de statut à ses Vitesses de -1,50 mètre jusqu'à la fin de son prochain tour.",
};

export const glowRod: Action = {
    id: "glowRod",
    name: "Bâton luminescent",
    category: "alchemy",
    actions: "two",
    text: "Ce bâton d'environ 30 cm de long, doté d'une extrémité dorée, émet de la lumière lorsqu'on le frappe contre une surface dure. Pendant les 6 heures qui suivent, il diffuse une lumière vive dans un rayon de 6 mètres, ainsi qu'une lumière faible sur les 12 mètres suivants.",
};

export const glueBomb: Action = {
    id: "glueBomb",
    combat: true,
    name: "Bombe collante",
    traits: ["bombe"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        // EDITED
        "Une bombe collante est un mécanisme explosif inoffensif contenant des substances collantes. Lorsque vous touchez une créature avec une bombe collante, cette créature subit une pénalité de statut de -3 mètres à ses Vitesses pendant 1 minute.\n" +
        "La cible peut mettre un terme à l'effet en [S'Échappant](escape) (DD 17), ou bien en passant un total de 3 actions Interagir à éliminer soigneusement la substance collante.\n",
};

export const sereneMutagen: Action = {
    id: "sereneMutagen",
    name: "Mutagène de sérénité",
    traits: ["élixir", "mutagène"],
    category: "alchemy",
    actions: "two",
    text:
        "**Durée** 1 minute.\n" +
        "Vous accédez à une sérénité intérieure, mais la violence vous devient répugnante.\n" +
        "**Avantage** Vous bénéficiez d'un bonus d'objet de +1 aux jets de Volonté ainsi qu'aux tests de Perception, Médecine, Nature, Religion et Survie. Ce bonus devient +2 lorsque vous effectuez des jets de Volonté contre des effets mentaux.\n" +
        "**Inconvénient** Vous subissez un malus de –1 aux jets d'attaque et aux DD de vos sorts offensifs, ainsi qu'un malus de –{{steps(4,11,17)}} à tous les dégâts infligés par des armes, des attaques à mains nues ou des sorts.",
};

export const silvertongueMutagen: Action = {
    id: "silvertongueMutagen",
    name: "Mutagène langue d'argent",
    traits: ["élixir", "mutagène"],
    category: "alchemy",
    actions: "two",
    text:
        "**Durée** 1 minute.\n" +
        "Vos traits deviennent saisissants et votre voix, musicale et empreinte d'autorité ; toutefois, vos émotions obscurcissent votre jugement.\n" +
        "**Avantage** Vous bénéficiez d'un bonus d'objet de +1 aux tests de Tromperie, Diplomatie, Intimidation et Représentation. Vos échecs critiques lors de tests impliquant l'une de ces compétences sont désormais considérés comme de simples échecs.\n" +
        "**Inconvénient** Vous subissez un malus de –2 aux tests d'Arcanes, Artisanat, Connaissances, Occultisme et Société. Choisissez une compétence dans laquelle vous êtes qualifié ; pendant la durée de l'effet, vous perdez votre qualification dans cette compétence.",
};

export const smokeBall: Action = {
    id: "smokeBall",
    name: "Boule de fumée",
    category: "alchemy",
    actions: "two",
    text: "En claquant cette boule sur le sol, vous créez instantanément un écran de fumée opaque épais en une boule de 1,50 mètre centrée sur un coin de votre espace. Toutes les créatures au sein de cette zone sont [Masquées](concealed) et toutes les autres créatures leur sont [Masquées](concealed). La fumée persiste pendant 1 minute ou jusqu'à ce qu'elle soit dispersée par un vent fort.",
};
