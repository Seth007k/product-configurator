export function generateProductCode(name: string): string {
    const trimmed = name.trim();

    if (!trimmed) {
        throw new Error('Product name must not be empty');
    }

    const consonants = trimmed
        .replace(/[aeiouäöüAEIOUÄÖÜ]/g, '')
        .replace(/[^a-zA-Z]/g, '');

    const code =
        consonants.length >= 2 ? consonants.slice(0, 2) : trimmed.slice(0, 2);

    return code.toUpperCase();
}
