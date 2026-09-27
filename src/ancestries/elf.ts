import { Attribute } from "../rules/attributes";
import { weapons } from "../items/weapons";
import { arcana, nature } from "../rules/skills";
import { detectMagic } from "../spells/cantrips";
import { spellToModifier } from "../spells/types";
import { Size, type Ancestry, type Heritage } from "./types";

const aquatic: Heritage = {
    id: "aquatic",
    name: "Elfe aquatique",
    text: "Vous êtes un elfe aquatique qui passe la majeure partie de sa vie sous l'eau. Vous avez la capacité de respirer aussi bien l'air que l'eau, mais vous ne pouvez pas vivre indéfiniment à la surface. Vous êtes amphibie et possédez une vitesse de nage de 9 mètres. Au moins une fois par semaine, vous devez prendre une période de repos de 8 heures sous l'eau. Si vous ne le faites pas, vous devenez fatigué et ne pouvez pas récupérer de cet état tant que vous ne vous êtes pas reposé sous l'eau.",
    grants: [
        // TODO: amphibious trait
        { kind: "speed", environment: "swim", value: 6 },
    ],
};

const seer: Heritage = {
    id: "seer",
    name: "Elfe visionnaire",
    text:
        "Vous avez le pouvoir inné de détecter et comprendre les phénomènes magiques. Vous pouvez lancer le tour de magie Détection de la magie comme un sort inné arcanique à volonté.\n" +
        "En outre, vous obtenez un bonus de circonstances de +1 à vos tests pour Identifier la magie et Déchiffrer un texte de nature magique. Ces actions utilisent généralement les compétences Arcanes, Nature, Occultisme ou Religion.",
    grants: [
        spellToModifier(detectMagic),
        {
            kind: "passive",
            name: "Elfe visionnaire",
            text: "Vous avez le pouvoir inné de détecter et comprendre les phénomènes magiques. Vous obtenez un bonus de circonstances de +1 à vos tests pour Identifier la magie et Déchiffrer un texte de nature magique. Ces actions utilisent généralement les compétences Arcanes, Nature, Occultisme ou Religion.",
        },
    ],
};

const whisperText =
    "Vous avez l'ouïe fine, capable de détecter même les plus légers chuchotements. Vous obtenez un bonus de circonstances de +2 lorsque vous utilisez votre ouïe en utilisant l'action Chercher pour trouver des créatures [Cachées](hidden) ou [Non détectées](undetected) qui se trouvent à moins de 9 mètres de vous.\n" +
    "Lorsque vous ciblez un adversaire qui vous est [Masqué](concealed) ou [Caché](hidden), vous réduisez le DD du test nu à 3 si la cible est Masquée et à 9 si la cible est Cachée. Cet avantage ne s'applique pas si vous ne pouvez entendre ou si la créature est incapable de produire un son (par exemple, si elle est affectée par un sort de Silence).";
const whisper: Heritage = {
    id: "whisper",
    name: "Elfe des murmures",
    text: whisperText,
    grants: [{ kind: "passive", name: "Elfe des murmures", text: whisperText }],
};

const woodlandText =
    "Vous vous êtes adapté à la vie dans la forêt, la jungle profonde ou tout autre environnement similaire et vous savez comment grimper aux arbres et utiliser le feuillage à votre avantage. Quand vous [Escaladez](climb) les arbres, les lianes ou dans les frondaisons, vous vous déplacez à la moitié de votre Vitesse en cas de succès et à votre Vitesse en cas de succès critique (ou si vous possédez le don Escalade rapide en cas de succès). Cela ne vous affecte pas si vous utilisez une Vitesse d'escalade.\n" +
    "Vous pouvez toujours utiliser l'action [Se mettre à l'abri](takeCover) quand vous vous trouvez sur un terrain forestier pour obtenir un abri, même si vous ne vous trouvez pas près d'un obstacle derrière lequel vous Mettre à l'abri.";
const woodland: Heritage = {
    id: "woodland",
    name: "Elfe des bois",
    text: woodlandText,
    grants: [{ kind: "passive", name: "Elfe des bois", text: woodlandText }],
};

export const elf: Ancestry = {
    id: "elf",
    img: "./ancestries/elf.png",
    name: "Elfe",
    summary:
        "Les Elfes sont un peuple de grande taille et à la longue espérance de vie, doté d'une forte tradition artistique et magique.\n" +
        "Si vous voulez incarner un personnage magique, mystique et mystérieux, vous devriez jouer un elfe.",
    ref: "https://pf2e.pathfinder-fr.org/ancestries?name=Elfe",
    hp: 6,
    size: Size.Medium,
    speeds: { land: 6 },
    skills: [arcana, nature],
    attributes: {
        boosts: [Attribute.Dexterity, Attribute.Intelligence, "Libre"],
        flaw: Attribute.Constitution,
    },
    heritages: [
        // TODO: ancient elf
        aquatic,
        // TODO: arctic elf
        // TODO: cavern elf
        // TODO: desert elf
        seer,
        whisper,
        woodland,
    ],
    familiarity: [
        // TODO: bows
        weapons.dawnsilverTree,
        weapons.elvenBranchedSpear,
        weapons.elvenCurveBlade,
        weapons.rapier,
    ],
    grants: [{ kind: "sense", name: "Vision en basse lumière" }],
};
