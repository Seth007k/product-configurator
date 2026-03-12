import { Assignment } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


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

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}


export async function getVariants(productId: string) {
    const res = await fetch(`${API_URL}/variants/product/${productId}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch variants");
    }

    return res.json();
}
