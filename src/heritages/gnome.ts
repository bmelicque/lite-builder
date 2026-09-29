import { type Heritage } from "./types";

const chameleonText =
    "La couleur de vos cheveux et de votre peau est changeante. Il vous suffit d'une seule action pour effectuer des changements localisés mineurs, tandis qu'une transformation radicale de l'ensemble du corps peut prendre jusqu'à une heure.";
export const chameleonGnome: Heritage = {
    id: "chameleonGnome",
    name: "Gnome Caméléon",
    text: chameleonText,
    grants: [
        {
            kind: "action",
            name: "Gnome caméléon",
            category: "action",
            actions: "one",
            text:
                "**Condition** Vous vous trouvez dans un environnement dont les teintes sont proches des vôtres.\n" +
                "Vous opérez des changements localisés mineurs visant à vous fondre dans le décor. Vous bénéficiez alors d'un bonus de circonstance de +2 aux tests de Discrétion, tant que les couleurs ou les motifs de votre environnement restent inchangés.",
        },
    ],
};

export const sensateGnome: Heritage = {
    id: "sensateGnome",
    name: "Gnome sensitif",
    text: "Vous percevez les couleurs avec plus d'éclat, les sons avec plus de richesse et, surtout, les odeurs avec une précision incroyable. Vous bénéficiez d'un sens particulier : l'odorat imprécis, avec une portée de 9 mètres. Cela signifie que vous pouvez utiliser votre odorat pour déterminer l'emplacement exact d'une créature. Le MJ doublera généralement cette portée si vous êtes sous le vent par rapport à la créature, ou la réduira de moitié si vous êtes face au vent. De plus, vous bénéficiez d'un bonus de circonstance de +2 aux tests de Perception lorsque vous tentez de localiser une créature non détectée se trouvant à portée de votre odorat.",
    grants: [
        { kind: "sense", name: "Odorat (imprécis, 9 mètres)" },
        {
            kind: "passive",
            name: "Gnome sensitif",
            text: "Vous percevez les couleurs avec plus d'éclat, les sons avec plus de richesse et, surtout, les odeurs avec une précision incroyable. Vous bénéficiez d'un bonus de circonstance de +2 aux tests de Perception lorsque vous tentez de localiser une créature non détectée se trouvant à portée de votre odorat.",
        },
    ],
};

export const umbralGnome: Heritage = {
    id: "umbralGnome",
    name: "Gnome des ombres",
    text: "Que ce soit grâce à un lien avec des fées des ténèbres ou des ombres, aux gnomes des profondeurs ou à une autre source, vous pouvez voir dans l'obscurité totale. Vous gagnez la vision dans le noir. Si vous réussissez un jet de sauvegarde contre un effet de peur, vous obtenez une réussite critique à la place.",
    grants: [
        { kind: "sense", name: "Vision dans le noir" },
        {
            kind: "passive",
            name: "Perspicacité macabre",
            text: "Si vous réussissez un jet de sauvegarde contre un effet de peur, vous obtenez une réussite critique à la place.",
        },
    ],
};
