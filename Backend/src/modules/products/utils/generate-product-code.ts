export function generateProductCode(name: string): string {
    const trimmed = name.trim()

    if (!trimmed) {
        throw new Error('Product name must not be empty')
    }

    const words = trimmed.split(/\s+/)

    if (words.length >= 2) {
        return words.map(w => w[0]).join('').toUpperCase().slice(0, 4)
    }

    return trimmed.slice(0, 2).toUpperCase()
}