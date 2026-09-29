import type { Action } from "../actions";

export const acidFlask: Action = {
    id: "acidFlask",
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

export const elixirOfLife: Action = {
    id: "elixirOfLife",
    name: "Élixir de vie",
    traits: ["elixir", "guérison"],
    category: "alchemy",
    actions: "two",
    text: "L'élixir de vie accélère le processus de guérison naturel du corps et son système immunitaire. En le buvant, vous récupérez {{ceil(level/2)}}d6+{{floor(3*level/2)-1}} Points de vie et obtenez un bonus d'objet de +{{steps(9, 15, 19)}} aux jets de sauvegarde contre la maladie et le poison pendant 10 minutes.",
};

export const frostVial: Action = {
    id: "frostVial",
    name: "Fiole de givre",
    traits: ["bombe", "éclaboussure"],
    category: "alchemy",
    actions: "two",
    text:
        "**Portée** 6 mètres.\n" +
        "Les réactifs liquides d'un bleu brillant de cette fiole absorbent rapidement la chaleur une fois exposés à l'air. Cette bombe inflige {{steps(3, 11, 17)}}d6 dégâts de froid et {{steps(3, 11, 17)}} dégât d'éclaboussure de froid. Si elle touche, la cible subit une pénalité de statut à ses Vitesses de -1,50 mètre jusqu'à la fin de son prochain tour.",
};

export const glueBomb: Action = {
    id: "glueBomb",
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

export const smokeBall: Action = {
    id: "smokeBall",
    name: "Boule de fumée",
    category: "alchemy",
    actions: "two",
    text: "En claquant cette boule sur le sol, vous créez instantanément un écran de fumée opaque épais en une boule de 1,50 mètre centrée sur un coin de votre espace. Toutes les créatures au sein de cette zone sont [Masquées](concealed) et toutes les autres créatures leur sont [Masquées](concealed). La fumée persiste pendant 1 minute ou jusqu'à ce qu'elle soit dispersée par un vent fort.",
};
