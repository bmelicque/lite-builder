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
