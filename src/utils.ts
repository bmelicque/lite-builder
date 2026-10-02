export function omit<O>(object: O, ...keys: (keyof O)[]) {
    let o = { ...object } as any;
    for (const key of keys) delete o[key];
    return o;
}

export function unwrap<T>(value: T | undefined): T {
    if (value == null) throw new Error("expected this value to be non-null");
    return value;
}

interface Named {
    name: string;
}
export function sort(a: Named, b: Named) {
    return a.name.localeCompare(b.name);
}

/** Mutates in place */
export function retain<T>(array: T[], predicate: (element: T) => boolean) {
    let i = array.length;
    while (i-- > 0) {
        if (!predicate(array[i])) array.splice(i, 1);
    }
}

export function retainMax<T>(array: T[], value: (e: T) => number): T[] {
    const result: T[] = [];
    let max = -Infinity;
    for (const e of array) {
        const v = value(e);
        if (v > max) {
            max = v;
            result.length = 0;
        }
        if (v === max) result.push(e);
    }
    return result;
}
