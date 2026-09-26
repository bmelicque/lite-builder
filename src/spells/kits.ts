import type { ClassChoiceOption } from "../classes/types";
import {
    daze,
    detectMagic,
    figment,
    forbiddingWard,
    guidance,
    hauntingHymn,
    light,
    message,
    musicalAccompaniment,
    prestidigitation,
    shield,
    telekineticProjectile,
    voidWarp,
} from "./cantrips";
import {
    bane,
    bitingWords,
    bless,
    charm,
    command,
    forceBarrage,
    grimTendrils,
    illusoryObject,
    protection,
    sleep,
    soothe,
} from "./rank1";
import { spellToModifier, Tradition, type Spell } from "./types";

type ClassOverride = {
    replace?: Record<string, Spell>;
    remove?: Spell[];
    push?: Spell[];
};

type SpellKit = {
    id: string;
    name: string;
    description: string;
    tradition: Tradition;
    cantrips: Spell[];
    rank1: Spell[];
    classOverrides: Record<string, ClassOverride>;
};

export const occultBlaster: SpellKit = {
    id: "occultBlaster",
    name: "Tourmenteur",
    description:
        "Vous tourmentez vos ennemis de l'intérieur : un murmure qui frappe l'esprit, un froid venu du néant, une force invisible qui les heurte de plein fouet. Vous préférez agir à distance et laisser la peur, la douleur et le doute faire le reste. Ce kit est fait pour ceux qui veulent porter des coups décisifs sans jamais s'approcher de la mêlée.",
    tradition: Tradition.Occult,
    cantrips: [telekineticProjectile, voidWarp, daze, shield, detectMagic],
    rank1: [forceBarrage, grimTendrils, sleep],
    classOverrides: {
        bard: {
            replace: {
                voidWarp: hauntingHymn,
                grimTendrils: bitingWords,
            },
        },
    },
};
export const occultSupport: SpellKit = {
    id: "occultSupport",
    name: "Soutien",
    description:
        "Vous êtes le fil invisible qui maintient le groupe uni. Un mot d'encouragement, un souffle de magie protectrice, et vos alliés réussissent là où ils auraient échoué, ou se relèvent quand tout semble perdu. Et si un adversaire devient trop pressant, vous savez aussi lui troubler l'esprit le temps qu'il faut.",
    tradition: Tradition.Occult,
    cantrips: [guidance, daze, shield, forbiddingWard, light],
    rank1: [soothe, bless, protection],
    classOverrides: {
        bard: {
            replace: {
                infectiousEnthousiasm: musicalAccompaniment,
            },
            remove: [bless],
            push: [bane],
        },
    },
};
export const occultIllusionist: SpellKit = {
    id: "occultIllusionist",
    name: "Manipulateur",
    description:
        "Vous évoluez dans l'ombre des conversations et derrière le voile des apparences. Un sourire enjôleur, une illusion bien placée, une suggestion soufflée au bon moment : vous obtenez ce que vous voulez sans lever le petit doigt, et vous savez endormir un danger avant qu'il ne se déclare. Ce kit s'adresse à ceux qui préfèrent résoudre les problèmes par la ruse plutôt que par la force.",
    tradition: Tradition.Occult,
    cantrips: [daze, figment, detectMagic, prestidigitation, message],
    rank1: [charm, command, illusoryObject],
    classOverrides: {
        bard: { replace: { prestidigitation: musicalAccompaniment } },
    },
};

function getClassKit(kit: SpellKit, className: string): SpellKit {
    const actions = kit.classOverrides[className];
    kit = { ...kit };
    if (!actions) return kit;
    kit.cantrips = applyOverrides(kit.cantrips, actions);
    kit.rank1 = applyOverrides(kit.rank1, actions);
    return kit;
}
function applyOverrides(spells: Spell[], actions: ClassOverride): Spell[] {
    spells = spells.filter((s) => !actions.remove?.includes(s));
    if (actions.replace) {
        for (const r in actions.replace) {
            const i = spells.findIndex((s) => s.id === r);
            if (i === -1) continue;
            spells[i] = actions.replace[r];
        }
    }
    if (actions.push) spells.push(...actions.push);
    return spells;
}

export function spellKitToClassChoice(
    kit: SpellKit,
    classId: string,
): ClassChoiceOption {
    kit = getClassKit(kit, classId);
    return {
        name: kit.name,
        description: kit.description,
        grants: [
            ...kit.cantrips.map(spellToModifier),
            ...kit.rank1.map(spellToModifier),
        ],
    };
}
