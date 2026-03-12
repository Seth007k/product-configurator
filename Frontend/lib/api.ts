import { Assignment } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


/**
 * Erstellt ein neues Produkt im Backend.
 * name - Der Name des neuen Produkts
 * return - Das erstellte Produkt-Objekt
 */
export async function createProduct(name: string) {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    return res.json();
}

/**
 * Erstellt eine neue Variante für ein bestimmtes Produkt.
 * productId - Die ID des Produkts, zu dem die Variante gehört
 * assignments - Die Zuweisungen (z.B. Baureihe und Modelle) für diese Variante
 * return - Das erstellte Varianten-Objekt
 */
export async function createVariant(productId: string, assignments: Assignment[]) {
    const res = await fetch(`${API_URL}/variants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, assignments }),
    });

    if (!res.ok) {
        throw new Error("Failed to create Varaint");
    }
    return res.json();
}

/**
 * Ruft alle Produkte vom Backend ab.
 * return - Ein Array mit allen existierenden Produkten
 */
export async function getProducts() {
    const res = await fetch(`${API_URL}/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}


/**
 * Ruft alle Varianten für ein spezifisches Produkt ab.
 * productId - Die ID des Produkts, dessen Varianten abgerufen werden sollen
 * return - Ein Array der zugehörigen Varianten
 */
export async function getVariants(productId: string) {
    const res = await fetch(`${API_URL}/variants/product/${productId}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch variants");
    }

    return res.json();
}
