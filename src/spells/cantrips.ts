import { Rarity } from "../items/utils";
import { AllTraditions, Tradition, type Spell } from "./types";

export const courageousAnthem: Spell = {
    id: "courageousAnthem",
    name: "Hymne du courage",
    traits: ["composition", "tour de magie", "concentration", "émotion"],
    rarity: Rarity.Uncommon,
    category: "cantrip",
    actions: "one",
    text:
        "**Zone** émanation de 18 m ; **Durée** 1 round.\n" +
        "Vous inspirez vos alliés et vous-même par des discours ou des airs d'encouragement. Vous et tous vos alliés dans la zone obtenez un bonus de statut de +1 aux jets d'attaque, aux jets de dégâts et aux jets de sauvegarde contre les effets de terreur.",
};

export const daze: Spell = {
    id: "daze",
    name: "Hébétement",
    traits: [
        "concentration",
        "manipulation",
        "mental",
        "non-létal",
        "tour de magie",
    ],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    dc: true,
    text:
        "**Portée** 18 mètres ; **Cibles** 1 créature ; **Défense** Volonté basique.\n" +
        "Vous obscurcissez l'esprit de la cible et l'hébétez d'une décharge mentale. La décharge inflige {{ceil(level/4)}}d6 dégâts mentaux, avec un jet de Volonté basique. En cas d'échec critique, la cible est également [étourdie 1](stunned).",
};

export const detectMagic: Spell = {
    id: "detectMagic",
    name: "Détection de la magie",
    traits: ["concentration", "détection", "manipulation", "tour de magie"],
    traditions: AllTraditions,
    category: "cantrip",
    actions: "two",
    text:
        "**Zone** émanation de 9 m.\n" +
        "Vous envoyez une pulsation qui enregistre la présence de magie. Vous ne recevez aucune information au-delà de la présence ou de l'absence de magie. Vous pouvez choisir d'ignorer la magie dont vous avez déjà pleinement conscience, tels que les objets magiques et les sorts actifs appartenant à vos alliés et vous.\n" +
        "Vous ne détectez la magie d'illusion que si cet effet de magie possède un rang inférieur au rang de votre sort de Détection de la magie. Quoi qu'il en soit, les objets qui possèdent une aura d'illusion mais qui n'ont pas une apparence trompeuse (telle qu'une Potion d'invisibilité) se détectent comme à l'ordinaire.",
};

export const figment: Spell = {
    id: "figment",
    name: "Fantasme",
    traits: [
        "concentration",
        "illusion",
        "manipulation",
        "subtil",
        "tour de magie",
    ],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Portée** 9 mètres.\n" +
        "Vous créez un son ou une vision illusoire basique. Un son ajoute le trait audible au sort et le son ne peut pas inclure ni mots intelligibles ni musique élaborée. Une vision ajoute le trait visuel, ne peut pas être plus grande qu'un cube d'un mètre cinquante de côté et est clairement brute et dépourvue de détails si elle est vue à moins de 4,50 mètres. Lorsque vous [Lancez](castASpell) ou [Maintenez](sustain) le sort, vous pouvez tenter de [Faire diversion](createADiversion) avec l'illusion, en bénéficiant d'un bonus de circonstances de +2 sur votre test de Duperie. Si la tentative échoue contre une créature, celle-ci perce le Fantasme.",
};

export const forbiddingWard: Spell = {
    id: "forbiddingWard",
    name: "Sceau d'interdiction",
    traits: ["concentration", "manipulation", "tour de magie"],
    traditions: [Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 allié et 1 ennemi ; **Durée** Maintenu jusqu'à 1 minute.\n" +
        "Vous protégez un allié contre les attaques et les sorts hostiles de la cible ennemie.\n" +
        "La cible alliée obtient un bonus de statut de +1 à la CA et aux jets de sauvegarde contre les attaques, les sorts et autres effets de la cible ennemie.",
};

export const guidance: Spell = {
    id: "guidance",
    name: "Assistance",
    traits: ["concentration", "tour de magie"],
    traditions: [Tradition.Divine, Tradition.Occult, Tradition.Primal],
    category: "cantrip",
    actions: "one",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature ; **Durée** 1 tour.\n" +
        "Vous sollicitez une assistance d'entités surnaturelles, ce qui confère à la cible un bonus de statut de +1 à un jet d'attaque, un test de Perception, un jet de sauvegarde ou un test de compétence effectué avant la fin de la durée du sort.\n" +
        "La cible choisit sur quel jet elle souhaite appliquer le bonus avant de lancer le dé. Le sort se termine si la cible utilise le bonus. Qu'elle l'utilise ou non, la cible y est ensuite temporairement immunisée pendant une heure.",
};

export const hauntingHymn: Spell = {
    id: "hauntingHymn",
    name: "Hymne obsédant",
    traits: [
        "audible",
        "concentration",
        "manipulation",
        "sonique",
        "tour de magie",
    ],
    traditions: [Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Zone** cône de 4.5 m ; **Défense** Vigueur basique.\n" +
        "Vous faites résonner un hymne assourdissant que seules les créatures de la zone peuvent entendre. L'hymne inflige {{ceil(level/4)}}d8 dégâts sonores, avec un jet de Vigueur basique. Si une cible obtient un échec critique, elle est également Sourde pendant 1 minute.",
};

export const light: Spell = {
    id: "light",
    name: "Lumière",
    traits: ["concentration", "lumière", "manipulation", "tour de magie"],
    traditions: AllTraditions,
    category: "cantrip",
    actions: "two",
    text:
        "**Portée** 36 mètres ; **Durée** jusqu'à vos prochains préparatifs quotidiens.\n" +
        "Vous créez un orbe de lumière qui diffuse une lumière vive dans un rayon de 6 mètres (et une lumière faible dans les 6 mètres suivants) de la couleur de votre choix. Si vous créez la lumière dans le même espace qu'une créature consentante, vous pouvez attacher la lumière à la créature, la faisant flotter près d'elle lorsqu'elle se déplace. Vous pouvez [Maintenir](sustain) le sort pour déplacer la lumière jusqu'à 18 mètres. Vous pouvez l'attacher ou la détacher d'une créature dans le cadre de ce déplacement.\n" +
        "Vous pouvez [Révoquer](dismiss) le sort. Si vous Lancez le sort alors que vous avez déjà quatre sorts de Lumière actifs, vous devez choisir de mettre fin à un des sorts existants .",
};

export const message: Spell = {
    id: "message",
    name: "Message",
    traits: [
        "audible",
        "concentration",
        "illustion",
        "linguistique",
        "mental",
        "subtil",
        "tour de magie",
    ],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "one",
    text:
        "**Portée** 36 mètres ; **Cibles** 1 créature.\n" +
        "Votre bouche prononce des mots à voix basse, mais au lieu de sortir de votre bouche, ils sont transférés directement aux oreilles de la cible. Bien que les autres ne puissent entendre mieux vos paroles que si vous les prononciez normalement, la cible peut entendre vos paroles comme si elle se tenait à côté de vous. La cible peut répondre brièvement par une réaction ou par une action gratuite lors de son prochain tour si elle le souhaite, mais elle doit pouvoir vous voir et se trouver dans la portée de votre sort pour le faire. Si elle répond, sa réponse est transférée directement dans vos oreilles, exactement comme le message initial.",
};

export const musicalAccompaniment: Spell = {
    id: "musicalAccompaniment",
    name: "Accompagnement musical",
    traits: [
        "audible",
        "concentration",
        "illusion",
        "manipulation",
        "tour de magie",
    ],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Durée** 1 minute.\n" +
        "Vous êtes entouré d'une musique d'orchestre qui change pour s'adapter à votre comportement.\n" +
        "Cette musique confère un bonus de statut de +1 aux tests de Représentation (et à d'autres tests à la discrétion du MJ). Vous subissez une pénalité de -4 aux tests de Discrétion lorsque la musique joue. Vous ne pouvez pas contrôler la musique exacte créée par ce sort, et elle ne produit pas de paroles ou de chants intelligibles. Vous pouvez [Révoquer](dismiss) ce sort.",
};

export const prestidigitation: Spell = {
    id: "prestidigitation",
    name: "Prestidigitation",
    traits: ["concentration", "manipulation", "tour de magie"],
    traditions: AllTraditions,
    category: "cantrip",
    actions: "two",
    text:
        "**Portée** 3 mètres\n" +
        "Même la plus simple des magies peut vous servir. Vous pouvez accomplir des effets magiques simples tant que vous [Maintenez](sustain) le sort. Chaque fois que vous Maintenez le sort, vous pouvez choisir une parmi quatre options :\n" +
        "- **Cuisine** Réchauffe, refroidit ou aromatise 500 g de matériau non vivant.\n" +
        "- **Soulève** Soulève lentement à 30 cm au-dessus du sol un objet non porté d'Encombrement léger ou moins.\n" +
        "- **Fabrique** Crée un objet temporaire d'Encombrement négligeable, composé de substance magique solidifiée. L'objet paraît grossier, artificiel et extrêmement fragile — il ne peut servir d'outil, ni d'arme, ni de coût pour un sort.\n" +
        "**Nettoie** Colorise, nettoie ou salit un objet d'Encombrement léger ou moins. Vous pouvez affecter un objet d'Encombrement 1 après 10 rounds de concentration et un objet encore plus grand avec 1 minute par Encombrement.",
};

export const shield: Spell = {
    id: "shield",
    name: "Bouclier",
    traits: ["concentration", "force", "tour de magie"],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "one",
    text:
        "**Durée** jusqu'au début de votre prochain tour.\n" +
        "Vous levez un bouclier de force magique. Ceci compte comme si vous utilisiez [Lever un bouclier](raiseAShield), vous octroyant un bonus de circonstances de +1 à la CA jusqu'au début de votre prochain tour, mais cela ne nécessite aucune main pour l'utiliser.\n" +
        "Tant que le sort est actif, vous pouvez utiliser la réaction [Blocage au bouclier](shieldBlock) avec votre bouclier magique. Le bouclier possède une Solidité de 5. Vous pouvez utiliser la réaction du sort pour réduire les dégâts de tout sort ou effet magique, même s'il n'inflige pas des dégâts physiques. Après avoir effectué Blocage au bouclier, le sort se termine et vous ne pouvez plus le lancer de nouveau pendant 10 minutes.",
};

export const telekineticHand: Spell = {
    id: "telekineticHand",
    name: "Manipulation télékinésique",
    traits: ["concentration", "manipulation", "tour de magie"],
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Cibles** 1 objet non tenu d'encombrement léger ou inférieur.\n" +
        "Vous créez une main flottante magique, soit invisible soit fantomatique, qui saisit l'objet ciblé et le déplace lentement jusqu'à 6 mètres dans n'importe quelle direction. Lorsque vous [Maintenez](sustain) le sort, vous pouvez déplacer l'objet de 6 mètres supplémentaires. Si l'objet est en l'air lorsque le sort se termine, il tombe.",
};

export const telekineticProjectile: Spell = {
    id: "telekineticProjectile",
    name: "Projectile télékinétique",
    traits: ["concentration", "manipulation", "tour de magie"],
    attack: true,
    traditions: [Tradition.Arcana, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature ; **Défense** CA.\n" +
        "Vous lancez à la cible un objet non tenu qui se trouve à portée et qui a un Encombrement de 1 ou inférieur. Faites un jet d'attaque de sort contre la cible. Si vous touchez, vous infligez {{1 + ceil(level/2)}}d6 dégâts contondants, perforants ou tranchants - appropriés à l'objet que vous lancez. Doublez dégâts en cas de critique. Aucun des traits spécifiques ou propriété magique que possède l'objet lancé n'affecte l'attaque ou les dégâts.",
};

export const voidWarp: Spell = {
    id: "voidWarp",
    name: "Distortion du vide",
    traits: ["concentration", "manipulation", "tour de magie", "vide"],
    traditions: [Tradition.Arcana, Tradition.Divine, Tradition.Occult],
    category: "cantrip",
    actions: "two",
    dc: true,
    text:
        "**Portée** 9 mètres ; **Cibles** 1 créature vivante ; **Défense** Vigueur basique\n" +
        "Vous invoquez l'énergie du vide pour endommager la force vitale. La cible subit {{1 + ceil(level/2)}}d4 dégâts de vide avec un jet de Vigueur basique. La cible est aussi [affaiblie 1](enfeebled) jusqu'au début de votre prochain tour en cas d'échec critique.",
};
