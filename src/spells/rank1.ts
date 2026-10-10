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

export const dizzyingColors: Spell = {
    id: "dizzyingColors",
    combat: true,
    name: "Couleurs vertigineuses",
    traits: [
        "concentration",
        "illusion",
        "mise hors de combat",
        "manipulation",
        "visuel",
    ],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Zone** un cône de 4,5 m ; **Durée** variable ; **Défense** Volonté.\n" +
        "Vous libérez une multitude de couleurs tourbillonnantes qui submergent les créatures selon leur jet de Volonté.\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La créature est [éblouie](dazzled) pendant 1 round.\n" +
        "**Échec** La créature est [étourdie 1](stunned), [aveuglée](blinded) pendant 1 round et [éblouie] pendant 1 minute.\n" +
        "**Échec critique** La créature est étourdie 1 pendant 1 round et aveuglée pendant 1 minute.",
};

export const domeOfTranquility1: Spell = {
    id: "domeOfTranquility1",
    name: "Dôme de quiétude",
    traits: ["air", "concentration", "manipulation"],
    traditions: [Tradition.Arcana, Tradition.Occult, Tradition.Primal],
    category: "spell1",
    text:
        "**Incantation** 1 minute ; **Portée** 9 mètres ; **Zone** une sphère de 9 mètres ; **Durée** 1 heure.\n" +
        "L'air autour de vous s'immobilise et étouffe les bruits du monde extérieur. Si vous percevez distinctement tout ce qui se trouve à l'intérieur de ce dôme isolé, vous n'entendez rien de ce qui se passe au-dehors. L'inverse est également vrai : personne à l'extérieur du dôme ne peut entendre ce qui s'y déroule. Ce dôme ne bloque pas la ligne de vue. Si un objet ou une créature d'encombrement supérieur à 1 le traverse, le dôme se dissipe automatiquement. Vous pouvez [Révoquer](dismiss) ce sort.",
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

export const fishingSpot: Spell = {
    id: "fishingSpot",
    name: "Coin pêche",
    traits: ["concentration", "manipulation"],
    traditions: AllTraditions,
    category: "spell1",
    text:
        "**Incantation** 10 minutes.\n" +
        "Vous faites apparaître une canne à pêche ainsi qu'une étendue d'eau extraplanaire grouillant de poissons. Après 10 minutes de pêche, vous attrapez un poisson magique ; lancez 1d8 pour déterminer quel poisson vous avez pêché et quels effets vous obtiendrez en le consommant une fois cuit. Le poisson doit être cuit et consommé dans l'heure suivant sa capture, et l'effet indiqué dure 1 heure après sa consommation. Chaque poisson ne peut nourrir qu'une seule créature.\n" +
        "**Truite mélodieuse** : bonus de statut de +2 aux tests de Représentation.\n" +
        "**Bar primordial** : bonus de statut de +2 aux tests de Survie.\n" +
        "**Poisson-goule** : bonus de statut de +2 aux tests d'Intimidation.\n" +
        "**Barbeau bouillonnant** : bonus de statut de +2 aux tests de Tromperie et de Diplomatie.\n" +
        "**Vandoise fringante** : bonus de statut de +2 aux tests d'Acrobaties.\n" +
        "**Vigocarpe** : bonus de statut de +2 aux tests d'Athlétisme pour Escalader et Nager.\n" +
        "**Perche agressive** : bonus de statut de +2 aux tests d'Athlétisme pour Désarmer, Agripper, Repositionner, Bousculer et faire un Croc-en-jambes.\n" +
        "**Saumon érudit** : bonus de statut de +2 aux tests pour Se remémorer des connaissances",
};

export const forceBarrage: Spell = {
    id: "forceBarrage1",
    combat: true,
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

export const illusoryDisguise1: Spell = {
    id: "illusoryDisguise1",
    name: "Déguisement illusoire",
    traits: ["concentration", "illusion", "manipulation", "visuel"],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cible** 1 créature consentante ; **Durée** 1 heure.\n" +
        "Vous créez une illusion qui permet à la cible de prendre l'apparence d'une créature dont la forme du corps est identique et dont la taille et le poids sont à peu près équivalents aux vôtres. Le déguisement est généralement assez bon pour dissimuler son identité mais pas assez pour se faire passer pour une personne en particulier. Le sort change son apparence et sa voix, mais pas ses manières. Vous pouvez changer l'apparence de ses vêtements et des objets portés, comme faire en sorte que son armure ressemble à une robe. Les objets tenus en main ne sont pas affectés et tout objet porté qui n'est plus sur la créature reprend sa véritable apparence.\n" +
        "Déguisement illusoire vous permet de considérer que vous portez un déguisement lorsque vous utilisez l'action [Se faire passer pour](impersonate). La cible ignore les pénalités de circonstances appliquées en se déguisant en une créature dissemblable, confère un bonus de statut de +4 au DD pour empêcher autrui de percer votre déguisement, et permet à la cible d'ajouter son niveau à de tels tests de Duperie même si elle est inexpérimentée. Vous pouvez [Révoquer](dismiss) ce sort.",
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

export const objectReading1: Spell = {
    id: "objectReading1",
    name: "Lecture d'objet",
    traits: ["concentration", "manipulation"],
    traditions: [Tradition.Occult],
    category: "spell1",
    actions: "two",
    text:
        "**Portée** contact ; **Cible** 1 objet.\n" +
        "Vous placez une main sur un objet pour apprendre des informations sur un évènement émotionnel qui s'est produit impliquant l'objet au cours de la semaine passée, déterminé par le MJ. Si vous lancez Lecture d'objet sur le même objet à plusieurs reprises, vous pouvez soit vous concentrer sur un unique évènement pour obtenir des informations supplémentaires à propos de cet évènement, soit obtenir d'autres informations sur un autre évènement émotionnel qui s'est produit durant le laps de temps applicable.",
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

export const schadenfreude: Spell = {
    id: "schadenfreude",
    combat: true,
    name: "Joie malsaine",
    traits: ["concentration", "émotion", "mental"],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "spell1",
    actions: "reaction",
    text:
        "**Déclencheur** Vous obtenez un échec critique contre l'effet d'un ennemi.\n" +
        "**Portée** 9 mètres ; **Cible** l'ennemi déclencheur ; **Défense** Volonté.\n" +
        "Le sentiment de plaisir malsain éprouvé par votre ennemi lorsque vous échouez de manière catastrophique le distrait. Il doit tenter un jet de Volonté.\n" +
        "**Réussite critique** La créature n'est pas affectée.\n" +
        "**Réussite** La créature est distraite par son amusement et subit une pénalité de statut de -1 à sa Perception et sa Volonté pendant 1 round.\n" +
        "**Échec** La créature est dominée par son amusement et est [stupéfiée 1](stupefied) pendant 1 tour.\n" +
        "**Échec critique** La créature est perdue dans son amusement et est [stupéfiée 2](stupefied) pendant 1 tour et [étourdie 1](stunned).",
};

export const seashellOfStolenSound: Spell = {
    id: "seashellOfStolenSound",
    name: "Coquillage du son volé",
    traits: ["concentration", "manipulation", "sonore"],
    traditions: [Tradition.Arcana, Tradition.Occult, Tradition.Primal],
    category: "spell1",
    actions: "reaction",
    text:
        "**Déclencheur** Une créature à portée commence à émettre un son.\n" +
        "**Portée** 9 mètres ; **Durée** jusqu'à vos prochains préparatifs quotidiens.\n" +
        "Vous enregistrez un son dans un coquillage pour l'utiliser à votre guise : les derniers mots d'un être cher, le rugissement puissant d'un dragon, une conversation compromettante entre deux diplomates influents, ou même quelque chose de plus étrange et secret. Pour lancer ce sort, vous devez présenter un coquillage intact. Lorsque vous lancez le sort, de la magie tourbillonne autour de la créature déclencheuse ; elle copie les sons émis par celle-ci, ainsi que les bruits ambiants, pendant la minute qui suit, et les stocke dans le coquillage.\n" +
        "Vous ou une autre créature pouvez ensuite diffuser le son contenu dans le coquillage pendant la durée du sort en interagissant avec celui-ci ; toutefois, une fois le son diffusé, le coquillage vole en éclats et le sort prend fin.\n" +
        "Lors de vos prochains préparatifs quotidiens, vous pourrez choisir de consommer un emplacement de sort pour prolonger d'une journée supplémentaire la durée de vie d'un tel coquillage.\n" +
        "Bien que le sort reproduise fidèlement les sons entourant la cible, il ne restitue aucun effet auditif ou sonore particulier associé à ces sons.",
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
