export function formatDistance(cells: number): string {
    const value = String(cells * 1.5);
    return value.replace(".", ",");
}
