import { Rarity } from "../items/utils";
import type { Spell } from "./types";

export const ashenWind: Spell = {
    id: "ashenWind",
    combat: true,
    name: "Vent cendré",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "focalisation", "manipulation", "oracle"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Portée** 36 mètres ; **Zone** une sphère de 3 mètres de rayon ; **Défense** Vigueur.\n" +
        "Vous invoquez un tourbillon de cendres qui balaie la zone. Chaque créature présente dans la zone doit tenter un jet de Vigueur sous peine de voir ses poumons envahis par des cendres étouffantes.\n" +
        "**Réussite** La créature n'est pas affectée.\n" +
        "**Échec** La créature est [nauséeuse 1](sickened).\n" +
        "**Échec critique** La créature est [nauséeuse 2](sickened).",
};

export const athleticRush: Spell = {
    id: "athleticRush",
    name: "Précipitation athlétique",
    rarity: Rarity.Uncommon,
    traits: ["manipulation"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Durée** 1 tour.\n" +
        "Votre corps s'emplit de puissance physique. Vous bénéficiez d'un bonus de statut de +3 mètres à votre Vitesse et d'un bonus de statut de +2 aux tests d'Athlétisme. En lançant ce sort, vous pouvez effectuer une action de Déplacement, de Bond, d'Escalade ou de Nage. Les bonus du sort s'appliquent à cette action.",
};

export const brainDrain: Spell = {
    id: "brainDrain",
    combat: true,
    name: "Drain cérébral",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "manipulation", "mental", "oracle"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature ; **Défense** Volonté (basique).\n" +
        "Vous sondez l'esprit de la cible pour en extraire des connaissances. Vous lui infligez 1d8 dégâts mentaux, avec un jet de Volonté basique.\n" +
        "Si la cible échoue à son jet de sauvegarde, vous passez en revue les souvenirs dérobés afin de tenter un unique test pour [Vous souvenir d'informations](recallKnowledge). Choisissez une compétence permettant d'effectuer cette action et utilisez le modificateur de compétence de la cible pour ce test.",
};

export const callToArms: Spell = {
    id: "callToArms",
    combat: true,
    name: "Appel aux armes",
    rarity: Rarity.Uncommon,
    traits: ["audible", "émotion", "mental", "oracle"],
    category: "oracle" as any,
    actions: "reaction",
    text:
        "**Déclencheur** Vous êtes sur le point de lancer un jet d'initiative.\n" +
        "**Zone** Émanation de 6 mètres ; **Durée** 1 minute.\n" +
        "Vous lancez un appel aux armes, incitant vos alliés à se jeter dans la mêlée. Chaque allié dans la zone bénéficie d'un bonus de statut de +2 à son jet d'initiative et gagne {{ceil(level/2)}} point(s) de vie temporaire(s) ; ces points de vie temporaires durent pendant toute la durée du sort.",
};

export const cinderGaze: Spell = {
    id: "cinderGaze",
    name: "Regard de braise",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "manipulation", "oracle", "prédiction"],
    category: "oracle" as any,
    text:
        "**Incantation** 1 minute.\n" +
        "Vous avez appris à lire l'avenir dans les formes que dessinent les flammes et la fumée. Bien qu'imprécises et souvent symboliques, ces lectures vous aident à vous préparer aux événements à venir. Pour lancer ce sort, vous devez vous trouver à proximité d'un feu (quelle que soit sa taille) pendant toute la durée de l'incantation. Une fois le sort lancé, lancez 1d4 pour déterminer votre prédiction. L'effet jusqu'à ce qu'il soit consommé ou que vous [Vous Recentriez](refocus). Vous ne pouvez bénéficier que de l'effet d'un seul Regard de braise à la fois.\n" +
        "**1. Danger imminent** Vous bénéficiez d'un bonus de statut de +2 à votre prochain jet d'initiative.\n" +
        "**2. Vie nouvelle** La prochaine fois que vous subissez des dégâts, vous gagnez {{4+2*ceil(level/2)}} points de vie temporaires juste avant de les encaisser.\n" +
        "**3. Intuition vive (chance)** La prochaine fois que vous tentez un test pour [Vous rappeler](recallKnowledge) des informations, lancez le dé deux fois et conservez le meilleur résultat.\n" +
        "**4. Bonne fortune (chance)** La prochaine fois que vous effectuez un jet de sauvegarde, lancez le dé deux fois et conservez le meilleur résultat.",
};

export const cloakOfShadow: Spell = {
    id: "cloakOfShadow",
    name: "Cape d'ombre",
    rarity: Rarity.Uncommon,
    traits: ["aura", "ténèbres", "manipulation", "ombre", "oracle"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** contact ; **Cible** 1 créature consentante ; **Durée** 1 minute.\n" +
        "Vous enveloppez la cible d'un manteau d'ombres tourbillonnantes qui la rendent plus difficile à voir. La cape réduit la lumière vive dans une émanation de 6 mètres autour de la cible à une lumière faible.\n" +
        "La cible peut utiliser l'état [dissimulé](concealed) obtenu grâce aux ombres pour [Se Cacher](hide), bien que les créatures attentives puissent toujours suivre l'aura d'ombre en mouvement, ce qui rend difficile pour la cible de devenir complètement [non détectée](undetected). La cible peut [Interagir](interact) pour retirer la cape et la laisser derrière elle comme leurre. Si quelqu'un ramasse la cape après que la cible initiale l'a retirée, elle s'évapore et le sort prend fin.",
};

export const counterPerformance: Spell = {
    id: "counterPerformance",
    name: "Contre-représentation",
    rarity: Rarity.Uncommon,
    traits: [
        "composition",
        "concentration",
        "focalisation",
        "chance",
        "manipulation",
        "mental",
    ],
    category: "focus",
    actions: "reaction",
    text:
        "**Zone** émanation de 18 m.\n" +
        "**Déclencheur** Vous ou un allié dans les 18 mètres lancez un jet de sauvegarde contre un effet audible ou visuel.\n" +
        "Votre représentation vous protège vous et vos alliés. Effectuez un test de Représentation d'un type correspondant au déclencheur. Vous et vos alliés dans la zone pouvez utiliser le meilleur résultat entre votre test de Représentation et leur jet de sauvegarde.",
};

export const deathsCall: Spell = {
    id: "deathsCall",
    combat: true,
    name: "Appel de la mort",
    rarity: Rarity.Uncommon,
    traits: ["concetration", "focalisation", "oracle"],
    category: "oracle" as any,
    actions: "reaction",
    text:
        "**Déclencheur** Une créature vivante à portée meurt, ou une créature morte-vivante à portée est détruite.\n" +
        "**Portée** 9 mètres.\n" +
        "Voir un autre être quitter ce monde vous revigore. Vous gagnez {{level + 4}} points de vie temporaires pendant 1 minute. Si la créature déclencheuse était une morte-vivante, doublez le nombre de points de vie temporaires gagnés.",
};

export const healersBlessing: Spell = {
    id: "healersBlessing",
    combat: true,
    name: "Bénédiction du guérisseur",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "oracle"],
    traditions: [],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature vivante consentante ; **Durée** 1 minute.\n" +
        "Vos paroles bénissent une créature en renforçant son lien avec l'énergie vitale. Lorsque la cible récupère des points de vie grâce à un sort de vitalité, elle récupère {{2*ceil(level/2)}} points de vie supplémentaires. Un sort qui soigne la créature à plusieurs reprises pendant une certaine durée ne lui rend des points de vie supplémentaires que lors du premier soin.",
};

export const incendiaryAura1: Spell = {
    id: "incendiaryAura1",
    combat: true,
    name: "Aura incendiaire",
    rarity: Rarity.Uncommon,
    traits: ["aura", "concentration", "feu", "manipulation", "oracle"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Zone** une émanation de 3 mètres ; **Durée** 1 minute.\n" +
        "Vous vous entourez d'une aura inflammable. Chaque fois qu'une créature située dans l'émanation subit des dégâts de feu, elle prend feu et subit {{1+ceil(level/4)}}d4 dégâts de feu persistants.",
};

export const lifeLink: Spell = {
    id: "lifeLink",
    combat: true,
    name: "Lien vital",
    rarity: Rarity.Uncommon,
    traits: ["focalisation", "guérison", "manipulation", "oracle", "vitalité"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature autre que vous ; **Durée** 1 minute.\n" +
        "Vous établissez un lien d'énergie vitale entre vous et votre cible, répartissant les blessures entre vous deux. Lorsque vous lancez ce sort pour la première fois, la cible récupère {{ceil(level/2)}}d4 points de vie. La première fois à chaque round que la cible subit des dégâts, 3 de ces dégâts sont redirigés vers vous, sans possibilité d'être réduits.\n" +
        "Le sort prend immédiatement fin si vous tombez [inconscient](unconscious). Vous pouvez [Révoquer](dismiss) ce sort.",
};

export const pushingGust: Spell = {
    id: "pushingGust",
    combat: true,
    name: "Rafale repoussante",
    rarity: Rarity.Uncommon,
    traits: ["air", "concentration", "manipulation", "oracle"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Portée** 150 mètres ; **Cible** 1 créature ; **Défense** Vigueur.\n" +
        "Vous donnez une impulsion à l'air et frappez la cible d'une puissante rafale de vent. Elle doit tenter un jet de sauvegarde de Vigueur.\n" +
        "**Succès critique** La cible n'est pas affectée.\n" +
        "**Succès** La cible est repoussée de 1,5 mètre dans la direction opposée à vous.\n" +
        "**Échec** La cible est repoussée de 3 mètres dans la direction opposée à vous.\n" +
        "**Échec critique** La cible est repoussée de 3 mètres dans la direction opposée à vous et tombe [à terre](prone).",
};

export const readFate: Spell = {
    id: "readFate",
    name: "Lecture du destin",
    traits: ["concentration", "manipulation", "oracle", "prédiction"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature autre que vous.\n" +
        "Vous tentez d'en apprendre davantage sur le destin à court terme de la cible, généralement au cours du prochain jour pour la plupart des créatures ordinaires, ou de la prochaine heure, voire moins, pour une personne susceptible de vivre plusieurs événements rapidement, comme un aventurier en pleine exploration.\n" +
        "Vous apprenez un unique mot énigmatique lié au destin de la créature pendant cette période. Le destin est notoirement impénétrable, et ce mot ne doit pas nécessairement être pris au pied de la lettre ; son sens n'apparaît souvent qu'avec le recul. Le MJ effectue secrètement un test nu DD 6. Si le destin de la créature est trop incertain ou si le test nu échoue, le sort révèle le mot « indéterminé ». Dans tous les cas, la créature devient temporairement immunisée pendant 24 heures.",
};

export const scholarlyRecollection: Spell = {
    id: "scholarlyRecollection",
    name: "Réminiscence érudite",
    rarity: Rarity.Uncommon,
    traits: ["chance", "oracle"],
    category: "oracle" as any,
    actions: "reaction",
    text:
        "**Déclencheur** Vous effectuez un test de Perception pour [Chercher](seek), ou un test de compétence pour [Vous souvenir d'informations](recallKnowledge).\n" +
        "En prononçant une courte prière tandis que vous rassemblez vos pensées, vous recevez une bénédiction qui vous guide dans la bonne direction. Le MJ lance deux fois le test déclencheur et conserve le meilleur résultat.",
};

export const sprayOfStars: Spell = {
    id: "sprayOfStars",
    combat: true,
    name: "Pluie d'étoiles",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "feu", "lumière", "manipulation", "oracle"],
    category: "oracle" as any,
    actions: "two",
    text:
        "**Zone** un cône de 4,5 mètres ; **Défense** Réflexes.\n" +
        "Vous projetez une gerbe de petites étoiles filantes, infligeant {{1+ceil(level/2)}}d4 dégâts de feu. Chaque créature dans la zone doit tenter un jet de Réflexes.\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La créature subit la moitié des dégâts et est [éblouie](dazzled) pendant 1 round.\n" +
        "**Échec** La créature subit la totalité des dégâts et est [éblouie](dazzled) pendant 3 rounds.\n" +
        "**Échec critique** La créature subit le double des dégâts et est [éblouie](dazzled) pendant 1 minute.",
};

export const soulSiphon: Spell = {
    id: "soulSiphon",
    combat: true,
    name: "Siphon de vie",
    rarity: Rarity.Uncommon,
    traits: ["focalisation", "manipulation", "oracle", "vide"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature vivante ; **Défense** Vigueur.\n" +
        "Vous aspirez une partie de l'énergie vitale de la cible pour renforcer votre propre vitalité. La cible doit réussir un jet de Vigueur sous peine de subir 1d4 dégâts de vide. Vous gagnez des points de vie temporaires égaux au total des points de vie perdus par la cible, y compris ceux perdus en raison de l'état [épuisé](drained).\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La créature subit la moitié des dégâts.\n" +
        "**Échec** La créature subit la totalité des dégâts et devient [épuisée 1](drained).\n" +
        "**Échec critique** La créature subit le double des dégâts et devient [épuisée 2](drained).",
};

export const tempestTouch: Spell = {
    id: "tempestTouch",
    combat: true,
    name: "Toucher de la tempête",
    rarity: Rarity.Uncommon,
    traits: ["froid", "manipulation", "oracle", "eau"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** contact ; **Cible** 1 créature ; **Défense** Vigueur.\n" +
        "Votre toucher invoque une masse d'eau glacée tourbillonnante qui s'accroche à votre cible, lui infligeant {{ceil(level/2)}}d4 dégâts contondants et {{ceil(level/2)}}d4 dégâts de froid. La cible doit tenter un jet de sauvegarde de Vigueur.\n" +
        "**Succès critique** La cible n'est pas affectée.\n" +
        "**Succès** La cible subit la moitié des dégâts et un malus de circonstances de –1,5 mètre à toutes ses Vitesses jusqu'à la fin de votre prochain tour.\n" +
        "**Échec** La cible subit tous les dégâts et un malus de circonstances de –3 mètres à toutes ses Vitesses jusqu'à la fin de votre prochain tour.\n" +
        "**Échec critique** Comme en cas d'échec, mais la cible subit le double des dégâts.",
};

export const temporalDistortion: Spell = {
    id: "temporalDistortion",
    combat: true,
    name: "Distorsion temporelle",
    rarity: Rarity.Uncommon,
    traits: ["concentration", "oracle"],
    category: "oracle" as any,
    actions: "one",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature ; **Défense** Volonté.\n" +
        "Vous partagez avec un adversaire une partie de vos propres distorsions temporelles, altérant son esprit et son corps de manière imprévisible tandis qu'il est projeté en arrière ou en avant dans le temps. Lancez 1d4. Sur un 1, la cible devient [maladroite 1](clumsy) ; sur un 2, elle devient [affaiblie 1](enfeebled) ; sur un 3, elle devient [stupéfiée 1](stupefied) ; sur un 4, vous choisissez l'un des résultats précédents.\n" +
        "**Réussite critique** La cible n'est pas affectée.\n" +
        "**Réussite** La cible est affectée pendant 1 tour.\n" +
        "**Échec** La cible est affectée pendant 4 tours.\n" +
        "**Échec critique** Comme en cas d'échec, mais la distorsion temporelle est plus puissante : l'intensité de la condition est de 3, mais sa durée est réduite à 2 tours.",
};
