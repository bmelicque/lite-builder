import { dieHard } from "../feats/general";
import { intimidatingGlare } from "../feats/skill";
import { trained } from "../modifiers";
import { type Heritage } from "./types";

export const battleReadyOrc: Heritage = {
    id: "battleReadyOrc",
    name: "Orc querelleur",
    text: "Vous descendez d'une lignée de terrifiants commandants sur le champ de bataille. Vous êtes qualifié en Intimidation et vous obtenez le don de compétence [Regard intimidant](intimidatingGlare).",
    grants: [
        trained("intimidation"),
        {
            ...intimidatingGlare,
            text: intimidatingGlare.description,
            kind: "passive",
        },
    ],
};

export const graveOrc: Heritage = {
    id: "graveOrc",
    name: "Orc sépulcral",
    text: "Vous avez été exposé à de puissantes énergies nécromantiques qui auraient dû vous tuer — mais vous avez survécu. Votre peau est froide, moite et grise. Vous obtenez une résistance contre les dégâts de vide égale à la moitié de votre niveau (minimum 1). Vous obtenez aussi un bonus de circonstances de +1 aux jets de sauvegarde contre les effets ayant le trait [mort](death) ou [vide](void).",
    grants: [
        {
            kind: "resistance",
            to: "aux dégâts de vide",
            value: (c) => Math.max(1, Math.floor(c.level / 2)),
        },
        {
            kind: "passive",
            name: "Orc sépulcral",
            text: "Vous avez été exposé à de puissantes énergies nécromantiques qui auraient dû vous tuer — mais vous avez survécu. Votre peau est froide, moite et grise.  Vous bénéficiez d'un bonus de circonstances de +1 aux jets de sauvegarde contre les effets ayant le trait mort ou vide.",
        },
    ],
};

export const holdScarredOrc: Heritage = {
    id: "holdScarredOrc",
    name: "Orc scarifié",
    text: "Vous êtes un membre d'une communauté orque qui pratique un rituel de scarification ou de tatouage. Les marques de votre peau montrent votre exceptionnelle robustesse et votre vitalité. Vous obtenez 12 Points de vie de votre héritage au lieu de 10. Vous obtenez aussi le don [Dur à cuir](dieHard) .",
    grants: [
        { kind: "hp", value: 2, perLevel: false },
        { ...dieHard, kind: "passive" },
    ],
};

const rainfallText =
    "Vous êtes né dans une forêt humide avec la canopée pour seule protection contre les pluies torrentielles et les inondations brutales. Vous avez appris à vous déplacer de manière athlétique à travers la jungle et à résister aux diverses plaies communes en milieu humide. Vous obtenez un bonus de circonstances de +2 aux tests d'Athlétisme pour [Escalader](climb) ou [Nager](swim) et un bonus de circonstances de +1 aux jets de sauvegarde contre les maladies.";
export const rainfallOrc: Heritage = {
    id: "rainfallOrc",
    name: "Orc des moussons",
    text: rainfallText,
    grants: [{ kind: "passive", name: "Orc des moussons", text: rainfallText }],
};
