import { AllTraditions, Tradition, type Spell } from "./types";

export const bane: Spell = {
    id: "bane",
    name: "Imprécation",
    traits: ["aura", "concentration", "manipulation", "mental"],
    traditions: [Tradition.Divine, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Cibles** ennemis dans la zone ; **Zone** émanation de 3 m ; **Durée** 1 minute ; **Défense** Volonté.\n" +
        "Vous semez le doute dans l'esprit de vos ennemis. Les ennemis dans la zone doivent réussir un jet de Volonté ou subir une pénalité de statut de -1 à leurs jets d'attaques tant qu'ils se trouvent dans la zone. Une fois par tour, en partant du tour qui suit l'incantation d'Imprécation, vous pouvez [Maintenir](sustain) le sort pour augmenter le rayon de l'émanation de 3 mètres et obliger les ennemis dans la zone qui n'avaient pas encore été affectés à faire un autre jet de Volonté.",
};

export const bitingWords: Spell = {
    id: "bitingWords1",
    name: "Mots mordants",
    traits: [
        "audible",
        "concentration",
        "linguistique",
        "manipulation",
        "sonique",
    ],
    traditions: [Tradition.Occult],
    category: "spell1",
    actions: "two",
    attack: true,
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature ; **Durée** 1 minute ; **Défense** CA.\n" +
        "Vous entremêlez la magie à votre voix, faisant en sorte que vos railleries et moqueries blessent physiquement vos ennemis. Vous pouvez attaquer avec vos mots une fois lorsque vous terminez de lancer le sort et vous pouvez répéter l'attaque une fois à chacun de vos tours suivants en effectuant une action unique, qui possède les traits attaque, concentration et linguistique. Après un total de trois attaques, le sort prend fin.\n" +
        "Lorsque vous attaquez avec Mots mordants, faites un jet d'attaque de sort à distance contre une créature située dans un rayon de 9 mètres, lui infligeant 2d6 dégâts de son si vous la touchez (ou le double des dégâts en cas de coup critique).",
};

export const bless: Spell = {
    id: "bless",
    name: "Bénédiction",
    traits: ["aura", "concentration", "manipulation", "mental"],
    attack: true,
    traditions: [Tradition.Divine, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Cibles** vous et les alliés dans la zone ; **Zone** émanation de 4.5 m ; **Durée** 1 minute.\n" +
        "Les bienfaits de l'au-delà aident vos compagnons à frapper juste. Vous et vos alliés obtenez un bonus de statut de +1 aux jets d'attaque tant que vous êtes dans l'émanation. Une fois par round, lors des rounds suivants, vous pouvez [Maintenir](sustain) le sort pour augmenter le rayon de l'émanation de 3 mètres.",
};

export const charm: Spell = {
    id: "charm1",
    name: "Charme",
    traits: [
        "concentration",
        "émotion",
        "manipulation",
        "mental",
        "neutralisation",
        "subtil",
    ],
    traditions: [Tradition.Arcana, Tradition.Occult, Tradition.Primal],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature ; **Durée** 1 heure ; **Défense** Volonté.\n" +
        "Vos paroles sont du miel aux oreilles de votre cible et votre visage lui semble baigné d'une lueur onirique. Elle doit faire un jet de Volonté, avec un bonus de circonstances de +4 si vous ou vos alliés l'avez récemment menacée ou avez utilisé une action hostile contre elle.\n" +
        "Vous pouvez [Révoquer](dismiss) le sort. Si vous utilisez une action hostile contre la cible, le sort se termine. Quand le sort se termine, la cible ne réalise pas forcément qu'elle a été charmée (à moins que son amitié avec vous ou les actions que vous l'avez convaincue d'accomplir n'entrent en conflit avec sa nature) ce qui veut dire que vous pouvez la convaincre de continuer d'être votre amie en usant de moyens ordinaires.\n" +
        "**Réussite critique** La cible n'est pas affectée et sait que vous avez tenté de la charmer.\n" +
        "**Réussite** La cible n'est pas affectée, mais pense que votre sort était quelque chose d'inoffensif, sauf si elle l'identifie.\n" +
        "**Échec** La cible devient [amicale](friendly) envers vous. Si elle était déjà amicale, elle devient [serviable](helpful). Elle ne peut pas utiliser d'action hostile contre vous.\n" +
        "**Échec critique** La cible devient serviable à votre égard et ne peut pas utiliser d'action hostile contre vous.",
};

export const command: Spell = {
    id: "command1",
    name: "Injonction",
    traits: [
        "audible",
        "concentration",
        "linguistique",
        "manipulation",
        "mental",
    ],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature ; **Durée** jusqu'à la fin du prochain tour de la cible ; **Défense** Volonté.\n" +
        "Vous criez un ordre difficile à ignorer. Vous pouvez ordonner à la cible de s'approcher de vous, de s'enfuir, de lâcher ce qu'elle tient, de se jeter [à terre](prone) ou de ne pas bouger. Elle ne peut pas [Retarder](delay) ni utiliser de réaction tant qu'elle n'a pas obéi à votre ordre. L'effet dépend du jet de Volonté de la cible.\n" +
        "**Réussite** La créature n'est pas affectée.\n" +
        "**Échec** Pour sa première action à son prochain tour, la créature est obligée d'utiliser une action pour faire ce que vous lui avez ordonné.\n" +
        "**Échec critique** À son prochain tour, la cible doit utiliser toutes ses actions pour obéir à votre ordre.",
};

export const fear: Spell = {
    id: "fear",
    name: "Effroi",
    traits: ["concentration", "manipulation", "peur"],
    traditions: AllTraditions,
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature ; **Défense** Volonté.\n" +
        "Vous semez la terreur dans le cœur de la cible qui doit faire un jet de Volonté.\n" +
        "**Réussite critique** La cible n'est pas affectée.\n" +
        "**Réussite** La cible est [effrayée 1](frightened).\n" +
        "**Échec** La cible est effrayée 2.\n" +
        "**Échec critique** La cible est effrayée 3 et [en fuite](fleeing) pendant 1 round.",
};

export const forceBarrage: Spell = {
    id: "forceBarrage1",
    name: "Salve de force",
    traits: ["concentration", "force", "manipulation"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "one-three",
    text:
        "**Portée** 36 mètres ; **Cibles** 1 créature.\n" +
        "Vous projetez un éclat de magie solidifiée vers une créature que vous pouvez voir. Il atteint automatiquement sa cible en lui infligeant 1d4+1 dégâts de force. Pour chaque action supplémentaire que vous utilisez pour Lancer le sort, vous augmentez de 1 le nombre d'éclats que vous projetez, jusqu'à un maximum de 3 éclats pour 3 actions. Vous désignez la cible de chaque éclat. Si vous tirez plus d'un éclat sur une même cible, combinez les dégâts.",
};

export const grimTendrils: Spell = {
    id: "grimTendrils1",
    name: "Volutes sinistres",
    traits: ["concentration", "manipulation", "vide"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Zone** ligne de 9 m ; **Défense** Vigueur.\n" +
        "Des filaments de ténèbres sortent du bout de vos doigts en vrillant et traversent l'air à toute vitesse. Vous infligez 2d4 dégâts de vide et 1 dégât de saignement aux créatures vivantes sur la ligne. Chaque créature vivante dans la ligne doit tenter un jet de Vigueur.\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La créature ne subit que la moitié des dégâts de vide et aucun dégât de saignement.\n" +
        "**Échec** La créature subit la totalité des dégâts.\n" +
        "**Échec critique** La créature subit le double des dégâts de vide et des dégâts de saignement.",
};

export const illusoryObject: Spell = {
    id: "illusoryObject1",
    name: "Objet illusoire",
    traits: ["concentration", "illusion", "manipulation", "visuel"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 150 mètres ; **Zone** sphère de 6 m ; **Durée** 10 minutes.\n" +
        "Vous créez une image visuelle illusoire d'un objet immobile. La totalité de l'image doit tenir dans la zone du sort. L'objet semble s'animer naturellement mais il ne produit aucun son et ne génère aucune odeur. Par exemple, l'eau semblera se déverser d'une cascade illusoire mais elle le fera en silence.\n" +
        "Toute créature qui touche l'image ou effectue l'action [Chercher](seek) pour l'examiner peut tenter de percer l'illusion.",
};

export const phantasmalMinion: Spell = {
    id: "phantasmalMinion1",
    name: "Sbire fantasmagorique",
    traits: ["concentration", "convocation", "manipulation"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "three",
    text:
        "**Portée** 18 mètres.\n" +
        "Vous convoquez un Sbire fantasmagorique. Le sbire possède la forme approximative d'un humanoïde. Vous pouvez choisir de le rendre invisible ou de lui donner une apparence éthérée, mais il s'agit visiblement d'un effet magique, pas d'une créature réelle.",
};

export const protection: Spell = {
    id: "protection1",
    name: "Protection",
    traits: ["concentration", "manipulation"],
    traditions: [Tradition.Divine, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** contact ; **Cibles** 1 créature consentante ; **Durée** 1 minute.\n" +
        "Vous protégez une créature des blessures. La cible obtient un bonus de statut de +1 à la Classe d'armure et aux jets de sauvegarde.",
};

export const sleep: Spell = {
    id: "sleep1",
    name: "Sommeil",
    traits: [
        "concentration",
        "manipulation",
        "mental",
        "neutralisation",
        "sommeil",
    ],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Zone** sphère de 1.5 m ; **Défense** Volonté.\n" +
        "Chaque créature dans la zone devient somnolente, pouvant éventuellement s'assoupir. Une créature qui devient [inconsciente](unconscious) à cause de ce sort ne tombe pas [à terre](prone) ni ne relâche ce qu'elle tient. Ce sort n'empêche pas les créatures de se réveiller grâce à un test de Perception réussi, ce qui limite son utilité en combat.\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La cible subit une pénalité de -1 à ses tests de Perception pendant 1 round.\n" +
        "**Échec** La créature devient inconsciente. Si elle est toujours inconsciente après 1 minute, elle se réveille automatiquement.\n" +
        "**Échec critique** La créature devient inconsciente. Si elle est toujours inconsciente après 1 heure, elle se réveille automatiquement.",
};

export const soothe: Spell = {
    id: "soothe1",
    name: "Apaisement",
    traits: ["concentration", "émotion", "guérison", "manipulation"],
    traditions: [Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature consentante ; **Durée** 1 minute.\n" +
        "Vous embellissez l'esprit de la cible, renforçant ses défenses mentales et soignant ses blessures. La cible regagne 1d10+4 Points de vie quand vous Lancez le sort et obtient un bonus de statut de +2 aux jets de sauvegarde contre les effets mentaux pendant la durée du sort.",
};

export const summonAnimal: Spell = {
    id: "summonAnimal1",
    name: "Convocation d'animal",
    traits: ["concentration", "manipulation", "convocation"],
    traditions: [Tradition.Arcana, Tradition.Primal],
    category: "spell1",
    actions: "three",
    text: "Vous convoquez une créature qui possède le trait animal et dont le niveau est de -1 qui combat pour vous.",
};

export const sureStrike: Spell = {
    id: "sureStrike",
    name: "Coup assuré",
    traits: ["concentration", "fortune"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "one",
    text:
        "**Durée** jusqu'à la fin de votre tour.\n" +
        "Un aperçu de l'avenir vous assure que votre prochain coup frappera juste. La prochaine fois que vous effectuez un jet d'attaque avant la fin de votre tour, lancez l'attaque deux fois et utilisez le meilleur résultat. L'attaque ignore les pénalités de circonstances au jet d'attaque et vous n'avez pas besoin d'effectuer le test nu si la cible est [masquée](concealed) ou [cachée](hidden). Vous êtes temporairement immunisé à Coup assuré pendant 10 minutes.",
};
