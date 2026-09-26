import { Attribute } from "../attributes";
import { weapons } from "../items/weapons";
import { crafting, performance } from "../skills";
import { Size, type Ancestry, type Heritage } from "./types";

const chameleonText =
    "La couleur de vos cheveux et de votre peau est changeante. Il vous suffit d'une seule action pour effectuer des changements localisés mineurs, tandis qu'une transformation radicale de l'ensemble du corps peut prendre jusqu'à une heure. Lorsque vous vous trouvez dans un environnement dont les teintes sont proches des vôtres (par exemple, un vert forestier en pleine forêt), vous pouvez opérer des changements mineurs visant à vous fondre dans le décor, vous conférant alors d'un bonus de circonstance de +2 aux tests de Discrétion.";
const chameleon: Heritage = {
    id: "chameleon",
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

const sensate: Heritage = {
    id: "sensate",
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

const umbral: Heritage = {
    id: "umbral",
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

export const gnome: Ancestry = {
    id: "gnome",
    img: "./ancestries/gnome.png",
    name: "Gnome",
    summary:
        "Les gnomes sont un peuple petit et robuste, doté d'une curiosité insatiable et d'habitudes excentriques.\n" +
        "Si vous souhaitez incarner un personnage débordant d'enthousiasme et doté d'une vision de la moralité et de la vie aussi étrange que féerique, vous devriez jouer un gnome.\n",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Gnome",
    hp: 8,
    size: Size.Small,
    speeds: { land: 5 },
    skills: [crafting, performance],
    attributes: {
        boosts: [Attribute.Constitution, Attribute.Charisma, "Libre"],
        flaw: Attribute.Strength,
    },
    heritages: [chameleon, sensate, umbral],
    familiarity: [
        weapons.glaive,
        weapons.gnomeFlickmace,
        weapons.gnomeHookedHammer,
        weapons.kukri,
    ],
    grants: [{ kind: "sense", name: "Vision en basse lumière" }],
};
